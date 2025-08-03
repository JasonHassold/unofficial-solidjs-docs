import { CodeBlock } from '~/components/code'
import { H1, H2 } from '~/components/headers'

export default function createRoot() {
  return (
    <article>
      <H1 text="createRoot()" />

      <p>
        Creates a new non-tracked owner scope that doesn't auto-dispose. This is useful for nested tracking scopes that
        you do not wish to release when the parent re-evaluates.
      </p>
      <p>
        All Solid code should be wrapped in one of these top level as they ensure that all memory/computations are freed
        up. Normally you do not need to worry about this as createRoot is embedded into the <code>render()</code> entry
        functions.
      </p>

      <CodeBlock
        code={`import { render } from "solid-js/web";
import {
  createSignal,
  createEffect,
  createRoot,
  onCleanup,
  Show,
} from "solid-js";


function createCounter() {
  // Uses create a new root scope outside of the component tree
  return createRoot((dispose) => {
    const [count, setCount] = createSignal(0);

    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    createEffect(() => console.log(count())); // logs increasing numbers

    // Runs when root is disposed
    onCleanup(() => clearInterval(interval));

    return { count, dispose };
  });
}

const counter = createCounter();

function Counter() {
  // Disposing the root happens manually rather than automatically when 
  // the component is unmounted 
  function stop() {
    console.log("Stopped");
    counter.dispose();
  }

  return (
    <div>
      <p>Count: {counter.count()}</p>
      <button type="button" onClick={stop}>
        Stop
      </button>
    </div>
  );
}

function App() {
  const [show, setShow] = createSignal(true);

  onCleanup(() => counter.dispose());

  return (
    <div>
      <button type="button" onClick={() => setShow((prev) => !prev)}>
        Show/Hide Counter
      </button>

      <Show when={show()}>
        <Counter />
      </Show>
    </div>
  );
}

render(() => <App />, document.getElementById("app")!);`}
        tsToJs={false}
        solidPlaygroundLink="https://playground.solidjs.com/anonymous/bc17e68e-2cdb-46c3-8b3a-cb5b83e9db3d"
      />

      <H2 text="Definition" />

      <p>
        <a
          class="border-b border-blue-500 no-underline hover:border-blue-300"
          href="https://github.com/solidjs/solid/blob/3d3207dd3aeb84c2a38377cf9f3b895995c2d969/packages/solid/src/reactive/signal.ts#L141-L185"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </p>

      <CodeBlock
        code={`type RootFunction<T> = (dispose: () => void) => T;
function createRoot<T>(fn: RootFunction<T>, detachedOwner?: typeof Owner): T`}
      />
    </article>
  )
}
