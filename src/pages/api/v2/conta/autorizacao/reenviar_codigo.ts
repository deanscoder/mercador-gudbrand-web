import { NextApiRequest, NextApiResponse } from 'next'
import DRIVER from '../../../../../HPD/driver'
import dandan from '../../../../../utilidade/confere_dandan'
var Cookies = require('cookies')

const reenviar_codigo = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'GET') {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

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

  const usuario = await DRIVER.BD.REGISTRO.DAN(registro.DAN)
  console.log(usuario.email_ADA)

  if (usuario.email_verificado) {

    return res.json({ status: 'ERRO', erro: 'Conta já verificada' })

  }

  try {

    await DRIVER.COM.MAIL.email_de_verificacao(usuario, usuario.email_ADA)
    return res.json({ status: 'REENVIADO', usuario })

  } catch (err) {

    console.log(err)
    return res.json({ status: 'ERRO', err })

  }
}

export default reenviar_codigo