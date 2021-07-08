import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.send(process.env.MAIL_PASS)
  } catch (e) {
    res.send(process.env.MAIL_PASS)
  }
}
