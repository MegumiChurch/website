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

export default function send(to: string, subject: string, body: string) {
  try {
    smtp.sendMail(
      {
        from: process.env.MAIL_ADDRESS,
        to,
        subject,
        text: body
      },
      (error, info) => {
        if (error) throw error
      }
    )
  } catch (e) {
    console.error(e)
  }
}
