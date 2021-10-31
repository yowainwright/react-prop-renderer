import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../src/styles'
import { EndpointRendererContent } from '../src'
// import './endpointrenderer.css'

export default {
  title: 'Example/EndpointRenderer',
  component: EndpointRendererContent,
  argTypes: {
    endpoint: { foo: 'bar' },
  },
} as ComponentMeta<typeof EndpointRendererContent>

export const Primary = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <EndpointRendererContent endpoint={{ foo: 'bar' }} />
  </ThemeProvider>
)

export const AsString = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <EndpointRendererContent endpoint={'foo'} />
  </ThemeProvider>
)

export const AsArray = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <EndpointRendererContent endpoint={['baz', 'buzz']} />
  </ThemeProvider>
)

export const AsObject = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <EndpointRendererContent endpoint={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' } }} />
  </ThemeProvider>
)

export const AsComplexObject = () => (
  <ThemeProvider theme={theme}>
    <EndpointRendererContent
      endpoint={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' }, fluff: { test: { deepTest: 'bar' } } }}
    />
  </ThemeProvider>
)
