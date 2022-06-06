import { NextApiRequest, NextApiResponse } from 'next'
import DRIVER from '../../../../../HPD/driver';
import dandan from '../../../../../utilidade/confere_dandan';

const atualizar_email = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body: { email } } = req
  if (req.method === 'POST') {

    const processo_de_atualizacao = new Promise(async (resolve, reject) => {

      // VALIDA AUTORIDADE DO CLIENTE
      // INICIO DO BLOCO DE
      // AUTORIZAÇÃO
      var Cookies = require('cookies')

      const cookies = new Cookies(req, res)
      const ada_token = cookies.get('ada-token')
      const ada = cookies.get('ada')

      // TESTA SE O ACESSO ESTÁ PERMITIDO
      const {
        acesso, atualizado, token, re_token, registro
      } = await dandan(ada as string, ada_token)

      if (!acesso) {
        resolve({ status: 'DESLOGADO', erro: 'Acesse novamente' })
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
      // FIM DO BLOCO DE
      // AUTORIZAÇÃO ------------------------------------------------------

      const email_atualizado = await
        DRIVER.BD.REGISTRO.atualizar_dados_de_seguranca_email(
          registro.DAN, email)

      if (!email_atualizado)
        resolve({ status: 'ERRO', erro: 'Serviço indisponível!' })

      await DRIVER.COM.MAIL.email_de_verificacao(registro, await registro.gerar_codigo_de_verificacao())

      resolve({ status: 'ATUALIZADO', registro: email_atualizado })
    })
    return res.json(await processo_de_atualizacao)
  } else {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }
}

export default atualizar_email