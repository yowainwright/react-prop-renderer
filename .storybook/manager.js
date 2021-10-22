import { create } from '@storybook/theming/create'
import { addons } from '@storybook/addons'

addons.setConfig({
  theme: create({
    base: 'light',
    brandImage: logo,
    brandTitle: 'React Test Render',
    brandUrl: 'https://github.com/yowainwright/react-test-renderer',
  }),
})
