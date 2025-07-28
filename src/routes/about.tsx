import { H1, H2 } from '~/components/headers'

export default function About() {
  return (
    <main class="">
      <H1 text="About Page" />
      <p>
        This is a personal project to help me and my team learn SolidJS.
        <br />
        <br />
        The goal is to create a lean, simple, and easier to understand guide to SolidJS. I'm not trying to be
        comprehensive, this is an opinionated docs site. Please refer to the official docs for any information that is
        not covered here{' '}
        <a
          href="https://docs.solidjs.com/"
          target="_blank"
          class="border-b border-blue-500 no-underline hover:border-blue-300"
        >
          https://docs.solidjs.com/
        </a>
      </p>
      <H2 text="Credits" />
      <ul class="">
        <li>
          <a
            href="https://docs.solidjs.com/"
            target="_blank"
            class="border-b border-blue-500 no-underline hover:border-blue-300"
          >
            Official SolidJS Docs
          </a>
        </li>
        <li>
          <a
            href="https://playground.solidjs.com/"
            target="_blank"
            class="border-b border-blue-500 no-underline hover:border-blue-300"
          >
            SolidJS Playground
          </a>{' '}
          - this is an underrated tool for learning, being able to experiment and see the compiled output was super
          helpful for me
        </li>
        <li>Ryan Carniato's blog posts, talks, and YouTube videos</li>
      </ul>
    </main>
  )
}
