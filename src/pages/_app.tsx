import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import 'styles/global.scss'
import 'styles/font.scss'

export default function App({ Component, pageProps }: AppProps) {
  const [mag, setMag] = useState(1)
  useEffect(() => {
    function handleResize() {
      setMag(1.4 - 0.4 * ((window.outerWidth - 10) / window.innerWidth))
    }
    window.addEventListener(`resize`, handleResize)
    return () => window.removeEventListener(`resize`, handleResize)
  }, [])
  return (
    <>
      <style jsx global>{`
        html {
          font-size: ${mag}em;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
