import { NextApiRequest, NextApiResponse } from "next";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes'

export default async function TODOS(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const indexes = await REPO.CRAWLER.tipo('PRODUTO')

  if (!indexes) {
    return res.status(200).json({ status: 'ERRO', erro: 'lista vazia' })
  }

  return res.status(200).json({ status: 'ENCONTRADO', indexes })

}