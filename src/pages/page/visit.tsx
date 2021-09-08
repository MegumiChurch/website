import { renderToString } from 'react-dom/server'
import Page from 'pages/page/[id]'

export default function Visit() {
  return (
    <Page
      last_publication_date={[`09`, `01`, `2002`]}
      header='https://images.prismic.io/jgc-website/db07cf98-1ba5-4b81-85af-e7a38b25b35f_group_photo.png?auto=compress,format'
      title='教会に行く'
      id=''
      body={renderToString(
        <p>
          ＊スーパー「大道」より4分。
          <br />
          ＊Hutchingson River Parkway Exit 25を降り、North St.
          を1.2マイル北上、Ridgewayを左折して100m左側。
          <br />
          ＊教会の駐車場は十分にスペースがありますが、日曜日は混み合いますので、余裕を持っていらしてください。
          <br />
          ＊日本語教会へのアクセスは礼拝堂がよりも一レベル下にある体育館の入り口からが便利です。
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
          <br />
          <img
            src='https://ljgc.vercel.app/JapaneseChurch-at-Ridgeway.jpg'
            alt=''
          />
        </p>
      )}
    />
  )
}
