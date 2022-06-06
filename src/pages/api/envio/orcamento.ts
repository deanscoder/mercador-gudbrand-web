import { NextApiRequest, NextApiResponse } from "next";
import Selecionar_Loja from "../../../config/lojas";
import logistica_multilojas from "../../../plugins/@kinesislake/logistica";


export default async function ORCAMENTO(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { cep, dimensoes, loja_ID, peso } = req.body
  const { danguard } = req.headers

  if (req.method !== 'POST' || (req.method === 'POST' && danguard !== 'auau14')) {

    return res.status(401).json({
      status: 'ERRO', erro: 'Verbo inválido!'
    })

  }

  console.log("Novo frete")

  try {

    const endereco = await logistica_multilojas._obter_endereco(cep)

    if (!endereco) {

      return res.status(400).json({
        status: 'ERRO',
        erro: 'CEP inválido, endereço não encontrado'
      })

    }

    if (!dimensoes) {

      return res.status(400).json({
        status: 'ERRO',
        erro: 'Pacote inválido'
      })

    }

    // SE FOR DE ARACAJU APLICAR TAXA DE ENTREGA LOCAL
    if (endereco.localidade === 'Aracaju') {

      return res.status(200).json({
        status: 'DISPONIVEL',
        frete: {
          taxa: 10,
          nome: 'Entrega Local',
          tempo_de_entrega: { min: 1, max: 1 }
        },
        endereco
      })

    }

    const loja = Selecionar_Loja(loja_ID as number)

    const frete = await logistica_multilojas._obter_menor_orcamento(
      {
        address: loja.endereco.endereco,
        postal_code: loja.endereco.cep,
        number: loja.endereco.numero
      },
      { postal_code: cep },
      {
        height: dimensoes.height,
        width: dimensoes.width,
        length: dimensoes.length,
        weight: peso
      }
    )

    return res.status(200).json({
      status: 'DISPONIVEL',
      frete,
      endereco
    })


  } catch (err) {
    console.log(err)
    return res.status(400).json({
      status: 'ERRO',
      erro: err
    })
  }

}