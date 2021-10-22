import React from 'react'

export type Endpoint = string | number | Array<Endpoint> | { [key: string]: Endpoint }

const isSingleValue = (endpoint: Endpoint): boolean => typeof endpoint === 'number' || typeof endpoint === 'string'

export type EndpointRendererProps = {
  endpoint: Endpoint
  depth?: number
}
export function EndpointRenderer({ endpoint, depth = 1 }: EndpointRendererProps): JSX.Element {
  if (endpoint && isSingleValue(endpoint)) {
    return (
      <section className={`endpoint endpoint--recursion-${depth}`}>
        <ul className='endpoint__items' data-endoint-type='Single Item'>
          <li className={`endpoint__item endpoint__item--${endpoint}`} data-value={endpoint}>
            <span className={`endpoint__text endpoint__text--${endpoint}`} data-value={endpoint}>
              {endpoint as React.ReactNode}
            </span>
          </li>
        </ul>
      </section>
    )
  } else if (endpoint && Array.isArray(endpoint)) {
    return (
      <section className={`endpoint endpoint--recursion-${depth}`}>
        <ul className='endpoint__items' data-endoint-type='Array'>
          {endpoint.map((value, i) => (
            <li className={`endpoint__item endpoint__item--${value}`} key={i} data-value={value}>
              {typeof value !== 'object' ? (
                <span className={`endpoint__text endpoint__text--${value}`} data-value={value}>
                  value
                </span>
              ) : (
                <EndpointRenderer endpoint={value} depth={depth + 1} />
              )}
            </li>
          ))}
        </ul>
      </section>
    )
  } else if (endpoint && Object.keys(endpoint).length) {
    return (
      <section className={`endpoint endpoint--recursion-${depth}`}>
        <ul className='endpoint__items' data-endoint-type='Object'>
          {Object.entries(endpoint).map(([itemName, itemValue], i) => {
            return (
              <li className={`endpoint__item endpoint__item--${itemName}`} key={i} data-name={itemName}>
                <span
                  className={`endpoint__text endpoint__text--${itemName}`}
                  data-name={itemName}
                  data-value={JSON.stringify(itemValue)}
                >
                  {itemName}:
                </span>{' '}
                {typeof itemValue === 'string' || typeof itemValue === 'number' ? (
                  <span className={`endpoint__text endpoint__text--${itemValue}`} data-value={itemValue}>
                    {itemValue.toString()}
                  </span>
                ) : (
                  <EndpointRenderer endpoint={itemValue} depth={depth + 1} />
                )}
              </li>
            )
          })}
        </ul>
      </section>
    )
  } else {
    return (
      <section className={`endpoint endpoint--recursion-${depth}`}>
        <ul className='endpoint__items' data-endoint-type='No Data'>
          <li className='endpoint__item endpoint__item--no-data'>
            <span className='endpoint__text endpoint__text--no-data' data-value='no-data'>
              no data
            </span>
          </li>
        </ul>
      </section>
    )
  }
}
