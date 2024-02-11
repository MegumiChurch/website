import { fixFullWidth } from 'common/Util'
import Page from 'pages/page/[id]'
import { renderToString } from 'react-dom/server'
import type { ReactElement } from 'react'

export default function Visit() {
  const date = new Date()
  return (
    <Page
      last_publication_date={[
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear()
      ].map(String)}
      header='https://images.prismic.io/jgc-website/db07cf98-1ba5-4b81-85af-e7a38b25b35f_group_photo.png?auto=compress,format'
      title='教会に行く'
      id=''
      body={fixFullWidth(
        renderToString(
          (
            <p>
              ＊スーパー「大道」より4分。
              <br />
              ＊Hutchingson River Parkway Exit 25を降り、North St.
              を1.2マイル北上、Ridgewayを左折して100m左側。
              <br />
              ＊教会の駐車場は十分広いスペースがありますのでお好きな場所をご利用ください。
              <br />
              ＊教会の正面玄関から中に入ると右側に礼拝堂入口があります。礼拝堂入口を右手に見ながら少し奥に進むと突き当りにラウンジがあります。
              その右手にチャペルの入り口がありますのでそちらからお入りください。
              <br />
              <br />
              <a
                href='https://goo.gl/maps/Jg6WbsA4n4nwqbsX8'
                style={{
                  display: `block`,
                  textAlign: `center`
                }}
              >
                GoogleMapで表示 ↗
              </a>
            </p>
          ) as ReactElement
        )
      )}
    />
  )
}
