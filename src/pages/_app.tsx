import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import 'styles/font.scss'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    /* eslint import/no-dynamic-require: "off", global-require: "off"
    --------
    ズーム倍率によってグローバルスタイルを切り替える */
    require(((window.outerWidth - 10) / window.innerWidth) * 100 > 140
      ? `styles/global_zoom.scss`
      : `styles/global.scss`)
  }, [])
  return <Component {...pageProps} />
}
