import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
import { createWithSolidBase, defineTheme } from '@kobalte/solidbase/config'
import { xMark } from 'solid-heroicons/outline'

const customTheme = defineTheme({
  componentsPath: import.meta.resolve('./src/components/solid-base'),
})

const withSolidBase = createWithSolidBase(customTheme)

export default defineConfig(
  withSolidBase(
    {
      vite: {
        plugins: [tailwindcss()],
      },
    },
    {
      themeConfig: {
        fonts: false,
      },
      markdown: {
        expressiveCode: {
          themes: ['material-theme', 'material-theme-ocean'],
          themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
          frames: false,
        },
      },
    }
  )
)
