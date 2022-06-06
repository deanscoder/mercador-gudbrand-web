import { NextApiRequest, NextApiResponse } from "next";
import Selecionar_Loja from "../../../config/lojas";
import { INTERFACE_DO_CARRINHO_POR_LOJA } from "../../../HPD/DB/NoSQL/Colecoes/Carrinho/Interface";
import logistica_multilojas from "../../../plugins/@kinesislake/logistica";
import { MENOR_ORCAMENTO }
  from "../../../plugins/@kinesislake/logistica/functions/obter_menor_orcamento";

export default async function ORCAMENTO_CARRINHO(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { cep, pacotes } = req.body
  const { danguard } = req.headers

  if (req.method !== 'POST' || (req.method === 'POST' && danguard !== 'auau14')) {

    return res.status(401).json({
      status: 'ERRO', erro: 'Verbo inválido!'
    })

  }

  try {

    const endereco = await logistica_multilojas._obter_endereco(cep)

    if (!endereco) {

      return res.status(400).json({
        status: 'ERRO',
        erro: 'CEP inválido, endereço não encontrado'
      })

    }

    if (!pacotes.length) {

      return res.status(400).json({
        status: 'ERRO',
        erro: 'Pacote inválido'
      })

    }

    const carrinhos = pacotes as Array<INTERFACE_DO_CARRINHO_POR_LOJA>

    let fretes = [] as Array<FRETE_POR_LOJA>
    let frete_por_loja = []
    carrinhos.forEach(async carrinho => {

      const loja = Selecionar_Loja(carrinho.loja_ID)

      // SE FOR DE ARACAJU APLICAR TAXA DE ENTREGA LOCAL
      if (loja.endereco.cidade === endereco.localidade) {
        fretes.push({
          taxa_de_entrega: 10,
          nome: 'Entrega Local',
          tempo_de_entrega: { min: 1, max: 1 },
          LID: loja.LID
        })
      } else {
        const orcamento = await logistica_multilojas._obter_menor_orcamento(
          {
            postal_code: loja.endereco.cep,
            address: loja.endereco.endereco,
            number: loja.endereco.numero
          },
          { postal_code: cep },
          {
            height: carrinho.media_de_dimensoes,
            width: carrinho.media_de_dimensoes,
            length: carrinho.media_de_dimensoes,
            weight: carrinho.peso_total
          }
        )
        fretes.push({
          ...orcamento,
          LID: loja.LID
        })

      }


    })

    return res.status(200).json({
      status: 'DISPONIVEL',
      frete: fretes,
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

export interface FRETE_POR_LOJA extends MENOR_ORCAMENTO {
  LID: number
}