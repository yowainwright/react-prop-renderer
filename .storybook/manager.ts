import { create } from '@storybook/theming/create'
import { addons } from '@storybook/addons'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'React Endpoint Renderer 🧪',
    brandUrl: 'https://github.com/yowainwright/react-test-renderer',
  }),
})
