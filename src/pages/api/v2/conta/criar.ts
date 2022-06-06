import { NextApiRequest, NextApiResponse } from 'next'
import CRIAR_TOKEN from '../../../../config/Autorizacao/criar_token_de_acesso';
import DRIVER from '../../../../HPD/driver';

const criar_conta = async (req: NextApiRequest, res: NextApiResponse) => {
  let { body: { registro } } = req

  if (req.method === 'POST') {

    const processo_de_criacao = new Promise(async (resolve, reject) => {

      const retorno_criar = await DRIVER.BD.REGISTRO.inserir(registro)

      console.log(retorno_criar, 'Console do API')

      if (!retorno_criar) {
        resolve({ status: 'ERRO', erro: 'Serviço indisponível no momento!' })
      }

      //  INICIO DE AUTENTICAÇÃO -------------------------------
      var Cookies = require('cookies')
      const cookies = new Cookies(req, res)

      const {
        token, re_token, invalido
      } = CRIAR_TOKEN(retorno_criar.DAN, retorno_criar.versao_token)

      if (invalido) {
        resolve({ status: 'ERRO', erro: 'Serviço indisponível no momento!' })
      }

      const cookie_configuracao = {
        httpOnly: true, path: '/', sameSite: 'lax',
        maxAge: 604800000, domain: '.gudbrand.com.br', secure: true
      }

      const cookie_configuracao_dev = {
        httpOnly: true, path: '/', sameSite: 'lax',
        maxAge: 604800000
      }

      cookies.set('ada-token', re_token,
        process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
      )

      cookies.set('ada', token,
        process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
      )

      //  FIM DE AUTENTICAÇÃO -------------------------------

      await DRIVER.COM.TELEGRAM.sendMessage(process.env.TELEGRAM_GUDBRAND_ID, `
    Nova conta criada no Grupo Gudbrand;
    Usuário: ${retorno_criar.nome} ${retorno_criar.sobrenome}
    Email: ${retorno_criar.email}
    `)
      try {

        await DRIVER.COM.MAIL.email_de_verificacao(retorno_criar,
          retorno_criar.email_ADA)

      } catch (err) {
        console.log(err)
      }

      resolve({
        status: 'CRIADO', registro: await DRIVER.BD.REGISTRO.DAN(
          retorno_criar.DAN)
      })
    })
    return res.json(await processo_de_criacao)
  } else {
    return res.json({ status: 'ERRO', erro: 'Serviço não permitido' })
  }
}

export default criar_conta