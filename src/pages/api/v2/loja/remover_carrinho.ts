import { NextApiRequest, NextApiResponse } from "next";
import Selecionar_Loja from "../../../../config/lojas";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';
import dandan from "../../../../utilidade/confere_dandan";
var Cookies = require('cookies')

export default function remover_carrinho(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return new Promise(async (resolve, reject) => {

      const cookies = new Cookies(req, res)

      // PEGA O TOKEN DE ATUALIZAÇÃO
      const ada_token = cookies.get('ada-token')
      const ada = cookies.get('ada')

      // TESTA SE O ACESSO ESTÁ PERMITIDO
      const {
        acesso, atualizado, token, re_token, registro
      } = await dandan(ada as string, ada_token)


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

      const { CID } = req.query

      let resposta

      try {

        resposta = await REPO.CARRINHO.deletar_via_CID(CID as string)

      } catch (Err) {
        console.log(Err)
      }

      if (resposta) {

        res.json({
          status: 'REMOVIDO'
        })

      } else {

        res.json({ status: 'ERRO', erro: 'Serviço indisponível!' })
      }

      resolve(res)

    })

  } else {

    res.json({ status: 'ERRO', erro: 'Verbo inválido!' })

    return res
  }

}

