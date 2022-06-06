import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import CRIAR_TOKEN from '../../../../config/Autorizacao/criar_token_de_acesso';
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';
var Cookies = require('cookies')

const acessar = async (req: NextApiRequest, res: NextApiResponse) => {

  const { body: { email, chave } } = req

  if (req.method === 'POST') {

    const cookies = new Cookies(req, res)

    const PROCESSO_DE_ACESSO = new Promise(async (resolve, reject) => {

      try {

        const retorno_acesso = await REPO.REGISTRO.solicitar_acesso(email)

        if (!retorno_acesso)

          resolve({ status: 'ERRO', erro: 'Conta não encontrada!' })

        if (retorno_acesso.chave_reserva) {

          if (
            !await bcrypt.compare(chave, retorno_acesso.senha) &&
            !await bcrypt.compare(chave, retorno_acesso.chave_reserva)
          ) {

            resolve({ status: 'ERRO', erro: 'Senha inválida!' })

          }

        } else {

          if (
            !await bcrypt.compare(chave, retorno_acesso.senha)) {

            resolve({ status: 'ERRO', erro: 'Senha inválida!' })

          }

        }

        const cookie_configuracao = {
          httpOnly: true, path: '/', sameSite: 'lax',
          maxAge: 604800000, domain: '.gudbrand.com.br', secure: true
        }

        const cookie_configuracao_dev = {
          httpOnly: true, path: '/', sameSite: 'lax',
          maxAge: 604800000
        }

        console.log('DAN :', retorno_acesso.DAN, 'VERSAO: ', retorno_acesso.versao_token)

        const {
          token, re_token
        } = await CRIAR_TOKEN(retorno_acesso.DAN, retorno_acesso.versao_token)

        //console.log(re_token,'--------------', token)

        var registro = retorno_acesso
        registro.senha = ''

        cookies.set('ada-token', re_token,
          process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
        )

        cookies.set('ada', token,
          process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
        )

        resolve({ status: 'ACESSO_PERMITIDO', registro: registro })
      } catch (err) {
        console.log(err)
        resolve({ status: 'ERRO', erro: err })
      }
    })

    return res.json(await PROCESSO_DE_ACESSO)
  }
  else {
    return res.json({ status: 'ERRO', erro: 'Serviço indisponível!' })
  }
}

export default acessar