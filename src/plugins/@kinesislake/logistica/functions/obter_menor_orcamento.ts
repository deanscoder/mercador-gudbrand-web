import MELHOR_ENVIO from "../config";

export default async function _obter_menor_orcamento(
  from: MELHOR_ENVIO_SHIPMENT_FROM,
  to: MELHOR_ENVIO_SHIPMENT_TO,
  package_dimensions: MELHOR_ENVIO_SHIPMENT_PACKAGE,
  insurance_value?: number
): Promise<MENOR_ORCAMENTO> {

  try {

    const { data: melhor_envio } = await MELHOR_ENVIO.shipment.calculate({
      from,
      to,
      package: package_dimensions,
      options: {
        insurance_value: insurance_value ? insurance_value : 100,
        receipt: false,
        own_hand: false,
        collect: false,
      },
    })

    if (melhor_envio) {
      const ordenar_por_menor_preco = melhor_envio.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price)
      })

      const filtrar_orcamento_com_preco_definido = ordenar_por_menor_preco.filter(
        x => x.price
      )

      return ({
        nome: filtrar_orcamento_com_preco_definido[0].name,
        taxa_de_entrega: parseFloat(filtrar_orcamento_com_preco_definido[0].price),
        tempo_de_entrega: {
          min: parseInt(filtrar_orcamento_com_preco_definido[0].delivery_range.min),
          max: parseInt(filtrar_orcamento_com_preco_definido[0].delivery_range.max)
        }
      })
    } else {
      return ({} as MENOR_ORCAMENTO)
    }

  } catch (err) {
    console.log(err)
    return ({} as MENOR_ORCAMENTO)
  }

}

interface MELHOR_ENVIO_SHIPMENT_FROM {
  postal_code: string
  address: string
  number: string
}

interface MELHOR_ENVIO_SHIPMENT_TO {
  postal_code: string
}

interface MELHOR_ENVIO_SHIPMENT_PACKAGE {
  weight: number
  width: number
  height: number
  length: number
}

export interface MENOR_ORCAMENTO {
  nome: string
  tempo_de_entrega: { min: number, max: number }
  taxa_de_entrega: number
}