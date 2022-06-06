import { NextApiRequest, NextApiResponse } from 'next'
import ACESSO_CONCEDIDO from '../../../../../config/Autorizacao/acesso_concedido'

export default async function validar_acesso (
  req: NextApiRequest, res: NextApiResponse
  ) 
{
  if (req.method !== 'GET') {
    return res.json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const { ada } = req.headers

  if (!ada) {
    return res.json({ status: 'ERRO', erro: 'Token expirado' })
  }
  
  const { acesso } = await ACESSO_CONCEDIDO(ada as string)

  if (acesso) {
    return res.status(200).json({ status: 'LOGADO' })
  } else {
    return res.json({ status: 'DESLOGADO' })
  }

}