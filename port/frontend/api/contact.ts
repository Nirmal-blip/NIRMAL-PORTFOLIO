// Vercel Serverless Function example for contact form
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'

const schema = z.object({
  user_name: z.string().min(2),
  user_email: z.string().email(),
  message: z.string().min(10),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid body' })
    }

    // Implement your email sending here (e.g., Nodemailer, Resend, SendGrid)
    // Example with console log as a placeholder:
    // await sendEmail(parsed.data)
    // eslint-disable-next-line no-console
    console.log('Contact message received:', parsed.data)

    return res.status(200).json({ ok: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}



