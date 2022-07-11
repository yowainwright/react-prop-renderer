import { describe, it } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../styles'
import { PropRendererContent } from '../index'

describe('PropRenderer', () => {
  it('renders a string', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PropRendererContent propToRender='test' />
      </ThemeProvider>,
    )
    const actual = container?.querySelector('[data-value]')?.textContent
    expect(actual).toEqual('test')
  })

  it('renders an array list items', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PropRendererContent propToRender={['test', 'test2']} />
      </ThemeProvider>,
    )
    const actual = container.querySelectorAll('.react-prop-renderer__item')
    expect(actual.length).toEqual(2)
    expect(actual[0].getAttribute('data-value')).toEqual('test')
    expect(actual[1].getAttribute('data-value')).toEqual('test2')
  })

  it('renders an object', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PropRendererContent propToRender={{ test: 'foo' }} />
      </ThemeProvider>,
    )
    const actual = container.querySelectorAll('.react-prop-renderer__item')[0]
    expect(actual).toBeDefined()
    expect(actual.textContent).toEqual('test: foo')
  })

  it('renders no data', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PropRendererContent propToRender={null} />
      </ThemeProvider>,
    )
    const actual = container.querySelector('.react-prop-renderer__text--no-data')
    expect(actual).toBeDefined()
    expect(actual?.textContent).toEqual('no data')
  })
})
