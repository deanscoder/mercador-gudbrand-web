import { NextApiRequest, NextApiResponse } from 'next'
import DRIVER from '../../../../../HPD/driver'
var Cookies = require('cookies')

const verificar = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const { codigo, email } = req.body

  if (!email) {

    return res.json({ status: 'ERRO', erro: 'Email ausente!' })

  }

  if (!codigo) {

    return res.json({ status: 'ERRO', erro: 'Código ausente!' })

  }

  const usuario = await DRIVER.BD.REGISTRO.email_existe(email)

  if (!usuario) {

    return res.json({ status: 'ERRO', erro: 'Conta não encontrada!' })

  }

  const verificacao = await DRIVER.BD.REGISTRO.verificar_email(
    usuario.DAN, codigo
  )

  if (!verificacao) {

    return res.json({ status: 'ERRO', erro: 'Código inválido!' })

  }

  return res.json({ status: 'VERIFICADO' })
}

export default verificar