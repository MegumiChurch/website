import styles from 'styles/register.module.scss'
import { TextField } from '@material-ui/core'
import { useState } from 'react'
import Layout from 'components/Layout'

export default function Register() {
  const data = {
    first: ``,
    last: ``,
    address: ``
  }
  const [error, setError] = useState(``)
  const [spinning, setSpinning] = useState(false)
  return (
    <Layout>
      <h1 className={styles.title}>メールマガジンに登録【試験運用】</h1>
      <p className={styles.p}>
        ニュースレターで最新情報をお届けします。メールアドレスは、ニュースレター以外の目的では使用しません。
      </p>
      <p className={styles.warning}>{error}</p>
      <form className={styles.form} noValidate autoComplete='off'>
        <>
          <div>
            <TextField
              type='name'
              label='姓'
              variant='outlined'
              size='medium'
              required
              onChange={e => {
                data.last = e.target.value
              }}
            />
          </div>
          <div>
            <TextField
              type='name'
              label='名'
              variant='outlined'
              size='medium'
              required
              onChange={e => {
                data.first = e.target.value
              }}
            />
          </div>
          <div>
            <TextField
              type='email'
              label='メールアドレス'
              variant='outlined'
              placeholder='abc@gmail.com'
              size='medium'
              required
              onChange={e => {
                data.address = e.target.value
              }}
            />
          </div>
        </>
      </form>
      <div className={styles.buttonSection}>
        <button
          className='clickable'
          onMouseDown={() => {
            if (Object.values(data).includes(``)) {
              setError(`未記入の欄があります`)
            } else {
              setSpinning(true)
              fetch(`/api/v1/register`, {
                method: `POST`,
                body: JSON.stringify(data)
              })
                .then(r => r.json())
                .then(({ success, id }) => {
                  setSpinning(false)
                  if (success) {
                    fetch(`/api/v1/sendMail`, {
                      method: `POST`,
                      body: JSON.stringify({
                        to: data.address,
                        subject: `ニューヨークめぐみ教会 - メールマガジン`,
                        body: `${data.last} ${data.first} さん、登録ありがとうございます。`
                      })
                    })
                    // window.location.href = '/'
                  } else {
                    setError(`既に登録済みです`)
                  }
                })
                .catch(() => {
                  window.alert(`error`)
                })
            }
          }}
        >
          {spinning ? `⏳` : `登録`}
        </button>
      </div>
      <div className={styles.linkSection}>
        <a href='' className={styles.privacy}>
          プライバシーポリシー
        </a>
      </div>
    </Layout>
  )
}
