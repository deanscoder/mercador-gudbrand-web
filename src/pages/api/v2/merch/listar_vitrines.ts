import { NextApiRequest, NextApiResponse } from "next";
import ConConfig from "../../../../config/base_de_requisicao";
import { MerchConnect } from '../../../../config/Woocommerce'

export default async function LISTAR_VITRINES (
  req : NextApiRequest,
  res : NextApiResponse
) {
  if (req.method === 'GET')
  {
    let pg = 0, totalPages = 0
    return new Promise(async (resolve, reject) => {
      const Con = MerchConnect
      let produtos: []
      do {
        const { data: resposta, headers: header } = await Con.get('products', {
          featured: true, page: ++pg, ...ConConfig  
        })
        totalPages = header["x-wp-totalpages"]
        if (resposta)
        { produtos = resposta }
      } while (pg < totalPages)
      console.log('Pacote --> ', produtos)
      if (produtos.length !== 0) {
        res.json({ status: 'VIP', produtos})
        resolve(res)
      }
      resolve({})
  })
  } else { return res.status(401) }
}