import { NextApiRequest, NextApiResponse } from 'next'
import send from 'common/mail'

export default function register(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, body } = JSON.parse(req.body)
  send(to, subject, body)
  res.send(`ok`)
}
