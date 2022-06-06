import { NextApiRequest, NextApiResponse } from "next";
import REPO from "../../../../HPD/DB/NoSQL/Colecoes";

export default function Em_Aberto(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {

    return res.json({ status: 'ERRO', erro: 'Método inválido' })

  }

  return new Promise(async (resolve, reject) => {

    const { DAN } = req.query
    const PEDIDO = await REPO.LIVRO.pegar_um({
      comprador_ID: DAN as string,
      status: 'pending'
    })

    if (PEDIDO) {

      console.log('PEDIDO ', PEDIDO.pedido_ID)
      res.json({ status: 'ENCONTRADO', pedido_ID: PEDIDO.pedido_ID })
      resolve(res)

    } else {

      res.json({ status: 'ERRO', erro: 'Não encontrado!' })
      resolve(res)

    }
  })
}