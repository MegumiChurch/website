export function renderToElement(string: string, className?: string) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: string
      }}
      className={className}
    />
  )
}
