# React Endpoint Renderer 🧪

Render your endpoints on the fly with React. 

## Synopsis

Perhaps, your code is always perfect. Perhaps, your endpoint types and shapes are always exactly as designed. Perhaps your data shapes and calculations are always what you expect after various transformations. If so, React Endpoint Renderer is **not** for you! 

React test renderer makes it easy to print out endpoints so that they can be tested easily. 

In slightly more detail, it's a [React portal](https://reactjs.org/docs/portals.html) that prints a [tree data structure](https://en.wikipedia.org/wiki/Tree_(data_structure)#:~:text=A%20tree%20data%20structure%20can,none%20points%20to%20the%20root.) of components expressing endpoints. From there, you can do what you'd like—but I recommend running tests on those endpoints.  

## Install

```sh
npm install react-endpoint-renderer
# or
yarn add react-endpoint-renderer
# or
pnpm install react-endpoint-renderer
```

## Setup

After installing react endpoint renderer, import it and use it to your liking.

Here's a quick example/ideas:

```jsx
import React, { useEffect, useState } from 'react';
import { EndpointRenderer } from 'react-endpoint-renderer'

export function SomeAwesomeEndpointSubmission({ isWhiteListedHost }) {
  const isRenderingEndpoint = new URLSearchParams(search).get("isRenderingEndpoint")
  const [data, setData] = useState({});

  function handleSubmit async (endpoint) {
    const updatedData = await endpoind();
    setData(updatedData);
  }

  return (
    <div>
      <button type='submit' onClick={handClick}>Submit Endpoint</button>
      {isWhiteListedHost && isRenderingEndpoint && Object.keys(data).length > 0 && <EndpointRenderer endpoint={data} />}
    </div>
  )
}
```

## Usage
