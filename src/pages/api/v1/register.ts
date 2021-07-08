import { NextApiRequest, NextApiResponse } from 'next'
import { read, add } from 'common/firebase/Firestore'

export default function register(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body)
  read(`users`).then(result => {
    const temp: string[] = []
    result.forEach(data => {
      temp.push(data.data().address)
    })
    if (!temp.includes(params.address)) {
      add(`users`, params).then(r => {
        res.json({
          success: true,
          id: r.id
        })
      })
    } else {
      res.json({
        success: false,
        id: null
      })
    }
  })
}
