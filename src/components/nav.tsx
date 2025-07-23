import { Icon } from 'solid-heroicons'
import { commandLine } from 'solid-heroicons/outline'

export default function Nav() {
  return (
    <nav class="fixed z-1 top-0 left-0 right-0 bg-slate-100 dark:bg-slate-900 flex justify-center text-sm border-b-[0.5px] border-slate-200 dark:border-slate-800">
      <div class="container flex justify-between items-center py-2 px-1">
        <a href="/" class="group relative h-10 w-10 flex items-center justify-center">
          <img
            src="/solid-logo.svg"
            width="40"
            height="40"
            alt="Solid.js"
            class="h-8 w-auto group-hover:scale-105 transition-transform duration-200 ease-in-out transform-origin-center"
          />
        </a>

        <ul class="flex items-center py-2">
          <li class="mt-px border-b-[0.5px] border-transparent mx-1.5 sm:mx-6 hover:border-sky-600">
            <a href="https://playground.solidjs.com/" class="inline-block" target="_blank" rel="noopener noreferrer">
              Playground
              <Icon path={commandLine} class="inline-block ml-1 mb-1 size-5" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
