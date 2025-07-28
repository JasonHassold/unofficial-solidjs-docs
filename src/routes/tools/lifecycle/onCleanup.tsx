import Code from '~/components/code'
import { H1, H2 } from '~/components/headers'

export default function onCleanup() {
  return (
    <article>
      <H1 text="onCleanup" />

      <p>
        <code>onCleanup()</code> registers a function that executes on disposal of the current reactive scope. It can be
        used to clean up any side effects left behind by initialization.
      </p>

      <p>
        When used in a Component, it runs when the component is unmounted. When used in reactive contexts, such as{' '}
        <code>createEffect</code>, <code>createMemo</code> or a <code>createRoot</code>, it runs when the reactive scope
        is disposed or refreshed.
      </p>

      <p>
        Without the <code>onCleanup</code> function, the event listener would remain attached to the{' '}
        <code>document</code> even after the component is removed from the page. This can cause memory leaks and other
        issues.
      </p>

      <Code
        code={`import { render } from "solid-js/web"
import { createSignal, onCleanup } from "solid-js"

const Component = () => {
  const [count, setCount] = createSignal(0)

  const handleClick = () => setCount((value) => value + 1)

  document.addEventListener("click", handleClick)

  // Remove the event listener when the component is removed/unmounted from the page.
  onCleanup(() => document.removeEventListener("click", handleClick))

  return <main>Document has been clicked {count()} times</main>
};

render(() => <Component />, document.getElementById("app")!)`}
      />

      <H2 text="Definition" />
      <Code code={`function onCleanup(fn: () => void): void;`} />
    </article>
  )
}
