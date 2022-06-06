import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import MeConnect from "../../../config/melhor_envio";
import AREA_DE_COBERTURA, { AREA_INTERFACE } from "../../../config/Logistica";
import { RETIRADA_INTERFACE } from "../../../config/Logistica/SE/Aracaju/retirada";
import { ENTREGA_INTERFACE } from "../../../config/Logistica/SE/Aracaju/entrega";

export interface VIACEPDATA {
  logradouro?: string
  localidade?: string
  uf?: string
  bairro?: string
  cep?: string
  complemento?: string
}

export default async function CorreiosCallback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { meucep, pacote, altura, largura, comprimento, peso } = req.body
  const { danguard } = req.headers

  if (req.method === 'POST' && danguard === 'auau14') {
    try {

      const { data: RESPOSTA_ENDERECO, headers: header } = await Axios({
        method: 'get',
        url: `https://viacep.com.br/ws/${meucep}/json`
      })

      if (RESPOSTA_ENDERECO && RESPOSTA_ENDERECO.localidade
        && VALIDA_LOCAL(RESPOSTA_ENDERECO.localidade)) {
        const { area_com_retirada_disponivel, locais } =
          await LOCALIDADE_COM_RETIRADA(RESPOSTA_ENDERECO.localidade)

        const { area_com_entrega_local_disponivel, locais_de_entrega, area } =
          await LOCALIDADE_COM_ENTREGA_LOCAL(
            RESPOSTA_ENDERECO.localidade,
            RESPOSTA_ENDERECO.bairro)

        //console.log(area_com_retirada_disponivel, locais, area_com_entrega_local_disponivel, locais_de_entrega, area)

        let retorno_do_res = {} as {
          status: string, erro?: string, msg?: Array<string>, consulta?: VIACEPDATA,
          eAracaju: boolean, locais_de_retirada?: Array<any>, taxa_de_entrega?: number, expressa?: boolean
        }
        retorno_do_res.consulta = RESPOSTA_ENDERECO
        retorno_do_res.eAracaju = true
        retorno_do_res.msg = []
        if (area_com_retirada_disponivel) {
          //console.log(RESPOSTA_ENDERECO.bairro)
          //console.log('Area com disponibilidade para retirada')
          //retorno_do_res.msg.push('Area com disponibilidade para retirada')
          //console.log(locais)
          retorno_do_res.locais_de_retirada = locais
        }

        if (area_com_entrega_local_disponivel) {
          let entrega = locais_de_entrega.filter(local =>
            local.bairro.toLocaleUpperCase() === RESPOSTA_ENDERECO.bairro.toLocaleUpperCase())
          //console.log(RESPOSTA_ENDERECO.bairro)
          //console.log('Area com disponibilidade para entrega expressa')
          retorno_do_res.msg.push('Área com disponibilidade para entrega agendada')
          //console.log(entrega[0])
          retorno_do_res.taxa_de_entrega = entrega[0].taxa
          retorno_do_res.expressa = true
          if (entrega.length === 0 && parseInt(meucep) >= area.faixa.min
            && parseInt(meucep) <= area.faixa.max) {
            console.log('Área sem cobertura definida, taxa padrão será aplicada')
            retorno_do_res.msg.push('Área sem cobertura definida, taxa padrão será aplicada')
            retorno_do_res.taxa_de_entrega = area.taxa_padrao
          }
        }

        retorno_do_res.status = 'DESTINATARIO_LOCAL'
        return res.json(retorno_do_res)
      }

      const { data: transportadoras } = await MeConnect.shipment
        .calculate({
          from: {
            postal_code: '49044129',
            address: 'Rua Oito',
            number: '4',
          },
          to: {
            postal_code: meucep,
          },
          package: {
            weight: peso ? parseFloat(peso) : 0.5,
            width: largura ? parseFloat(largura) : 10,
            height: altura ? parseFloat(altura) : 18,
            length: comprimento ? parseFloat(comprimento) : 10,
          },
          options: {
            insurance_value: 100,
            receipt: false,
            own_hand: false,
            collect: false,
          },
        })

      //console.log(transportadoras)

      const RETIFICA = transportadoras.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price)
      })

      const LOG = RETIFICA.filter(x => x.price)

      //console.log('MELHOR ENVIO RESPOSTA ---> ', LOG)
      return res.status(200).json({
        status: 'TRANSPORTADORA',
        nome: LOG[0].name,
        taxa_de_entrega: parseFloat(LOG[0].price),
        tempo_de_entrega: { min: parseInt(LOG[0].delivery_range.min), max: parseInt(LOG[0].delivery_range.max) },
        consulta: RESPOSTA_ENDERECO
      });
      //return res.status(200).json({ isAracaju: false, data: min });
    } catch (err) {
      console.log('Erro do CORREIO API: ', err)
      return res.status(500).json({ status: 'ERRO', erro: err })
    }
  } else {
    return res.status(401).json({ Dandan: 'auau quem é você?' });
  }

}

function LOCALIDADE_COM_RETIRADA(localidade: string): Promise<{
  area_com_retirada_disponivel: boolean,
  locais?: Array<RETIRADA_INTERFACE>
}> {
  return new Promise((resolve, reject) => {

    AREA_DE_COBERTURA.forEach(local => {
      if (local.localidade.toLocaleUpperCase() === localidade.toLocaleUpperCase()
        && local.locais.retirada && local.locais.retirada.length > 0) {
        resolve({ area_com_retirada_disponivel: true, locais: local.locais.retirada })
      }
    }
    )
    resolve({ area_com_retirada_disponivel: false })
  })
}

function LOCALIDADE_COM_ENTREGA_LOCAL(localidade: string, bairro: string):
  Promise<{
    area_com_entrega_local_disponivel: boolean
    locais_de_entrega?: Array<ENTREGA_INTERFACE>
    area?: AREA_INTERFACE
  }> {
  return new Promise((resolve, reject) => {
    AREA_DE_COBERTURA.forEach(local => {
      if (local.localidade.toLocaleUpperCase() === localidade.toLocaleUpperCase()
        && local.locais.entrega && local.locais.entrega.length > 0) {
        resolve({
          area_com_entrega_local_disponivel: true,
          locais_de_entrega: local.locais.entrega,
          area: local
        })
      }
    })
    resolve({ area_com_entrega_local_disponivel: false })
  })
}

function VALIDA_LOCAL(localidade: string): boolean {
  let flag = false
  AREA_DE_COBERTURA.forEach(x => {
    if (x.localidade.toLocaleUpperCase() === localidade.toLocaleUpperCase())
      flag = true
  })
  return flag
}

export async function Logistica(
  cep, endereco, media, peso
) {
  if (media && peso) {
    try {

      const { data: RESPOSTA_ENDERECO, headers: header } = await Axios({
        method: 'get',
        url: `https://viacep.com.br/ws/${cep}/json`
      })

      if (RESPOSTA_ENDERECO && RESPOSTA_ENDERECO.localidade
        && VALIDA_LOCAL(RESPOSTA_ENDERECO.localidade)) {
        const { area_com_retirada_disponivel, locais } =
          await LOCALIDADE_COM_RETIRADA(RESPOSTA_ENDERECO.localidade)

        const { area_com_entrega_local_disponivel, locais_de_entrega, area } =
          await LOCALIDADE_COM_ENTREGA_LOCAL(
            RESPOSTA_ENDERECO.localidade,
            RESPOSTA_ENDERECO.bairro)

        //console.log(area_com_retirada_disponivel, locais, area_com_entrega_local_disponivel, locais_de_entrega, area)

        let retorno_do_res = {} as {
          status: string, erro?: string, msg?: Array<string>, consulta?: VIACEPDATA,
          eAracaju: boolean, locais_de_retirada?: Array<any>,
          taxa_de_entrega?: number, expressa?: boolean, nome?: string,
          tempo_de_entrega?: {min: number, max: number} 
        }
        retorno_do_res.consulta = RESPOSTA_ENDERECO
        retorno_do_res.eAracaju = true
        retorno_do_res.msg = []
        if (area_com_retirada_disponivel) {
          //console.log(RESPOSTA_ENDERECO.bairro)
          //console.log('Area com disponibilidade para retirada')
          //retorno_do_res.msg.push('Area com disponibilidade para retirada')
          //console.log(locais)
          retorno_do_res.locais_de_retirada = locais
        }

        if (area_com_entrega_local_disponivel) {
          let entrega = locais_de_entrega.filter(local =>
            local.bairro.toLocaleUpperCase() === RESPOSTA_ENDERECO.bairro.toLocaleUpperCase())
          //console.log(RESPOSTA_ENDERECO.bairro)
          //console.log('Area com disponibilidade para entrega expressa')
          retorno_do_res.msg.push('Área com disponibilidade para entrega agendada')
          //console.log(entrega[0])
          retorno_do_res.taxa_de_entrega = entrega[0].taxa
          retorno_do_res.expressa = true
          if (entrega.length === 0 && parseInt(cep) >= area.faixa.min
            && parseInt(cep) <= area.faixa.max) {
            console.log('Área sem cobertura definida, taxa padrão será aplicada')
            retorno_do_res.msg.push('Área sem cobertura definida, taxa padrão será aplicada')
            retorno_do_res.taxa_de_entrega = area.taxa_padrao
          }
        }

        retorno_do_res.status = 'DESTINATARIO_LOCAL'
        return (retorno_do_res)
      }

      const { data: transportadoras } = await MeConnect.shipment
        .calculate({
          from: {
            postal_code: endereco.cep,
            address: endereco.endereco,
            number: endereco.numero,
          },
          to: {
            postal_code: cep,
          },
          package: {
            weight: peso ? parseFloat(peso) : 0.5,
            width: media ? parseFloat(media) : 10,
            height: media ? parseFloat(media) : 18,
            length: media ? parseFloat(media) : 10,
          },
          options: {
            insurance_value: 100,
            receipt: false,
            own_hand: false,
            collect: false,
          },
        })

      //console.log(transportadoras)

      const RETIFICA = transportadoras.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price)
      })

      const LOG = RETIFICA.filter(x => x.price)

      //console.log('MELHOR ENVIO RESPOSTA ---> ', LOG)
      return ({
        status: 'TRANSPORTADORA',
        nome: LOG[0].name,
        taxa_de_entrega: parseFloat(LOG[0].price),
        tempo_de_entrega: { min: parseInt(LOG[0].delivery_range.min), max: parseInt(LOG[0].delivery_range.max) },
        consulta: RESPOSTA_ENDERECO
      });
      //return res.status(200).json({ isAracaju: false, data: min });
    } catch (err) {
      console.log('Erro do CORREIO API: ', err)
      return ({ status: 'ERRO', erro: err })
    }
  } else {
    return ({ Dandan: 'auau quem é você?' });
  }

}