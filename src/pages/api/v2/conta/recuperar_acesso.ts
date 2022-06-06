import { NextApiRequest, NextApiResponse } from 'next'
import DRIVER from '../../../../HPD/driver';

const recuperar_acesso = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ status: 'ERRO', erro: 'Serviço não disponível!' })
  }
  const { body: { email } } = req
  const PROCESSO_DE_RECUPERACAO_DE_ACESSO = new Promise(async (resolve, reject) => {
    const conta = await DRIVER.BD.REGISTRO.recuperar_acesso(email)

    if (conta) {

      try {

        const nova_chave = await conta.gerar_chave_reserva()
        await DRIVER.COM.MAIL.email_de_recuperacao(conta, nova_chave)
        resolve({ status: 'SENHA_ENVIADA_POR_EMAIL' })

      } catch (err) {

        resolve({ status: 'ERRO', erro: err })

      }

    } else {
      resolve({ status: 'ERRO', erro: 'Conta não encontrada!' })
    }

  })

  return res.json(await PROCESSO_DE_RECUPERACAO_DE_ACESSO)

}

export default recuperar_acesso