import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ThemeContext, ThemeProvider } from 'styled-components'

import { Section, List, Item, Text, Title, Background, Modal, Button, defaultTheme } from './styles'

export type Endpoint = string | number | Array<Endpoint> | { [key: string]: Endpoint } | null

export type EndpointRendererProps = {
  endpoint: Endpoint
  depth?: number
  id?: string
  title?: string
  theme?: typeof defaultTheme
}

export type EndpointRendererPortalProps = {
  children: JSX.Element
  container: HTMLElement | null
}

export const isSingleValue = (endpoint: Endpoint): boolean =>
  typeof endpoint === 'number' || typeof endpoint === 'string'

export function EndpointRenderPortal({ children, container }: EndpointRendererPortalProps): JSX.Element | null {
  if (!container) return null
  const el = document.createElement('div')

  useEffect(() => {
    container?.appendChild(el)
    return () => {
      container?.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(children, el)
}

export function EndpointRendererContent({ endpoint, depth = 1 }: EndpointRendererProps): JSX.Element {
  const theme = useContext(ThemeContext)

  if (endpoint && isSingleValue(endpoint)) {
    return (
      <Section className={`endpoint endpoint--recursion-${depth}`}>
        <List className='endpoint__items' data-endoint-type='Single Item'>
          <Item className={`endpoint__item endpoint__item--${endpoint}`} data-value={endpoint}>
            <Text className={`endpoint__text endpoint__text--${endpoint}`} data-value={endpoint}>
              {endpoint as React.ReactNode}
            </Text>
          </Item>
        </List>
      </Section>
    )
  } else if (endpoint && Array.isArray(endpoint)) {
    return (
      <Section className={`endpoint endpoint--recursion-${depth}`}>
        <List className='endpoint__items' data-endoint-type='Array'>
          {endpoint.map((value, i) => (
            <Item className={`endpoint__item endpoint__item--${value}`} key={i} data-value={value}>
              {typeof value !== 'object' ? (
                <Text className={`endpoint__text endpoint__text--${value}`} data-value={value}>
                  value
                </Text>
              ) : (
                <EndpointRendererContent endpoint={value} depth={depth + 1} />
              )}
            </Item>
          ))}
        </List>
      </Section>
    )
  } else if (endpoint && Object.keys(endpoint).length) {
    return (
      <Section className={`endpoint endpoint--recursion-${depth}`}>
        <List className='endpoint__items' data-endoint-type='Object'>
          {Object.entries(endpoint).map(([itemName, itemValue], i) => {
            return (
              <Item className={`endpoint__item endpoint__item--${itemName}`} key={i} data-name={itemName}>
                <Text
                  className={`endpoint__text endpoint__text--${itemName}`}
                  data-name={itemName}
                  data-value={JSON.stringify(itemValue)}
                >
                  {itemName}:
                </Text>{' '}
                {typeof itemValue === 'string' || typeof itemValue === 'number' ? (
                  <Text className={`endpoint__text endpoint__text--${itemValue}`} data-value={itemValue}>
                    {itemValue.toString()}
                  </Text>
                ) : (
                  <EndpointRendererContent endpoint={itemValue} depth={depth + 1} />
                )}
              </Item>
            )
          })}
        </List>
      </Section>
    )
  } else {
    return (
      <Section className={`endpoint endpoint--recursion-${depth}`}>
        <List className='endpoint__items' data-endoint-type='No Data'>
          <Item className='endpoint__item endpoint__item--no-data'>
            <Text className='endpoint__text endpoint__text--no-data' data-value='no-data'>
              no data
            </Text>
          </Item>
        </List>
      </Section>
    )
  }
}

export function EndpointRenderer({
  endpoint,
  depth,
  id = 'endpoint-renderer-container',
  title,
  theme = defaultTheme,
}: EndpointRendererProps): JSX.Element {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const portalRoot = document.getElementById(id)
    setPortalContainer(document.createElement('div'))

    if (!portalRoot) {
      const containerDiv = document.createElement('div')
      containerDiv.id = id
      document.documentElement.appendChild(containerDiv)
    }
  }, [id])

  useEffect(() => {
    const portalRoot = document.getElementById(id)

    if (portalRoot && portalContainer) {
      portalRoot.appendChild(portalContainer)
    }

    return function cleanup() {
      if (portalContainer) {
        portalRoot?.removeChild(portalContainer)
      }
    }
  }, [id, portalContainer])

  function closePortal() {
    if (portalContainer) {
      setPortalContainer(null)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <EndpointRenderPortal container={portalContainer}>
        <Background className='endpoint__background'>
          <Modal className='endpoint__modal'>
            {title && <Title className='endpoint__title'>{title}</Title>}
            <EndpointRendererContent endpoint={endpoint} depth={depth} />
            <Button id='endpoint-button-close' className='endpoint__btn endpoint__btn--close' onClick={closePortal}>
              X
            </Button>
          </Modal>
        </Background>
      </EndpointRenderPortal>
    </ThemeProvider>
  )
}

export default EndpointRenderer
