import styles from 'styles/Home.module.scss'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { useState } from 'react'

export default function Home() {
  return (
    <div className={styles.root}>
      <Navbar />
      <main className='center'>
        <div className={styles.windowTop}>
          <div className={styles.filter}>
            <div className={styles.text}>
              <p>NY めぐみ教会</p>
              <p>Megumi Church</p>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.first}>
            <div className='verticalCenterChild'>
              <div>
                <h2>
                  <span>毎週</span>
                  <span>日曜日</span>
                  <span>午前</span>
                  <span>九時</span>
                  <span>より、</span>
                  <span>リッジウェイ</span>
                  <span>教会</span>
                  <span>地下</span>
                  <span>グリーン</span>
                  <span>・</span>
                  <span>ルーム</span>
                  <span>にて。</span>
                  <span className={styles.eng}>Zoom</span>
                  <span>で</span>
                  <span>参加も</span>
                  <span>できます。</span>
                </h2>
                <div className={`${styles.dock}`}>
                  <img
                    className='clickAble'
                    src='googleMap.webp'
                    alt=''
                    onMouseDown={() => {
                      window.location.href = `https://goo.gl/maps/dAQFo16Biq41pc2S9`
                    }}
                  />
                  <img
                    className='clickAble'
                    src='zoom.webp'
                    alt=''
                    onMouseDown={() => {
                      window.location.href = `https://us02web.zoom.us/j/4256468662`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.second}>
            <div>
              <div />
              <div />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
