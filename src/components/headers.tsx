function H1(props: { text: string; class?: string }) {
  return (
    <h1
      id={props.text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')}
      class={props.class}
    >
      {props.text}
    </h1>
  )
}

function H2(props: { text: string; class?: string }) {
  return (
    <h2
      id={props.text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')}
      class={props.class}
    >
      {props.text}
    </h2>
  )
}

function H3(props: { text: string; class?: string }) {
  return (
    <h3
      id={props.text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')}
      class={props.class}
    >
      {props.text}
    </h3>
  )
}

export { H1, H2, H3 }
