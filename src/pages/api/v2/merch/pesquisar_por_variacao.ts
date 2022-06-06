import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from '../../../../config/Woocommerce'

export default async function PesquisarPorVariacao (
  req : NextApiRequest,
  res : NextApiResponse
) { 
  return new Promise(async (resolve, reject) => {
    if (req.method === 'GET') {
      const { produtoID } = req.query
      console.log(req.query)
      const { data: resposta } = await MerchConnect.get(
        `products/${produtoID}/variations`, {
        per_page: 25, status: 'publish'
      })
      if (resposta) {
        res.json({status: 'SUCESSO', variacao: resposta})
        console.log(resposta)
      } else {
        res.json({status: 'ERRO', erro: 'Não encontrado'})
        resolve(res)
      }
    } else {
      res.json({status: 'ERRO', erro: 'Serviço indisponível'})
      resolve(res)
    }
  })
}