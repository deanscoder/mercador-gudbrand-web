import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from "../../../../config/Woocommerce";

export default function Listar (
  req : NextApiRequest,
  res : NextApiResponse
) { 
  return new Promise(async (resolve, reject) => {
    const { data: lista } = await MerchConnect.get(`lojas`)
    if (lista) {
      res.json({ status: 'SUECESSO', lista })
    } else {
      res.json({ status: 'ERRO', erro: 'Serviço indisponível!' })
    }
    resolve(res)
  })
}