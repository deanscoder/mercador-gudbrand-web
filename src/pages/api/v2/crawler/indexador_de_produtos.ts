import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from '../../../../config/Woocommerce'
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';

export default async function INDEXADOR_DE_PRODUTOS(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  /* if (req.headers.authorization !== 'dandan.auau07guarda') {
    return res.status(401).json({ status: 'ERRO', erro: 'Sem autorização!'})
  } */

  console.log('Kirie solicitou indexamento via GITLAB')
  let pg = 0, tp = 0, lista_de_produtos = []
  try {

    do {
      //console.log("entrou no DO")
      const { data: produtos, headers } = await MerchConnect.get('products', {
        per_page: 100, page: ++pg, status: 'publish',
        catalog_visibility: 'visible',
        stock_status: 'instock'
      })

      console.log("headers: ", headers)

      tp = headers["x-wp-totalpages"]

      if (produtos) {
        lista_de_produtos = lista_de_produtos.concat(produtos)
      }

    } while (pg < tp)

    lista_de_produtos.forEach(async o => {

      await REPO.CRAWLER.atualizar_index_do_produto_woocommerce(o.id, o)

    })

    return res.status(200).json({ status: 'ATUALIZADO' })

  } catch (Err) {
    console.log(Err)
    return res.status(200).json({ status: 'ERRO', erro: Err })
  }

}