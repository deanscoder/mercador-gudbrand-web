import { NextApiRequest, NextApiResponse } from 'next'
import DRIVER from '../../../../../HPD/driver'

const esqueci = async (req: NextApiRequest, res: NextApiResponse) => {

  const { autenticacao } = req.body

  if (req.method !== 'POST') {

    return res.status(400).json({ status: 'ERRO', erro: 'Verbo inválido!' })

  }

  try {

    const recuperacao = await DRIVER.BD.REGISTRO.recuperar_acesso(autenticacao)

    if (!recuperacao) {

      return res.status(200).json({ status: 'ERRO', erro: 'Email não registrado!' })

    }

    const chave_reserva = await recuperacao.gerar_chave_reserva()

    await DRIVER.COM.MAIL.email_de_recuperacao(recuperacao, chave_reserva)

  } catch (Err) {

    console.log(Err)

  }

  return res.json({ status: 'SOLICITADO' })
}

export default esqueci