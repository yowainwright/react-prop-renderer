import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { EndpointRendererContent } from '../src'
import './endpointrenderer.css'

export default {
  title: 'Example/EndpointRenderer',
  component: EndpointRendererContent,
  argTypes: {
    endpoint: { foo: 'bar' },
  },
} as ComponentMeta<typeof EndpointRendererContent>

export const Primary = () => <EndpointRendererContent endpoint={{ foo: 'bar' }} />

export const AsString = () => <EndpointRendererContent endpoint={'foo'} />

export const AsArray = () => <EndpointRendererContent endpoint={['baz', 'buzz']} />

export const AsObject = () => <EndpointRendererContent endpoint={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' } }} />

export const AsComplexObject = () => (
  <EndpointRendererContent
    endpoint={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' }, fluff: { test: { deepTest: 'bar' } } }}
  />
)
