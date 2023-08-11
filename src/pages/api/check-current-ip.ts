// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import botDetector from '@/utils/botDetector'
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const detectedIP = requestIp.getClientIp(req);
  const {isBotDetected, resultData} = await botDetector(detectedIP as string)
  let code = 200
  let message = ""
  if (isBotDetected == false) {
    // Carry out critical action / user flow
    message = "Success, action was carried out"
  } else {
    // Bot throw an error
    // Throw captcha or block request action
    code = 429
    message = "Sorry you were classified as a bot, can't perform action."
  }
  res.status(code).json({ bot_status: isBotDetected, your_ip: detectedIP, message: message, data: resultData })
}
