import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from "../../../../config/Woocommerce";

export default function Pesquisar (
  req : NextApiRequest,
  res : NextApiResponse
) { 
  const { lojaID } = req.query
  return new Promise(async (resolve, reject) => {
    const { data: lista } = await MerchConnect.get(`lojas/${lojaID}`)
    console.log('lista ', lista)
  if (lista && lista.length > 0) {
    let page = 0, totalPages = 0, produtos = [];
    do {
      const { data: resposta, headers } = await MerchConnect.get('products', {
        include: lista, per_page: 100, page: ++page
      })
      console.log('produtos ', headers)
      totalPages = parseInt(headers["x-wp-totalpages"])
      if (resposta) {
        resposta.forEach(x => produtos.push(x))
      } else {
        res.json({ status: 'LOJA_ENCONTRADA_SEM_PRODUTOS', produtos })
        resolve(res)
      }
    } while (page < totalPages)
    res.json({ status: 'LOJA_ENCONTRADA', produtos })
    resolve(res)
  } else {
    res.json({ status: 'ERRO', erro: 'Nada por aqui!'})
  }
  })
}