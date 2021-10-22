import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { EndpointRenderer } from '../src'

export default { title: 'Utility Components/PortalEndpointRenderer' }

const endpointRendererContainer = document.getElementById('endpoint-renderer-container')

const Portal = ({ children }) => {
  const el = document.createElement('div')

  useEffect(() => {
    endpointRendererContainer.appendChild(el)
    return () => {
      endpointRendererContainer.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(children, el)
}

export const PortalEndpointRenderer = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (!data) {
      setTimeout(
        () => setData({ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' }, fluff: { test: { deepTest: 'bar' } } }),
        500,
      )
    }
  }, [data, setData])

  function closePortal() {
    setData(null)
  }

  const EndpointPortal = data ? (
    <Portal>
      <section className='endpoint__background'>
        <div className='endpoint__modal'>
          <h1 className='endpoint__title'>Foo Endpoint 🎉</h1>
          <EndpointRenderer endpoint={data} />
          <button id='endpoint-button-close' className='endpoint__btn endpoint__btn--close' onClick={closePortal}>
            X
          </button>
        </div>
      </section>
    </Portal>
  ) : null

  return (
    <main className='main--portal-demo'>
      <h1 className='title--portal-demo'>This will be covered by a React Portal when data is available! 🚀</h1>
      {EndpointPortal}
    </main>
  )
}
