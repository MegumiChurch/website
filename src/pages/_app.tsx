import 'styles/global.scss'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [component, setComponent] = useState(<div>Loading...</div>)
  useEffect(() => {
    Promise.all([document.fonts.ready, import(`common/firebase/auth`)]).then(
      () => setComponent(<Component {...pageProps} />)
    )
  }, [])
  return component
}
