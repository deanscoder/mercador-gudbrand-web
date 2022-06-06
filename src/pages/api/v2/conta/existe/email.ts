import { NextApiRequest, NextApiResponse } from 'next'
import REPO from '../../../../../HPD/DB/NoSQL/Colecoes';

const email_existe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {

      const resposta = await REPO.REGISTRO.email_existe(req.query.email as string)

      if (resposta)
        return res.json({ status: "REGISTRADO", existe: resposta })


      return res.json({ status: "DISPONIVEL", disponivel: 'Email disponível' })

    } catch (err) {
      return res.json({ status: "ERRO", erro: err })
    }

  } else {
    return res.json({ status: "ERRO", erro: 'Verbo inválido!' })
  }
}

export default email_existe