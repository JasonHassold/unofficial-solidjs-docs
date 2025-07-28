import { type JSX, Suspense, createSignal, createEffect, on, For } from 'solid-js'
import Nav from '~/components/nav'
import { A, RouteSectionProps, useLocation } from '@solidjs/router'

type Heading = {
  text: string
  id: string
  level: number
}

export default function (props: RouteSectionProps) {
  const [headings, setHeadings] = createSignal<Heading[]>([])
  let contentRef: HTMLDivElement | undefined

  const location = useLocation()

  createEffect(
    on([() => props.children, () => location.pathname], () => {
      setTimeout(() => {
        if (!contentRef) return
        const headingElements = contentRef.querySelectorAll('h1, h2, h3')
        const newHeadings = Array.from(headingElements).map((heading) => {
          const text = heading.textContent || ''

          return {
            text,
            id: heading.id,
            level: parseInt(heading.tagName.substring(1)),
          }
        })
        setHeadings(newHeadings)
      }, 0)
    })
  )

  return (
    <>
      <Nav />
      <div class="container mx-auto flex h-full pl-68 text-sm pt-14.5">
        {/* Side navigation */}
        <aside
          class="fixed top-14.5 bottom-0 py-4 px-2 w-64 border-r-[0.5px] border-slate-200 dark:border-slate-800
          left-[calc((100vw-1280px)/2)]"
        >
          <ul class="flex flex-col gap-4">
            <NavItem href="/intro-to-solid">Intro to Solid</NavItem>
            <NavItem href="/lifecycle">Lifecycle</NavItem>
            <NavItemGroup title="Tools">
              <NavItemGroup title="Components">
                <NavItem href="/tools/components/Show">&lt;Show&gt;</NavItem>
                <NavItem href="/tools/components/Show">Show</NavItem>
              </NavItemGroup>
              <NavItemGroup title="Lifecycle">
                <NavItem href="/tools/lifecycle/onMount">onMount</NavItem>
                <NavItem href="/tools/lifecycle/onCleanup">onCleanup</NavItem>
              </NavItemGroup>
            </NavItemGroup>
            <NavItem href="/about">About</NavItem>
          </ul>
        </aside>

        {/* Table of contents */}
        <aside class="fixed top-14.5 right-0 bottom-0 py-4 px-3 w-64 border-l-[0.5px] border-slate-200 dark:border-slate-800">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-slate-800 dark:text-slate-200">On this page</span>
            </div>
            <ul class="flex flex-col gap-3">
              <For each={headings()}>
                {(heading) => (
                  <li style={{ 'padding-left': `${(heading.level - 1) * 0.75}rem` }}>
                    <a
                      href={`#${heading.id}`}
                      class="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 text-sm"
                    >
                      {heading.text}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </aside>

        <main class="flex-1">
          <div ref={contentRef} class="max-w-2xl! w-full mx-auto prose dark:prose-slate dark:prose-invert pt-8 pb-16">
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
      <A
        href={props.href}
        class="
          block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 
          before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full hover:text-sky-200 
          lg:text-sm dark:hover:text-sky-200 before:hidden before:bg-sky-200 
          before:dark:bg-sky-200 hover:before:block inactive
        "
      >
        {props.children}
      </A>
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
