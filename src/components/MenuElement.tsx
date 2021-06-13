interface Props {
  title: string
  contents: string[][]
}

export default function MenuElement({ title, contents }: Props) {
  return (
    <div>
      <h1
        style={{
          fontSize: `110%`,
          color: `white`
        }}
      >
        {title}
      </h1>
      {contents.map(content => (
        <>
          <div
            style={{
              marginTop: `5%`
            }}
          >
            <a
              href={`/${content[1]}`}
              style={{
                fontSize: `80%`,
                color: `white`
              }}
            >
              {content[0]}
            </a>
            <br />
          </div>
        </>
      ))}
    </div>
  )
}
