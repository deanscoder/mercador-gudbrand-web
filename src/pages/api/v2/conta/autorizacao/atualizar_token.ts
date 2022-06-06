import { NextApiRequest, NextApiResponse } from 'next'
import ATUALIZAR_TOKEN from '../../../../../config/Autorizacao/atualizar_token_de_acesso'
var Cookies = require('cookies')

const atualizar_token_de_acesso = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)

  const ada_token = cookies.get('ada-token')

  if (req.method !== 'GET') {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!'})
  }
 
  if (!ada_token) {
    return res.json({ status: 'ERRO', erro: 'Autorização de Acesso vazia!'})
  }

  const { 
    erro, token, re_token, invalido
   } = await ATUALIZAR_TOKEN(ada_token as string)

  if (invalido) {
    return res.json({ status: 'DESLOGADO', erro: 'Token expirado'})
  }

  if (!token && !re_token) {
    return res.json({ status: 'DESLOGADO', erro: 'Token expirado'})
  }

  const cookie_configuracao = { httpOnly: true, path: '/', sameSite: 'lax',
      maxAge: 604800000, domain: '.gudbrand.com.br', secure: true }

  const cookie_configuracao_dev = { httpOnly: true, path: '/', sameSite: 'lax',
      maxAge: 604800000 }

    cookies.set('ada-token', re_token, 
      process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
    )
  
    cookies.set('ada', token, 
      process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
    )

  return res.status(200).json({ status: 'ATUALIZADO' })
}

export default atualizar_token_de_acesso