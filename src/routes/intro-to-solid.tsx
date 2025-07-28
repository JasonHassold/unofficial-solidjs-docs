import Code from '~/components/code'
import { H1, H2 } from '~/components/headers'

export default function IntroToSolid() {
  return (
    <article class="">
      <H1 text="Intro to SolidJS" />

      <p>SolidJS is a fast and flexible framework for building reactive user interfaces.</p>

      <p>The reactivity system is built up from a powerful set of tools known as primitives.</p>

      <p>
        From these simple reactive building blocks you can build large-scale UIs where state changes trigger efficient &
        precise updates.
      </p>

      <Code
        code={`import { render } from 'solid-js/web'
import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0) // Signal
  const increment = () => setCount((prev) => prev + 1)

  return (
    <div>
      {/* Only \`count()\` is updated when the button is clicked. */}
      <span>Count: {count()}</span> 
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  )
}

render(() => <Counter />, document.getElementById('app')!)`}
        solidPlaygroundLink="https://playground.solidjs.com/anonymous/31a0eb5f-5e99-4461-a453-e8a8a67aa354"
      />

      <br />
      <br />

      <H1 text="Reactivity System" />

      <p>
        Reactivity is taking action when data changes. Fine-grained reactivity is taking only the specific actions
        needed for specific changes in data.
      </p>

      <H2 text="Signals" />

      <p>
        Signals are the most primary reactive primitive. They allow you to store a piece of data and trigger updates
        when it changes.
      </p>

      <Code
        code={`const [count, setCount] = createSignal(0)
//     ^ getter  ^ setter

// read a value
console.log(count()) // 0

// set a value
setCount(5)
console.log(count()) // 5`}
      />

      <p>
        This just looks like a regular variable with extra steps. The real value comes from combining signals with
        subscribers.
      </p>

      <H2 text="Subscribers" />

      <p>
        <em>aka effects, computations, watchers, reactions</em>
      </p>

      <p>Subscribers are functions that automatically re-run when the signals they subscribe to update.</p>

      <Code
        code={`import { createSignal, createEffect } from 'solid-js'

console.log('1. Create Signal')
const [count, setCount] = createSignal(0)

console.log('2. Create Reaction')
// subscribes to signals used inside and re-runs when they update
createEffect(() => console.log('The count is', count()))

console.log('3. Set count to 5')
setCount(5)

console.log('4. Set count to 10')
setCount(10)`}
        console={`1. Create Signal
2. Create Reaction
The count is 0
3. Set count to 5
The count is 5
4. Set count to 10
The count is 10`}
        solidPlaygroundLink="https://playground.solidjs.com/anonymous/6e61db05-5d32-4361-952c-d4eeb1d1f25b"
      />

      <p>
        This looks a bit like magic at first, but it is the reason that signals need getters. Whenever the signal's
        getter is executed the wrapping function detects it and automatically subscribes to it.
      </p>

      <p>Subscriptions happen automatically when they are used inside a tracking scope.</p>

      <H2 text="Tracking scope" />

      <p>
        Think of tracking scopes as zones of reactivity. When signals are used inside of a tracking scope, it
        automatically subscribes to that signal and will rerun when any of the subscribed signals change.
      </p>

      <p>Solid creates these scopes for you in key places:</p>

      <ol>
        <li>
          <strong>Subscriber Primitives</strong>: The function passed to createEffect is a tracking scope.
        </li>
        <li>
          <strong>JSX</strong>: The expressions {'{ }'} inside your JSX are wrapped in tracking scopes. This is how your
          view stays up-to-date.
        </li>
      </ol>

      <p>
        The key takeaway is that reactivity is contextual. If you read a signal's value <em>outside</em> of a tracking
        scope, it will simply return the current value without creating a subscription. The code will not re-run when
        the signal changes.
      </p>

      <H1 text="Rendering (JSX)" />

      <p>
        JSX is what SolidJS uses to render elements. It is an extension for JavaScript that allows you to write
        HTML-like code inside your JavaScript file which keeps your rendering logic and content in the same place. This
        provides a concise and readable way to create and represent components.
      </p>

      <p>
        It offers a distinct advantages like being able to copy/paste solutions from resources like Stack Overflow or
        use templates from design tools. Solid sets itself apart by using JSX to immediately return&nbsp;
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction">DOM</a>
        &nbsp;elements. This lets you use expressions within your HTML by allowing variables and functions to be
        references with the use of curly braces {'{ }'}
      </p>

      <Code
        code={`const Component = () => {
  const animal = { breed: 'cat', name: 'Midnight' }

  return (
    <p>
      I have a {animal.breed} named {animal.name}!
    </p>
  )
}`}
      />

      <br />
      <br />
    </article>
  )
}
