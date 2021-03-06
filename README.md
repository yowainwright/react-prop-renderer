# React Prop Renderer 🧪

Render your props on the fly.

## Synopsis

Perhaps, your code is always perfect. Perhaps, your props types and api endpoint shapes are always exactly as designed. Perhaps your calculations are always what you expect after various transformations. If so, React Prop Renderer is **not** for you!

**React Prop Renderer** makes it easy to print out props so that they can be tested or reviewed easily.

In slightly more detail, **React Prop Renderer** is a [React portal](https://reactjs.org/docs/portals.html) that prints a [tree data structure](https://en.wikipedia.org/wiki/Tree_(data_structure)#:~:text=A%20tree%20data%20structure%20can,none%20points%20to%20the%20root.) of components expressing props and their values. From there, you can do what you'd like!

## Install

```sh
npm install react-prop-renderer -S
```

## Usage

After installing React Prop Renderer, import it and use it to your liking.

It can be imported as a `default` or as the named component itself.

```js
import PropsRenderer from 'react-prop-renderer'
// or
import { PropsRenderer } from 'react-prop-renderer'
```

Because it renders in a React Portal, you can use (reference) it anywhere in your React app!

```jsx
import React, { useEffect, useState } from 'react';
import { PropsRenderer } from 'react-prop-renderer'
import { SomeComponent } from './components/SomeComponent'

export const SomeParentComponent = () => {
  return (
    <SomeComponent>
      {/*
        * You can use the PropsRenderer within a component (like below)
        * You can use variables to only render (show) the endpoint when you want
      */}
      {isWhiteListedHost && isRenderingEndpoint && Object.keys(data).length > 0 && <PropsRenderer endpoint={data} />}
    </SomeComponent>
  )
}

export default SomeParentComponent
```

Here's a quick pseudo code example/idea

```jsx
import React, { useEffect, useState } from 'react';
import { PropsRenderer } from 'react-prop-renderer'

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
      {isWhiteListedHost && isRenderingEndpoint && Object.keys(data).length > 0 && <PropsRenderer endpoint={data} />}
    </div>
  )
}
```

And yes, you can use the PropsRenderer to render data besides endpoints!

```jsx
import React, { useEffect, useState } from 'react';
import { PropsRenderer } from 'react-prop-renderer'
import { SomeComponent } from './components/SomeComponent'

export const SomeParentComponent = () => {
  return (
    <SomeComponent>
      {whatDataIsThis && Object.keys(whatDataIsThis).length > 0 && <PropsRenderer endpoint={whatDataIsThis} />}
    </SomeComponent>
  )
}

export default SomeParentComponent
```

Hope to provide better documentation soon(ish)!
