import { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'

const smtp = createTransport({
  host: `smtp.mail.com`,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASS
  }
})

export default function test(req: NextApiRequest, res: NextApiResponse) {
  try {
    smtp.sendMail(
      {
        from: process.env.MAIL_ADDRESS,
        to: `shunueda0901@gmail.com`,
        subject: `Hello`,
        text: `world!`
      },
      (error, info) => {
        if (error) throw error
        console.log(info)
      }
    )
  } catch (e) {
    console.log(e)
  }
  res.send(true)
}
