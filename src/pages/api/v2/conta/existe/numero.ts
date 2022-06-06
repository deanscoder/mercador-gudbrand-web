import { NextApiRequest, NextApiResponse } from 'next'
import REPO from '../../../../../HPD/DB/NoSQL/Colecoes';

const numero_existe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {

      const resposta = await REPO.REGISTRO.telefone_existe(req.query.numero as string)

      if (resposta) {

        return res.json({ status: "REGISTRADO", existe: resposta })

      }

      return res.json({ status: "DISPONIVEL", disponivel: 'Número de telefone disponível' })


    } catch (err) {
      return res.json({ status: "ERRO", erro: err })
    }

  } else {
    return res.json({ status: "ERRO", erro: 'Verbo inválido!' })
  }
}

export default numero_existe