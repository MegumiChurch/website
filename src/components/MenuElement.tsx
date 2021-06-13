interface Props {
  title: string
  contents: string[][]
  isDesktop: boolean
  isMenuOpen: boolean
}

export default function MenuElement({
  title,
  contents,
  isDesktop,
  isMenuOpen
}: Props) {
  return (
    <div
      style={{
        textTransform: `uppercase`,
        flexGrow: 1,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`,
        ...(isDesktop
          ? {
              height: `100%`
            }
          : {})
      }}
    >
      <h1
        style={{
          fontSize: `110%`,
          color: `${isDesktop ? `white` : isMenuOpen ? `white` : `#003366`}`,
          transition: `0.2s`,
          paddingBottom: isDesktop ? `5%` : `10%`
        }}
      >
        {title}
      </h1>
      {contents.map(content => (
        <>
          <div
            style={{
              marginTop: isDesktop ? `auto` : `5%`
            }}
          >
            <a
              href={`/${content[1]}`}
              style={{
                fontSize: `90%`,
                color: `${
                  isDesktop ? `white` : isMenuOpen ? `white` : `#003366`
                }`,
                transition: `0.2s`
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
