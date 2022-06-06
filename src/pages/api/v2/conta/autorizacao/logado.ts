import { NextApiRequest, NextApiResponse } from 'next'
import dandan from '../../../../../utilidade/confere_dandan'
var Cookies = require('cookies')

const logado = async (req: NextApiRequest, res: NextApiResponse) => {

  const cookies = new Cookies(req, res)

  // PEGA O TOKEN DE ATUALIZAÇÃO -----------------------------------

  const ada_token = cookies.get('ada-token')
  const ada = cookies.get('ada')

  if (!ada && !ada_token) {
    return res.json({ status: 'DESLOGADO', erro: 'Chaves ausentes, acesse novamente' })
  }

  // TESTA SE O ACESSO ESTÁ PERMITIDO
  const {
    acesso, atualizado, token, re_token, registro
  } = await dandan(ada as string, ada_token)

  if (!acesso) {

    cookies.set('ada')
    cookies.set('ada-token')
    return res.json({ status: 'DESLOGADO', erro: 'Acesse novamente' })

  }

  const cookie_configuracao = {
    httpOnly: true, path: '/', sameSite: 'lax',
    maxAge: 604800000, domain: '.gudbrand.com.br', secure: true
  }

  const cookie_configuracao_dev = {
    httpOnly: true, path: '/', sameSite: 'lax',
    maxAge: 604800000
  }

  // SE O TOKEN FOI ATUALIZADO
  // SETA O COOKIE NOVAMENTE
  if (atualizado) {
    cookies.set('ada-token', re_token,
      process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
    )

    cookies.set('ada', token,
      process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
    )
  }

  return res.json({ status: 'LOGADO', registro })
}

export default logado