import { NextApiRequest, NextApiResponse } from 'next'
import REVOGAR_TOKEN from '../../../../../config/Autorizacao/revogar_token_de_acesso'
var Cookies = require('cookies')

export default async function revogar_token_de_acesso (
  req: NextApiRequest, res: NextApiResponse
  ) 
{
  if (req.method !== 'GET') {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const cookies = new Cookies(req, res)

  const ada_token = cookies.get('ada-token')

  if (!ada_token) {
    return res.json({ status: 'ERRO', erro: 'Token expirado' })
  }
  
  const {revogado, erro} = await REVOGAR_TOKEN(ada_token)

  if (revogado) {
    cookies.set('ada-token')
    cookies.set('ada')
    return res.status(200).json({ status: 'REVOGADO' })
  } else {
    return res.json({ status: 'ERRO', erro: erro })
  }

}