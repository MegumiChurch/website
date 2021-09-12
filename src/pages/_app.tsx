import Router from 'next/router'
import { useEffect, useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import type { AppProps } from 'next/app'
import styles from './_app.module.scss'
import 'styles/global.scss'
import 'styles/font.scss'

export default function App({ Component, pageProps }: AppProps) {
  const [mag, setMag] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      console.log(`start`)
      setLoading(true)
    }
    const end = () => {
      console.log(`findished`)
      setLoading(false)
    }
    function handleResize() {
      setMag(1.4 - 0.4 * ((window.outerWidth - 10) / window.innerWidth))
    }
    Router.events.on(`routeChangeStart`, start)
    Router.events.on(`routeChangeComplete`, end)
    Router.events.on(`routeChangeError`, end)
    window.addEventListener(`load`, handleResize)
    window.addEventListener(`resize`, handleResize)
    return () => {
      Router.events.off(`routeChangeStart`, start)
      Router.events.off(`routeChangeComplete`, end)
      Router.events.off(`routeChangeError`, end)
      window.removeEventListener(`load`, handleResize)
      window.removeEventListener(`resize`, handleResize)
    }
  }, [])
  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <ScaleLoader />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <style jsx global>{`
            html {
              font-size: ${mag}em;
            }
          `}</style>
          <Component {...pageProps} />
        </>
      )}
    </>
  )
}
