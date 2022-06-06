import { NextApiRequest, NextApiResponse } from 'next'
var Cookies = require('cookies')

export default async function validar_acesso (
  req: NextApiRequest, res: NextApiResponse
  ) 
{
  if (req.method === 'GET') {
    const cookies = new Cookies(req, res)
    
    cookies.set('ada')
    cookies.set('ada-token')

    return res.status(200).json({acesso: false})
  } else {
    return res.status(400)
  }

}