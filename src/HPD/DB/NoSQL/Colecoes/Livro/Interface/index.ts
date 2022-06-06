import { Model, Document } from "mongoose";
import {
  INTERFACE_CHECKOUT_MERCADOPAGO,
  INTERFACE_LISTA_WOOCOMMERCE,
  ITEM_NO_CARRINHO
} from "../../../../../../components/Zoe/Contextos/carrinho";
import { INTERFACE_DE_ENDERECO_DE_USUARIO } from "../../Registro/Interface";


export interface INTERFACE_DO_LIVRO {
  status: string
  pagamento_ID?: string
  comprador_ID?: string
  pedido_ID?: number
  loja_ID?: number
  referencia_externa?: string
  pedido_do_portal_de_pagamento_ID?: string
  cpf: string
  nome: string
  sobrenome: string
  realizado_em?: string
  tipo_de_pagamento?: string
  parcelas?: number
  documento_string?: string
  ultimos_digitos_cartao?: string
  endereco_ip?: string
  entrega?: INTERFACE_DE_ENDERECO_DE_USUARIO
  cupom?: CupomLivroData
  codigo_de_rastreamento?: string
  custo_de_entrega?: string
  total_pago?: string
  carrinho?: Array<ITEM_NO_CARRINHO>
  line_items?: Array<INTERFACE_LISTA_WOOCOMMERCE>
  checkout_mercado_pago?: Array<INTERFACE_CHECKOUT_MERCADOPAGO>
}

export interface CupomLivroData {
  ID?: string,
  desconto?: number
}

export interface ItemsData {
  titulo: string
  quantidade: number
  preco_unitario: number
  descricao: string
  moeda_ID: string
  categoria_ID: string
  ID: string
  V_ID?: string
  thumbnail: string
}

export interface INTERFACE_DO_DOCUMENTO_DO_LIVRO extends
  INTERFACE_DO_LIVRO, Document {

}

export interface INTERFACE_DE_MODELO_DO_LIVRO extends
  Model<INTERFACE_DO_DOCUMENTO_DO_LIVRO> { }