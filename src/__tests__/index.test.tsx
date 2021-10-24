import React from 'react'
import { render } from '@testing-library/react'

import { EndpointRendererContent } from '../index'

describe('EndpointRenderer', () => {
  it('renders a string', () => {
    const { container } = render(<EndpointRendererContent endpoint='test' />)
    const actual = container?.querySelector('[data-value]')?.textContent
    expect(actual).toEqual('test')
  })

  it('renders an array list items', () => {
    const { container } = render(<EndpointRendererContent endpoint={['test', 'test2']} />)
    const actual = container.querySelectorAll('.endpoint__item')
    expect(actual.length).toEqual(2)
    expect(actual[0].getAttribute('data-value')).toEqual('test')
    expect(actual[1].getAttribute('data-value')).toEqual('test2')
  })

  it('renders an object', () => {
    const { container } = render(<EndpointRendererContent endpoint={{ test: 'foo' }} />)
    const actual = container.querySelectorAll('.endpoint__item')[0]
    expect(actual).toBeDefined()
    expect(actual.textContent).toEqual('test: foo')
  })

  it('renders no data', () => {
    const { container } = render(<EndpointRendererContent endpoint={null} />)
    const actual = container.querySelector('.endpoint__text--no-data')
    expect(actual).toBeDefined()
    expect(actual?.textContent).toEqual('no data')
  })
})
