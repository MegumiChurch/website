export function renderToElement(string: string, className?: string) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: string
      }}
      className={className || ``}
    />
  )
}

export function fixFullWidth(str: string) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s =>
    String.fromCharCode(s.charCodeAt(0) - 65248)
  )
}
