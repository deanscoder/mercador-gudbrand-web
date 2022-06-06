import { NextApiRequest, NextApiResponse } from "next";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';
import DRIVER from "../../../../HPD/driver";

const POR_PAGINA = 25;

export default async function Pesquisa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(200).json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const { p, pagina } = req.query

  if (pagina && parseInt(pagina as string) >= 1) {
    console.log('ENTROU NO IF')

    try {

      const resultado = await REPO.CRAWLER.buscar_por_texto(
        {
          "$search": {
            "index": "autocomplete",
            "autocomplete": {
              "query": decodeURIComponent(p as string),
              "path": "palavras_chave",
              "fuzzy": {
                "maxEdits": 2
              }
            }
          }
        })
      if (resultado) {

        if (resultado.length) {

          return res.status(200).json({
            status: 'RESULTADO',
            produtos: resultado
          })

        } else {

          if (p && p !== undefined) {

            DRIVER.COM.TELEGRAM.sendMessage(process.env.TELEGRAM_GUDBRAND_ID,
              `Tentaram realizar uma pesquisa que retornou sem resultados.
              
              Procuraram por: ${p as string}`)

          }

          return res.status(200).json({
            status: 'VAZIO',
            produtos: resultado
          })

        }

      }

    } catch (Err) {
      console.log(Err)
    }


  } else {
    console.log('ENTROU NO ELSE')

    try {

      const { resultado, total_de_paginas } = await REPO.CRAWLER.buscar_com_paginacao(
        'PRODUTO', p as string, 1, POR_PAGINA)

      if (resultado) {

        return res.status(200).json({
          status: 'RESULTADO',
          total_de_paginas,
          produtos: resultado
        })

      }

    } catch (Err) {
      console.log(Err)
    }

  }
}