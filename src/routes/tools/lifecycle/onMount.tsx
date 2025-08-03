import { CodeBlock } from '~/components/code'
import { H1, H2 } from '~/components/headers'

export default function onMount() {
  return (
    <article>
      <H1 text="onMount" />
      <p>
        <code>onMount()</code> registers a function that runs after initial rendering is done and the elements are
        mounted to the page.
      </p>

      <p>
        <code>onMount</code> will run at the same time in the lifecycle as effects. It is an alias for an effect that is
        non-tracking, which is equivalent to a <code>createEffect</code> with no dependencies.
      </p>

      <CodeBlock
        code={`// example that shoes how to use onMount to get a ref to an element
import { render } from "solid-js/web"
import { onMount } from "solid-js"

function Component() {
  let ref: HTMLDivElement

  // when the component is mounted, the button will be disabled
  onMount(() => {
    ref.disabled = true
  })
  return <button ref={ref}>Focus me!</button>
}

render(() => <Component />, document.getElementById("app")!)`}
      />

      <H2 text="Definition" />

      <CodeBlock code={`function onMount(fn: () => void): void;`} />
    </article>
  )
}
