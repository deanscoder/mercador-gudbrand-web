import MELHOR_ENVIO from "../config";

export default async function _obter_orcamento (
  from: MELHOR_ENVIO_SHIPMENT_FROM,
  to: MELHOR_ENVIO_SHIPMENT_TO,
  package_dimensions: MELHOR_ENVIO_SHIPMENT_PACKAGE,
  insurance_value?: number
) {
  
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

    return melhor_envio

  } catch (err) {
    console.log(err)
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