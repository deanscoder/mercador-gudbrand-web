import { NextApiRequest, NextApiResponse } from 'next'
import dandan from '../../../../utilidade/confere_dandan';
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';
var Cookies = require('cookies')

const alterar_senha = async (req: NextApiRequest, res: NextApiResponse) => {

  const { body: { DAN, chave_antiga, chave_nova } } = req

  console.log("chave: ", chave_antiga, 'nova: ', chave_nova)

  const cookies = new Cookies(req, res)

  if (req.method === 'POST') {

    const PROCESSO_DE_ALTERACAO_DE_SENHA = new Promise(async (resolve, reject) => {

      // PEGA O TOKEN DE ATUALIZAÇÃO
      const ada_token = cookies.get('ada-token')
      const ada = cookies.get('ada')

      // TESTA SE O ACESSO ESTÁ PERMITIDO
      const {
        acesso, atualizado, token, re_token
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

      const retorno_acesso = await REPO.REGISTRO.DAN_com_senha(DAN)

      if (!retorno_acesso)
        resolve({ status: 'ERRO', erro: 'Conta não encontrada!' })

      if (!retorno_acesso.email_verificado) {
        resolve({ status: 'ERRO', erro: 'Email não verificado, verifique-o antes!' })
      }

      try {


        if (await retorno_acesso.alterar_senha(chave_antiga, chave_nova)) {

          retorno_acesso.revogar_chave_reserva()

          resolve({
            status: 'ATUALIZACAO_DE_SENHA_PERMITIDO',
            registro: retorno_acesso
          })

        } else {
          resolve({ status: 'ERRO', erro: 'Senha incorreta' })
        }

      } catch (err) {
        console.log(err)
        resolve({ status: 'ERRO', erro: err })
      }

    })

    return res.json(await PROCESSO_DE_ALTERACAO_DE_SENHA)
  }
  else {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }
}

export default alterar_senha