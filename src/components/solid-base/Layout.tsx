import { Icon } from 'solid-heroicons'
import { home } from 'solid-heroicons/outline'
import { type JSX, Suspense } from 'solid-js'
import Nav from '~/components/nav'

export default function (props: { children: JSX.Element }) {
  return (
    <>
      <Nav />
      <div class="container mx-auto flex h-full pl-68 text-sm pt-14.5">
        <aside
          class="fixed top-14.5 bottom-0 py-4 px-2 w-64 border-r-[0.5px] border-slate-200 dark:border-slate-800
          left-[calc((100vw-1280px)/2)]"
        >
          <ul class="flex flex-col gap-4">
            <NavItem href="/intro-to-solid">Intro to Solid</NavItem>
            <NavItemGroup title="SolidJS">
              <NavItem href="/intro-to-solid">Intro to Solid</NavItem>
              <NavItem href="/intro-to-solid">Intro to Solid</NavItem>
            </NavItemGroup>
          </ul>
        </aside>

        <main class="flex-1 py-8">
          <div class="max-w-2xl mx-auto prose dark:prose-slate dark:prose-invert">
            <Suspense>{props.children}</Suspense>
          </div>
        </main>
      </div>
    </>
  )
}

function NavItem(props: { href: string; children: JSX.Element }) {
  return (
    <li class="relative">
      <a
        href={props.href}
        class="
          block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 
          before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full hover:text-sky-200 
          lg:text-sm dark:hover:text-sky-200 before:hidden before:bg-sky-200 
          before:dark:bg-sky-200 hover:before:block inactive
        "
      >
        {props.children}
      </a>
    </li>
  )
}

function NavItemGroup(props: { children: JSX.Element; title: string }) {
  return (
    <>
      <li class="ml-3.5">
        <span class="inline-block font-medium mb-3 dark:text-slate-400 text-slate-700">{props.title}</span>
        <ul class="flex flex-col gap-4 border-l-[0.5px] border-slate-200 dark:border-slate-800 ml-1">
          {props.children}
        </ul>
      </li>
    </>
  )
}
