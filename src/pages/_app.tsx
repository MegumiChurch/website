import { AppProps } from 'next/app'
import 'styles/global.scss'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [component, setComponent] = useState(<div>Loading...</div>)
  useEffect(() => {
    Promise.all([document.fonts.ready]).then(() =>
      setComponent(<Component {...pageProps} />)
    )
  }, [])
  return component
}
