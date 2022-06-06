import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from '../../../../config/Woocommerce'
import DRIVER from "../../../../HPD/driver";

export default async function Pesquisar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(401).send('Solicitação inválida!')
  }
  const { tipo, page, id, excluir, verbo } = req.query

  return new Promise(async (resolve, reject) => {
    if (tipo === 'Categoria') {
      const { data: resposta, headers: header } = await MerchConnect.get(
        'products',
        { category: id, page: page, per_page: 25, exclude: excluir }
      )
      console.log(resposta, header, '------- Categorias')
      if (resposta) {

        if (resposta.length) {

          res.json({
            status: 'ENCONTRADO',
            produtos: resposta,
            total_de_paginas: header["x-wp-totalpages"]
          })
          console.log(resposta)

          resolve(res)

        } else {
          if (verbo && verbo !== undefined) {

            DRIVER.COM.TELEGRAM.sendMessage(process.env.TELEGRAM_GUDBRAND_ID,
              `Pesquisa de taxonomia ${verbo} sem resultados`)

          }

          res.json({
            status: 'VAZIO',
            produtos: resposta,
            total_de_paginas: header["x-wp-totalpages"]
          })

        }


      } else {
        res.json({ status: 'ERRO', erro: 'Serviço indisponível' })
        resolve(res)
      }
    } else if (tipo === 'Tag') {
      const { data: resposta, headers: header } = await MerchConnect.get(
        'products',
        { tag: id, page: page, per_page: 25, exclude: excluir }
      )
      console.log(resposta, header, '------- Tags')

      if (resposta) {
        res.json({
          status: 'ENCONTRADO',
          produtos: resposta,
          total_de_paginas: header["x-wp-totalpages"]
        })
        //console.log(resposta)
        resolve(res)
      } else {
        res.json({ status: 'ERRO', erro: 'Serviço indisponível' })
        resolve(res)
      }
    }
  })
}
