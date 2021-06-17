import { ReactChild, useState } from 'react'
import styles from 'styles/Space.module.scss'

export default function MainSpace() {
  const [isExpended, setExpanded] = useState(false)
  return (
    <section className={`${styles.main} vertical-center`}>
      <div className={styles.body}>
        <h2>
          <span>毎週日曜日</span>
          <span>午前9時</span>
          <span>より、</span>
          <span>リッジウェイ</span>
          <span>教会地下</span>
          <span>グリーン・</span>
          <span>ルームにて</span>
        </h2>
        <p>
          <span>Zoom</span>
          <span>による</span>
          <span>オンライン</span>
          <span>礼拝も</span>
          <span>行って</span>
          <span>います。</span>
        </p>
        <div
          className={`${styles.expand} vertical-center`}
          style={{
            height: `${isExpended ? 18 : 0}vh`
          }}
        >
          <ul>
            <li>
              <span>教会の</span>
              <span>駐車場は</span>
              <span>十分に</span>
              <span>スペースが</span>
              <span>ありますが、</span>
              <span>日曜日は</span>
              <span>混み合います</span>
              <span>ので、</span>
              <span>余裕を</span>
              <span>持って</span>
              <span>いらして</span>
              <span>ください。</span>
            </li>
            <li>
              <span>日本語</span>
              <span>教会への</span>
              <span>アクセスは</span>
              <span>礼拝堂よりも</span>
              <span>一レベル</span>
              <span>下に</span>
              <span>ある</span>
              <span>体育館の</span>
              <span>入り口</span>
              <span>からが</span>
              <span>便利</span>
              <span>です。</span>
            </li>
          </ul>
        </div>
        <h3
          className='vertical-center'
          onMouseDown={() => {
            setExpanded(!isExpended)
          }}
        >
          <span
            style={{
              transform: isExpended ? `rotate(45deg)` : `none`,
              marginBottom: `${isExpended ? -5 : 0}vh`,
              marginTop: `${isExpended ? 0 : 5}vh`,
              width: `${isExpended ? 5 : 20}vh`
            }}
          >
            ⊕
          </span>
          <span
            style={{
              opacity: isExpended ? 0 : 1
            }}
          >
            さらに詳しく
          </span>
        </h3>
      </div>
    </section>
  )
}
