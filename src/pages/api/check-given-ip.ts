// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import botDetector from '@/utils/botDetector'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   if (req.query.ip) {
        const {isBotDetected, resultData} = await botDetector(req.query.ip as string)
        let message = ""
        let code = 200
        if (isBotDetected == false) {
            // Carry out critical action / user flow
            message = "Success, action was carried out"
        } else {
            // Bot throw an error
            // Throw captcha or block request action
            code = 429
            message = "Sorry you were classified as a bot, can't perform action."
        }
        res.status(code).json({bot_status: isBotDetected, given_ip: req.query.ip, message: message, data: resultData })
    } else {
        res.status(400).json({bot_status: null, data: "No IP address given. Use /api/check-current-ip route instead."})
    }
}
