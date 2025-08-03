import { H1 } from '~/components/headers'

export default function Lifecycle() {
  return (
    <article class="">
      <H1 text="Lifecycle" />

      <p>
        Solid's reactive updates are not strongly tied to components - meaning component functions don't need to re-run
        for updates to occur.
        <br />
        <br />
        Components are used to organize code and render UI. The reactivity system can live inside or outside of
        components.
        <br />
        <br />
        In the Playground example you'll see a parent and child component with console logs in lots of different places
        in the components as well as within various reaction primitives so the execution order is easy to see in the
        console.
        <br />
        <br />
        <a
          href="https://playground.solidjs.com/anonymous/0ed6a0ea-c7a8-4a14-a271-bbf1f446df2e"
          target="_blank"
          class="border-b border-blue-500 no-underline hover:border-blue-300"
        >
          Solid Playground Example
        </a>
        <br />
        <br />
        This lifecycle diagram is a blend between component lifecycle and reactivity lifecycle.
      </p>

      <img src="/solidjs-lifecycle-diagram.svg" alt="Lifecycle" />
    </article>
  )
}
