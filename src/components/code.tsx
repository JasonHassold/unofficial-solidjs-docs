import { createResource, Show, createSignal } from 'solid-js'
import { codeToHtml } from 'shiki'
import { Icon } from 'solid-heroicons'
import { commandLine } from 'solid-heroicons/outline'
import { transformTsToJs, formatCode } from '~/lib/transform'
import { cn } from '~/lib/tw-merge'

import { TypeScriptIcon, JavaScriptIcon } from '~/components/icons'

export function CodeBlock(props: {
  code: string
  console?: string
  solidPlaygroundLink?: string
  format?: boolean
  tsToJs?: boolean
}) {
  const format = props.format ?? true
  const tsToJs = props.tsToJs ?? true

  const [language, setLanguage] = createSignal<'tsx' | 'jsx'>('tsx')

  const [codeHtml] = createResource(
    () => props.code,
    async (code) => {
      let _code = format ? await formatCode(code) : code

      return codeToHtml(_code, {
        lang: 'tsx',
        themes: {
          light: 'material-theme',
          dark: 'material-theme-ocean',
        },
        transformers: [
          {
            pre(node) {
              this.addClassToHast(node, 'custom-scrollbar')
            },
          },
        ],
      })
    }
  )

  const [jsCodeHtml] = createResource(
    () => props.code,
    async (code) => {
      let _code = tsToJs ? await transformTsToJs(code) : code

      _code = format ? await formatCode(_code) : _code

      if (_code.trim().length === 0) return ''

      return codeToHtml(_code, {
        lang: 'jsx',
        themes: {
          light: 'material-theme',
          dark: 'material-theme-ocean',
        },
        transformers: [
          {
            pre(node) {
              this.addClassToHast(node, 'custom-scrollbar')
            },
          },
        ],
      })
    }
  )

  function hasJSCodeAndIsDifferent() {
    const jsCode = jsCodeHtml()
    const tsCode = codeHtml()

    return jsCode && jsCode.length > 0 && jsCode !== tsCode
  }

  const [consoleHtml] = createResource(
    () => props.console,
    (console) =>
      codeToHtml(console, {
        lang: 'console',
        themes: {
          light: 'material-theme',
          dark: 'material-theme-ocean',
        },
        transformers: [
          {
            pre(node) {
              this.addClassToHast(node, 'custom-scrollbar')
            },
          },
        ],
      })
  )

  return (
    <div
      class="p-1 bg-slate-700 dark:bg-slate-950/60 rounded-xl border border-slate-300 dark:border-slate-800/80
      [&_pre]:m-0! [&_pre]:bg-slate-800! dark:[&_pre]:bg-slate-950! [&_pre]:border [&_pre]:border-slate-600 dark:[&_pre]:border-slate-800 [&_pre]:rounded-lg"
    >
      <Show when={hasJSCodeAndIsDifferent() || props.solidPlaygroundLink}>
        <div class="flex items-center justify-between text-xs text-slate-100 dark:text-slate-300 px-2 py-1.5">
          <div class="flex items-center gap-5">
            <Show
              when={hasJSCodeAndIsDifferent()}
              fallback={
                <div class="flex items-center gap-1 text-slate-100 dark:text-slate-300">
                  TypeScript <TypeScriptIcon class="block rounded-sm mb-0.5 w-4 h-4" />
                </div>
              }
            >
              <button
                class={cn(
                  'flex items-center gap-1 text-slate-100 dark:text-slate-300 border-b-[0.5px] hover:border-sky-600',
                  language() === 'tsx' ? 'border-sky-600' : 'border-transparent'
                )}
                onClick={() => setLanguage('tsx')}
              >
                TypeScript <TypeScriptIcon class="block rounded-sm mb-0.5 w-4 h-4" />
              </button>
              <button
                class={cn(
                  'flex items-center gap-1 text-slate-100 dark:text-slate-300 border-b-[0.5px] hover:border-sky-600',
                  language() === 'jsx' ? 'border-sky-600' : 'border-transparent'
                )}
                onClick={() => setLanguage('jsx')}
              >
                JavaScript <JavaScriptIcon class="block rounded-sm mb-0.5 w-4 h-4" />
              </button>
            </Show>
          </div>

          <Show when={props.solidPlaygroundLink}>
            <a
              href={props.solidPlaygroundLink}
              class="flex items-center gap-1 font-normal no-underline text-slate-100 dark:text-slate-300 border-b-[0.5px] border-transparent hover:border-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Playground <Icon path={commandLine} class="w-4 h-4" />
            </a>
          </Show>
        </div>
      </Show>

      <Show when={language() === 'tsx'}>
        <div innerHTML={codeHtml()} />
      </Show>

      <Show when={language() === 'jsx'}>
        <div innerHTML={jsCodeHtml()} />
      </Show>

      <Show when={consoleHtml()}>
        {(console) => (
          <div class="">
            <div class="text-xs mt-2 px-2 py-1.5 text-slate-100 dark:text-slate-300">Console</div>
            <div class="flex flex-col gap-2 text-sm" innerHTML={console()} />
          </div>
        )}
      </Show>
    </div>
  )
}
