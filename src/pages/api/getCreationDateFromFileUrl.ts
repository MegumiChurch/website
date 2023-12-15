import { NextApiRequest, NextApiResponse } from 'next'
import readPdf from 'pdf-parse'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const fileUri = req.query.fileUri as string
  const body = await fetch(
    `https://jgc-website.cdn.prismic.io/jgc-website/${encodeURIComponent(
      fileUri
    )}`
  )
  try {
    const pdfData = await readPdf(await body.arrayBuffer())
    const rawDate = pdfData.info.CreationDate.substring(2, 10)
    const year = rawDate.substring(0, 4)
    const month = rawDate.substring(4, 6) - 1
    const day = rawDate.substring(6, 8)
    res.status(200).json([year, month, day])
  } catch (e) {
    res.status(200).json([1, 1, 1].map(String))
  }
}
