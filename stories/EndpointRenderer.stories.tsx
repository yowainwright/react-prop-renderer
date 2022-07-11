import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../src/styles'
import { PropRendererContent } from '../src'

export default {
  title: 'Example/propToRenderRenderer',
  component: PropRendererContent,
  argTypes: {
    propToRender: { foo: 'bar' },
  },
} as ComponentMeta<typeof PropRendererContent>

export const Primary = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <PropRendererContent propToRender={{ foo: 'bar' }} />
  </ThemeProvider>
)

export const AsString = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <PropRendererContent propToRender={'foo'} />
  </ThemeProvider>
)

export const AsArray = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <PropRendererContent propToRender={['baz', 'buzz']} />
  </ThemeProvider>
)

export const AsObject = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <PropRendererContent propToRender={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' } }} />
  </ThemeProvider>
)

export const AsComplexObject = () => (
  <ThemeProvider theme={theme}>
    <PropRendererContent
      propToRender={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' }, fluff: { test: { deepTest: 'bar' } } }}
    />
  </ThemeProvider>
)
