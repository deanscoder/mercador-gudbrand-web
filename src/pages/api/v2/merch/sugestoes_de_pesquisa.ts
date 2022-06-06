import { NextApiRequest, NextApiResponse } from "next";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';

export default async function Sugestoes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(200).json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const { p } = req.query

  try {

    const resultado = await REPO.CRAWLER.buscar_por_texto(
      {
        "$search": {
          "index": "autocomplete",
          "autocomplete": {
            "query": p as string,
            "path": "palavras_chave",
            "fuzzy": {
              "maxEdits": 2
            }
          }
        }
      })

    console.log(resultado)

    if (resultado) {

      let lista = []

      resultado.forEach(item => {
        lista = lista.concat(item.tags)
        lista = lista.concat(item.categorias)
        lista = lista.concat(item.departamentos)
        lista = lista.concat(item.marcas)
      })

      let normalizar = new Set(lista)
      let lista_normalizada = [...normalizar]

      return res.status(200).json({
        status: 'RESULTADO',
        sugestoes: lista_normalizada
      })

    }

  } catch (Err) {
    console.log(Err)
  }


}