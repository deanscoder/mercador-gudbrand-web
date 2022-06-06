import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import bosons from '../../../HPD/ALIAS/bosons'
import { INTERFACE_DE_ITENS_NO_CARRINHO, INTERFACE_DO_CARRINHO_POR_LOJA } from '../../../HPD/DB/NoSQL/Colecoes/Carrinho/Interface'
import { Dimensions, WooProduto } from '../../../pages/api/cpd/interfaces/Artigo/woo_product'
import { VIACEPDATA } from '../../../pages/api/melhorenvio/correios'
import { MENOR_ORCAMENTO } from '../../../plugins/@kinesislake/logistica/functions/obter_menor_orcamento'

export interface INTERFACE_LISTA_WOOCOMMERCE {
  product_id: number
  variation_id?: number
  quantity: number
}

export interface INTERFACE_CHECKOUT_MERCADOPAGO {
  id: string
  title: string
  unit_price: number
  quantity: number
  picture_url?: string
  currency_id: string
  description?: string
}

export interface ITEM_NO_CARRINHO {
  ID: number
  V_ID?: number
  nome: string
  url: string
  thumbnail: string
  quantidade: number
  preco: number
  dimensoes: Dimensions
  peso: number
  lojas?: Array<{ id: number, name: string, slug: string }>
}

export interface FRETE_POR_LOJA extends MENOR_ORCAMENTO {
  LID: number
}

export interface INTERFACE_CARRINHO {
  carrinho: Array<INTERFACE_DE_ITENS_NO_CARRINHO>
  carrinho_servidor: Array<INTERFACE_DO_CARRINHO_POR_LOJA>
  frete: number
  fretes: Array<FRETE_POR_LOJA>
  __fretes: React.Dispatch<Array<FRETE_POR_LOJA>>
  tipo_de_frete: string
  tempo_de_entrega: string
  logistica: VIACEPDATA
  CID: string
  adicionar(args: INTERFACE_DE_ITENS_NO_CARRINHO): void
  remover(ID: number, V_ID?: number): void
  deletar(ID: number, V_ID?: number): boolean
  esvaziar_carrinho(): void
  checkout_mercadopago(): Array<INTERFACE_CHECKOUT_MERCADOPAGO>
  criar_lista_woocommerce(): Array<INTERFACE_LISTA_WOOCOMMERCE>
  valor_total(): number
  valor_total_com_frete(): number
  quantidade_total(): number
  peso_total(): number
  dimensao_do_pacote(): number
  conectar_ao_carrinho(ID: string): Promise<{ status: string, msg: string }>
  atualizar_frete(cep: string): Promise<boolean>
  compartilhar_carrinho(): { msg: string, ID?: string, link?: string }
  inserir_no_servidor(): Promise<void>
  selecionado: { lojaID: number, produtoID: number, variante: WooProduto, usado: boolean }
  __selecionado: React.Dispatch<any>
}

export const CONTEXTO_DO_CARRINHO_DE_COMPRAS = createContext<INTERFACE_CARRINHO>(
  {} as INTERFACE_CARRINHO)

export default function Provedor_de_Carrinho({ children }) {
  const [carrinho, __carrinho] = useState([] as Array<INTERFACE_DE_ITENS_NO_CARRINHO>)
  const [carrinho_servidor, __carrinho_servidor] = useState([] as Array<INTERFACE_DO_CARRINHO_POR_LOJA>)
  const [CID, __CID] = useState('')
  const [frete, __frete] = useState(0)
  const [fretes, __fretes] = useState([] as Array<FRETE_POR_LOJA>)
  const [tipo_de_frete, __tipo_frete] = useState('Logistica Mercador')
  const [tempo_de_entrega, setTempoFrete] = useState('de 9 a 15 dias úteis')
  const [logistica, setLogistica] = useState({} as VIACEPDATA)
  const [execucao, setExecucao] = useState(false)

  const [selecionado, __selecionado] = useState({
    lojaID: 0, produtoID: 0, variante: {}, usado: false
  })
  useEffect(() => {
    let carrinho_local_existe = JSON.parse(
      localStorage.getItem('MERCH:CARRINHO'))
    let carrinho_servidor_local_existe = JSON.parse(
      localStorage.getItem('MERCH:CARRINHO_SERVER')
    )

    if (carrinho_local_existe && carrinho_servidor_local_existe) {
      const { CID: CID_local, carrinho: carrinho_local } = carrinho_local_existe
      if (CID_local)
        __CID(CID_local)
      __carrinho(carrinho_local)
      __carrinho_servidor(carrinho_servidor_local_existe)
    } else {
      //baixar_carrinho() QUANDO IMPLEMENTAR CARRINHO SERVER SIDE PARA VALIDAÇÕES
    }
  }, [])

  useEffect(() => {

    if (!!carrinho.length) {
      localStorage.setItem('MERCH:CARRINHO', JSON.stringify({ CID: CID, carrinho }))
    }
  }, [carrinho])

  function definir_ponteiro(ID: number, V_ID?: number): number {
    if (carrinho) {
      if (V_ID) {
        return carrinho.findIndex(item => item.V_ID === V_ID && item.ID === ID)
      } else {
        return carrinho.findIndex(item => item.ID === ID)
      }
    }
  }

  function adicionar(args: INTERFACE_DE_ITENS_NO_CARRINHO) {
    const { ID, V_ID, nome, url, quantidade, preco, thumbnail, dimensoes, peso, lojas } = args
    let carrinho_temporario = carrinho
    let ponteiro = definir_ponteiro(ID, V_ID)

    if (ponteiro !== -1) {
      carrinho_temporario[ponteiro].quantidade = carrinho_temporario[ponteiro].quantidade + quantidade
      __carrinho(carrinho_temporario)
      localStorage.setItem('MERCH:CARRINHO', JSON.stringify({ CID, carrinho }))
    } else {
      carrinho_temporario.push(
        { ID, V_ID, nome, url, quantidade, preco, thumbnail, dimensoes, peso, lojas }
      )
      __carrinho(carrinho_temporario)
      localStorage.setItem('MERCH:CARRINHO', JSON.stringify({ CID, carrinho }))
    }

    inserir_no_servidor()
    setExecucao(!execucao)
  }

  function remover(ID: number, V_ID?: number): void {

    let carrinho_temporario = carrinho
    let ponteiro = definir_ponteiro(ID, V_ID)

    if (ponteiro !== -1) {
      carrinho_temporario[ponteiro].quantidade = carrinho_temporario[ponteiro].quantidade - 1
      __carrinho(carrinho_temporario)
      localStorage.setItem('MERCH:CARRINHO', JSON.stringify({ CID: CID, carrinho }))
    }

    inserir_no_servidor()
    setExecucao(!execucao)
  }

  function deletar(ID: number, V_ID: number): boolean {

    let carrinho_temporario = carrinho
    let ponteiro = definir_ponteiro(ID, V_ID)

    if (ponteiro !== -1) {
      carrinho_temporario.splice(ponteiro, 1)
      __carrinho(carrinho_temporario)
      inserir_no_servidor()
      setExecucao(!execucao)
      localStorage.setItem('MERCH:CARRINHO', JSON.stringify({ CID: CID, carrinho }))
      return true
    } else {
      setExecucao(!execucao)
      return false
    }

  }

  function esvaziar_carrinho(): void {
    __carrinho([])
    localStorage.removeItem('MERCH:CARRINHO')
    remover_do_servidor()
    setExecucao(!execucao)
  }

  function checkout_mercadopago(): Array<INTERFACE_CHECKOUT_MERCADOPAGO> {
    let lista_de_checkout = [] as Array<INTERFACE_CHECKOUT_MERCADOPAGO>

    carrinho.forEach(item => {
      lista_de_checkout.push({
        id: item.V_ID ? item.V_ID.toString() : item.ID.toString(),
        title: item.nome,
        unit_price: item.preco,
        quantity: item.quantidade,
        picture_url: item.thumbnail,
        currency_id: 'BRL',
        description: ''
      })
    })
    if (frete && tipo_de_frete) {
      lista_de_checkout.push({
        id: 'LOG7',
        title: tipo_de_frete,
        unit_price: frete,
        quantity: 1,
        currency_id: 'BRL',
        description: 'Entrega contratada'
      })
    }
    setExecucao(!execucao)
    return lista_de_checkout
  }

  function criar_lista_woocommerce(): Array<INTERFACE_LISTA_WOOCOMMERCE> {
    let lista = [] as Array<INTERFACE_LISTA_WOOCOMMERCE>

    carrinho.forEach(item => {
      if (!item.V_ID) {
        lista.push({
          product_id: item.ID,
          quantity: item.quantidade
        })
      } else {
        lista.push({
          product_id: item.ID,
          variation_id: item.V_ID,
          quantity: item.quantidade
        })
      }
    })
    setExecucao(!execucao)
    return lista
  }

  function valor_total(): number {
    if (carrinho) {
      let resumo: number = 0
      for (var i = 0; i < carrinho.length; i++) {
        resumo += carrinho[i].preco * carrinho[i].quantidade
      }
      return resumo
    }
  }

  function valor_total_com_frete(): number {
    if (carrinho) {
      return valor_total() + frete
    }
  }

  function quantidade_total(): number {
    if (carrinho) {
      let quantidade: number = 0
      for (var i = 0; i < carrinho.length; i++) {
        quantidade += carrinho[i].quantidade
      }
      return quantidade
    }
  }

  function peso_total(): number {
    if (carrinho) {
      let peso = 0;
      for (var i = 0; i < carrinho.length; i++) {
        peso += carrinho[i].peso
      }
      console.log('peso total: ', peso)
      return peso
    }
  }

  function dimensao_do_pacote(): number {
    if (carrinho) {
      let volume = 0, metrica = 0
      for (var i = 0; i < carrinho.length; i++) {
        volume += (
          parseInt(carrinho[i].dimensoes.height) * parseInt(carrinho[i].dimensoes.length) * parseInt(carrinho[i].dimensoes.width)
        )
      }
      metrica = Math.pow(volume, 1 / 3)
      console.log('media de dimensao: ', metrica)
      return metrica
    }
  }

  function conectar_ao_carrinho(ID: string):
    Promise<{ status: string, msg: string }> {
    return new Promise(async (resolve, reject) => {
      const { data: resposta } = await axios({
        method: 'get',
        url: '/api/v2/loja/receber_carrinho',
        params: { CID: ID }
      })

      if (resposta && resposta.status === 'SUCESSO') {
        __carrinho(JSON.parse(resposta.carrinho))

        localStorage.setItem('MERCH:CARRINHO', JSON.stringify({ carrinho }))
        setExecucao(!execucao)
        resolve({ status: 'SUCESSO', msg: 'Oba! Carrinho recebido, lembre-se de agradecer ao amigo!' })
      } else {
        resolve({ status: 'ERRO', msg: 'Ué, acho que esse carrinho se perdeu por esse mundão!' })
      }
    })
  }

  function compartilhar_carrinho(): { msg: string, ID?: string, link?: string } {
    return ({
      msg: 'Carrinho compartilhado com sucesso',
      ID: CID,
      link: `https://gudbrand.vercel.app/conta/meu-carrinho?carrinhoID=${CID}`
    })

  }

  async function baixar_carrinho(carrinhoID?: string) {
    try {

      const { data: baixar } = await bosons({
        method: 'get',
        url: '/loja/baixar_carrinho',
        params: { CID: carrinhoID }
      })

      if (baixar) {

        if (baixar.status === 'SUCESSO') {
          __carrinho_servidor(baixar.carrinho_servidor)
          __carrinho(baixar.carrinho)
          //__frete(baixar.frete_total)
          localStorage.setItem('MERCH:CARRINHO', JSON.stringify({
            CID: baixar.CID, carrinho: baixar.carrinho
          }))
          localStorage.setItem('MERCH:CARRINHO_SERVER', JSON.stringify(
            baixar.carrinho_servidor
          ))
        }
      }

    } catch (err) {
      console.log(err)
    }


  }

  async function atualizar_frete(cep: string): Promise<boolean> {
    try {

      const { data: res } = await axios({
        method: 'post',
        url: '/api/envio/orcamento_carrinho',
        data: { pacotes: carrinho_servidor, cep },
        headers: { 'DanGuard': 'auau14' }
      })

      if (res) {

        if (res.status === 'DISPONIVEL') {
          let value = 0
          res.frete.forEach(x => value += x.taxa_de_entrega)
          __frete(value)
          __tipo_frete(res.frete.nome)
          __fretes(res.frete)

          return true
        } else {

          return false
        }
      } else {
        return false
      }

    } catch (err) {
      console.log(err)
      return false
    }


  }

  async function inserir_no_servidor(): Promise<void> {
    try {

      const { data: inserir } = await bosons({
        method: 'post',
        url: '/loja/inserir_no_carrinho',
        data: { carrinhos: carrinho, CID }
      })

      if (inserir) {

        if (inserir.status === 'SUCESSO') {
          __carrinho_servidor(inserir.carrinho_servidor)
          __carrinho(inserir.carrinho)
          //__frete(inserir.frete_total)
          __CID(inserir.CID)
          localStorage.setItem('MERCH:CARRINHO', JSON.stringify({
            CID: inserir.CID, carrinho
          }))
          localStorage.setItem('MERCH:CARRINHO_SERVER', JSON.stringify(
            inserir.carrinho_servidor
          ))

        }
      }

    } catch (err) {
      console.log(err)
    }


  }

  async function remover_do_servidor(): Promise<boolean> {
    if (CID) {

      try {

        const { data: res } = await bosons({
          method: 'get',
          url: '/loja/remover_carrinho',
          params: { CID }
        })

        if (res && res.status === 'REMOVIDO') {
          return true
        } else {
          return false
        }

      } catch (Err) {
        console.log(Err)
      }
    }
  }

  return (
    <CONTEXTO_DO_CARRINHO_DE_COMPRAS.Provider value={{
      carrinho, adicionar, remover, deletar, checkout_mercadopago, frete, tipo_de_frete,
      criar_lista_woocommerce, valor_total, quantidade_total, esvaziar_carrinho,
      peso_total, dimensao_do_pacote, conectar_ao_carrinho, compartilhar_carrinho,
      valor_total_com_frete, logistica, tempo_de_entrega, carrinho_servidor, CID,
      atualizar_frete, selecionado, __selecionado, inserir_no_servidor, fretes, __fretes
    }}>
      {children}
    </CONTEXTO_DO_CARRINHO_DE_COMPRAS.Provider>
  )
}

async function conectar_ao_banco_de_carrinhos(DAN: string) {
  const { data } = await axios({
    method: 'get',
    url: '/api/v2/loja/recuperar_carrinho',
    params: { DAN }
  })
  if (data && data.status !== 'ERRO') {
    return (data.carrinho)
  }
}