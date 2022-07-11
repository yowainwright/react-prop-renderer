import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { Section, List, Item, Text, Title, Background, Modal, Button, theme } from './styles'

export type Prop = string | number | Array<Prop> | { [key: string]: Prop } | null

export type PropRendererProps = {
  propToRender: Prop
  depth?: number
  id?: string
  title?: string
  theme?: typeof theme
}

export type PropRendererPortalProps = {
  children: JSX.Element
  container: HTMLElement | null
}

export const isSingleValue = (propToRender: Prop): boolean =>
  typeof propToRender === 'number' || typeof propToRender === 'string'

export function PropRendererPortal({ children, container }: PropRendererPortalProps): JSX.Element | null {
  if (!container) {
    return null
  }
  const el = document.createElement('div')

  useEffect(() => {
    container?.appendChild(el)
    return () => {
      container?.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(children, el)
}

export function PropRendererContent({ propToRender, depth = 1 }: PropRendererProps): JSX.Element {
  if (propToRender && isSingleValue(propToRender)) {
    return (
      <Section className={`react-prop-renderer react-prop-renderer--recursion-${depth}`}>
        <List className='react-prop-renderer__items' data-prop-type='Single Item'>
          <Item
            className={`react-prop-renderer__item react-prop-renderer__item--${propToRender}`}
            data-value={propToRender}
          >
            <Text
              className={`react-prop-renderer__text react-prop-renderer__text--${propToRender}`}
              data-value={propToRender}
            >
              {propToRender as React.ReactNode}
            </Text>
          </Item>
        </List>
      </Section>
    )
  } else if (propToRender && Array.isArray(propToRender)) {
    return (
      <Section className={`react-prop-renderer react-prop-renderer--recursion-${depth}`}>
        <List className='react-prop-renderer__items' data-prop-type='Array'>
          {propToRender.map((value, i) => (
            <Item
              className={`react-prop-renderer__item react-prop-renderer__item--${value}`}
              key={i}
              data-value={value}
            >
              {typeof value !== 'object' ? (
                <Text className={`react-prop-renderer__text react-prop-renderer__text--${value}`} data-value={value}>
                  value
                </Text>
              ) : (
                <PropRendererContent propToRender={value} depth={depth + 1} />
              )}
            </Item>
          ))}
        </List>
      </Section>
    )
  } else if (propToRender && Object.keys(propToRender).length) {
    return (
      <Section className={`react-prop-renderer react-prop-renderer--recursion-${depth}`}>
        <List className='react-prop-renderer__items' data-endoint-type='Object'>
          {Object.entries(propToRender).map(([itemName, itemValue], i) => {
            return (
              <Item
                className={`react-prop-renderer__item react-prop-renderer__item--${itemName}`}
                key={i}
                data-name={itemName}
              >
                <Text
                  className={`react-prop-renderer__text react-prop-renderer__text--${itemName}`}
                  data-name={itemName}
                  data-value={JSON.stringify(itemValue)}
                >
                  {itemName}:
                </Text>{' '}
                {typeof itemValue === 'string' || typeof itemValue === 'number' ? (
                  <Text
                    className={`react-prop-renderer__text react-prop-renderer__text--${itemValue}`}
                    data-value={itemValue}
                  >
                    {itemValue.toString()}
                  </Text>
                ) : (
                  <PropRendererContent propToRender={itemValue} depth={depth + 1} />
                )}
              </Item>
            )
          })}
        </List>
      </Section>
    )
  } else {
    return (
      <Section className={`react-prop-renderer react-prop-renderer--recursion-${depth}`}>
        <List className='react-prop-renderer__items' data-prop-type='No Data'>
          <Item className='react-prop-renderer__item react-prop-renderer__item--no-data'>
            <Text className='react-prop-renderer__text react-prop-renderer__text--no-data' data-value='no-data'>
              no data
            </Text>
          </Item>
        </List>
      </Section>
    )
  }
}

export function PropRenderer({
  propToRender,
  depth,
  id = 'prop-renderer-container',
  title,
  theme,
}: PropRendererProps): JSX.Element {
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
      <PropRendererPortal container={portalContainer}>
        <Background className='react-prop-renderer__background'>
          <Modal className='react-prop-renderer__modal'>
            {title && <Title className='react-prop-renderer__title'>{title}</Title>}
            <PropRendererContent propToRender={propToRender} depth={depth} />
            <Button
              id='react-prop-renderer-button-close'
              className='react-prop-renderer__btn react-prop-renderer__btn--close'
              onClick={closePortal}
            >
              X
            </Button>
          </Modal>
        </Background>
      </PropRendererPortal>
    </ThemeProvider>
  )
}

export default PropRenderer
