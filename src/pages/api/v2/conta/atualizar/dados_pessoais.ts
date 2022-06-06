import { NextApiRequest, NextApiResponse } from 'next'
import REPO from '../../../../../HPD/DB/NoSQL/Colecoes';
import dandan from '../../../../../utilidade/confere_dandan';

const atualizar_dados_pessoais = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body: { nome, sobrenome, honorifico } } = req
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

      const dados_atualizados = await REPO.REGISTRO.atualizar_dados_pessoais(
        registro.DAN, { nome, sobrenome, honorifico })

      if (!dados_atualizados)
        resolve({ status: 'ERRO', erro: 'Serviço indisponível!' })

      resolve({ status: 'ATUALIZADO', registro: dados_atualizados })
    })
    return res.json(await processo_de_atualizacao)
  } else {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }
}

export default atualizar_dados_pessoais