import Code from '~/components/code'
import { H1 } from '~/components/headers'

export default function ShowPage() {
  return (
    <article>
      <H1 text="<Show>" />

      <p>
        The <code>&lt;Show&gt;</code> component is used for conditional rendering. It renders children when the{' '}
        <code>when</code> prop is truthy, and renders <code>fallback</code> otherwise.
      </p>

      <Code
        code={`import { Show } from "solid-js"

function App() {
  return (
    <Show when={!data.loading} fallback={<div>Loading...</div>}>
      <h1>Hi, I am {data().name}</h1>
    </Show>
  )
}`}
      />

      <p>Similar to an if/else statement or a ternary expression</p>

      <Code
        code={`if (when) return children 
else return fallback
// or
return when ? children : fallback`}
      />

      <p>
        The Show component child can also be a function which gets passed the <code>when</code> condition's resulting
        value.
      </p>

      <Code
        code={`<Show when={user()}>
  {(user) => <h1>Hi, I am {user.name}</h1>}
</Show>`}
      />

      <div class="bg-sky-900/40 dark:bg-sky-400/20 p-4 rounded-lg my-4 border-l-4 border-sky-600 dark:border-sky-400">
        <p class="!my-0">
          You can also explicitly set the <code>children</code> prop to have the condition order follow the traditional
          order of if statements and ternaries. See the example below.
        </p>
      </div>

      <Code
        code={`<Show  
	when={!data.loading} 
	children={<h1>Hi, I am {data().name}</h1>}
	fallback={<div>Loading...</div>}
/>`}
      />

      <H1 text="Why use Show?" />

      <p>
        Why not just use a ternaries <code>?</code> or <code>&&</code> and <code>||</code> conditions if you don't need
        a fallback?
      </p>

      <ol>
        <li>
          <code>&lt;Show&gt;</code> is built to reduce unnecessary re-rending
          <ol>
            <li>
              <code>?</code>, <code>||</code>, and <code>&&</code> are compiled to optimized versions that works
              similarly to Show when inside of JSX, so the problem is only noticeable when you nest the ternary inside a
              function or component{' '}
              <a href="https://playground.solidjs.com/anonymous/26db6c3e-4564-449a-81f4-93e24de5716a">
                SolidJS Playground Example
              </a>
            </li>
          </ol>
        </li>
        <li>
          The ability to control re-rendering with the <code>keyed</code> prop
        </li>
        <li>
          Using a component can help with readability/consistency because it is more aligned with JSX templating for all
          your other markup and components
        </li>
      </ol>

      <H1 text="What does keyed do?" />

      <p>
        The <code>keyed</code> prop only has an impact if you are passing the <code>when</code> condition value into a
        child function.
      </p>
      <p>
        By default if the <code>when</code> condition's value changes only what directly uses the value is updated
        (typical fine-grained reactivity). Keying will cause the <code>&lt;Show&gt;</code>'s children to re-render.
      </p>
      <p>This can be useful when you need to:</p>
      <ul>
        <li>
          <strong>reset child component state</strong> - when a user navigates from an "edit user" page for one user to
          another, you want the form to be completely fresh, not filled with the previous user's data
        </li>
        <li>
          <strong>re-triggering animations</strong> - to run an "enter" or "fade-in" animation every time new content is
          shown
        </li>
        <li>
          <strong>re-fetching data</strong> - if a child component fetches data in onMount or a createResource based on
          an ID, using keyed ensures that the data is re-fetched when the ID changes
        </li>
      </ul>
      <p>
        Normal <code>&lt;Show&gt;</code> and the optimized <code>?</code>, <code>||</code>, and <code>&&</code> are
        effectively unkeyed since there is no value to trigger the children to re-execute.
      </p>

      <Code
        code={`import { render } from "solid-js/web";
import { createSignal, Show } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount((count) => count + 1);

  return (
    <div>
      <button type="button" onClick={increment}>
        {count()}
      </button>

      <Show when={count() > 2}>
        <Test value={count()} keyed="" />
      </Show>

      <Show when={count() > 2 && count()} keyed>
        {(value) => <Test value={value} keyed="keyed" />}
      </Show>

      <Show when={count() > 2 && count()}>
        {(value) => <Test value={value()} keyed="unkeyed" />}
      </Show>
    </div>
  );
}

function Test(props: { value: number; keyed: string }) {
  console.log(\`Test \${props.keyed} \${props.value}\`);

  return (
    <div>
      Test {props.keyed} {props.value}
    </div>
  );
}

render(() => <Counter />, document.getElementById("app")!);`}
        console={`Test unkeyed 3
Test keyed 3
Test  3
Test keyed 4
Test keyed 5
Test keyed 6
...`}
        solidPlaygroundLink="https://playground.solidjs.com/anonymous/dc17fb8c-c062-4d89-b150-344a9bce1de1"
      />

      <p>
        This can be use in instances like the one below where the profile card and its state should be reset when the
        user changes.
      </p>

      <Code
        code={`import { render } from "solid-js/web";
import { createSignal, Show } from "solid-js";

function ProfileCard(props) {
  // This state is internal to the component
  const [likes, setLikes] = createSignal(0);
  
  return (
    <div>
      {/* This name updates when the user() signal changes */}
      <h1>{props.user.name}</h1>
      <button onClick={() => setLikes(likes() + 1)}>
        Likes: {likes()}
      </button>
    </div>
  );
}

function App() {
  const [user, setUser] = createSignal({ id: 1, name: "Alice" });

  // Switch to a different user after 3 seconds
  setTimeout(() => setUser({ id: 2, name: "Bob" }), 3000);

  return (
    <Show when={user()}>
      {(u) => <ProfileCard user={u()} />}
    </Show>
  );
}

render(() => <App />, document.getElementById("app")!);`}
        console={`- You click the "Like" button a few times. The count goes up.
- After 3 seconds, the user signal changes to Bob.
- The <h1> updates from "Alice" to "Bob".
- The "Likes" count **remains the same**. It is not reset because the ProfileCard component itself was never destroyed.`}
        solidPlaygroundLink="https://playground.solidjs.com/anonymous/496ed6ca-6f04-4aa7-a4ae-232c95cc12e5"
      />

      <p>
        With <code>keyed</code> the <code>&lt;ProfileCard&gt;</code> will be destroyed and recreated when the user
        changes
      </p>
      <Code
        code={`// ...
<Show when={user()} keyed>
  {(u) => <ProfileCard user={u} />}
</Show>
// ...`}
        console={`- You click the "Like" button a few times. The count goes up.
- After 3 seconds, the user signal changes to Bob.
- The <h1> updates from "Alice" to "Bob".
- The "Likes" count **resets to 0**. This happens because the keyed prop told <Show> to destroy the old ProfileCard for Alice and create a brand new one for Bob, which has its own fresh state.`}
        solidPlaygroundLink="https://playground.solidjs.com/anonymous/1112f16a-0882-48b2-a6d8-b29eee149f0a"
      />

      <H1 text="Definition" />

      <p>
        <a
          href="https://github.com/solidjs/solid/blob/3d3207dd3aeb84c2a38377cf9f3b895995c2d969/packages/solid/src/render/flow.ts#L82-L149"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </p>

      <table class="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>when</td>
            <td>
              <code>true</code>
            </td>
            <td>
              the expression to test for truthiness, the resulting value is also passed into the child if it is a
              function
            </td>
          </tr>
          <tr>
            <td>children</td>
            <td>
              <code>true</code>
            </td>
            <td>
              elements or function to render if the <code>when</code> condition is truthy
            </td>
          </tr>
          <tr>
            <td>keyed</td>
            <td>
              <code>false</code>
            </td>
            <td>
              used to control re-rendering the child components based on the <code>when</code> condition value
            </td>
          </tr>
          <tr>
            <td>fallback</td>
            <td>
              <code>false</code>
            </td>
            <td>
              elements to render if the <code>when</code> condition is falsy
            </td>
          </tr>
        </tbody>
      </table>

      <Code
        code={`function Show<
  T,
  TRenderFunction extends (item: Accessor<NonNullable<T>>) => JSX.Element
>(props: {
  when: T | undefined | null | false;
  keyed?: false;
  fallback?: JSX.Element;
  children: JSX.Element | RequiredParameter<TRenderFunction>;
}): JSX.Element;

function Show<T, TRenderFunction extends (item: NonNullable<T>) => JSX.Element>(props: {
  when: T | undefined | null | false;
  keyed: true;
  fallback?: JSX.Element;
  children: JSX.Element | RequiredParameter<TRenderFunction>;
}): JSX.Element;

function Show<T>(props: {
  when: T | undefined | null | false;
  keyed?: boolean;
  fallback?: JSX.Element;
  children: JSX.Element | ((item: NonNullable<T> | Accessor<NonNullable<T>>) => JSX.Element);
}): JSX.Element`}
      />
    </article>
  )
}
