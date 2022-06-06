import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from "../../../../config/Woocommerce";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';

export default async function Sugestoes_Tags_e_Categorias(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(200).json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  let lista = []

  try {

    let pg = 0, tp = 0

    do { //SE TIVER MAIS PAG REPETE

      const categories = await MerchConnect.get("products/categories", {
        per_page: 100, page: ++pg
      })
      tp = categories.headers["x-wp-totalpages"]

      lista = categories.data.concat(lista)

    } while (pg < tp)

    pg = 0; tp = 0;

    do {
      const tags = await MerchConnect.get("products/tags", {
        per_page: 100, page: ++pg
      })
      tp = tags.headers["x-wp-totalpages"]

      lista = tags.data.concat(lista)


    } while (pg < tp)

    if (lista && lista.length) {
      return res.status(200).json({
        status: 'RESULTADO',
        sugestoes: lista
      })
    } else {
      return res.status(200).json({
        status: 'ERRO',
        sugestoes: []
      })
    }

    //const resultado = await REPO.CRAWLER.tipo('PRODUTO')

    //console.log(resultado)

    /* if (resultado) {


      resultado.forEach(item => {
        lista = lista.concat(item.tags)
        lista = lista.concat(item.categorias)
      })

      let normalizar = new Set(lista)
      let lista_normalizada = [...normalizar]

      return res.status(200).json({
        status: 'RESULTADO',
        sugestoes: lista_normalizada
      })

    } */

  } catch (Err) {
    console.log(Err)
    return res.status(200).json({
      status: 'ERRO',
      sugestoes: [],
      erro: Err
    })
  }


}