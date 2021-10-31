import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../styles'
import { EndpointRendererContent } from '../index'

describe('EndpointRenderer', () => {
  it('renders a string', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <EndpointRendererContent endpoint='test' />
      </ThemeProvider>,
    )
    const actual = container?.querySelector('[data-value]')?.textContent
    expect(actual).toEqual('test')
  })

  it('renders an array list items', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <EndpointRendererContent endpoint={['test', 'test2']} />
      </ThemeProvider>,
    )
    const actual = container.querySelectorAll('.endpoint__item')
    expect(actual.length).toEqual(2)
    expect(actual[0].getAttribute('data-value')).toEqual('test')
    expect(actual[1].getAttribute('data-value')).toEqual('test2')
  })

  it('renders an object', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <EndpointRendererContent endpoint={{ test: 'foo' }} />
      </ThemeProvider>,
    )
    const actual = container.querySelectorAll('.endpoint__item')[0]
    expect(actual).toBeDefined()
    expect(actual.textContent).toEqual('test: foo')
  })

  it('renders no data', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <EndpointRendererContent endpoint={null} />
      </ThemeProvider>,
    )
    const actual = container.querySelector('.endpoint__text--no-data')
    expect(actual).toBeDefined()
    expect(actual?.textContent).toEqual('no data')
  })
})
