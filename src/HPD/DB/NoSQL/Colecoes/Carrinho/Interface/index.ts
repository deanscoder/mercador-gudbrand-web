import { Model, Document } from "mongoose";

export interface INTERFACE_DE_ITENS_NO_CARRINHO {
  ID: number
  V_ID?: number
  nome: string
  url: string
  thumbnail?: string
  quantidade: number
  preco: number
  dimensoes?: {
    length: string
    width: string
    height: string
  }
  peso?: number
  lojas?: Array<{ id: number, name: string, slug: string }>
}

export interface INTERFACE_DO_CARRINHO_POR_LOJA {
  loja: string
  frete?: number
  nome_frete?: string
  tempo_de_entrega?: {min?: number, max?: number}
  media_de_dimensoes?: number
  peso_total?: number
  loja_ID: number
  carrinho: Array<INTERFACE_DE_ITENS_NO_CARRINHO>
}

export interface INTERFACE_DO_CARRINHO {
  DAN: string
  carrinho: Array<INTERFACE_DO_CARRINHO_POR_LOJA>
  pertence_a?: string
  criado_em?: Date
}

export interface INTERFACE_DO_DOCUMENTO_DO_CARRINHO extends
  INTERFACE_DO_CARRINHO, Document { }

export interface INTERFACE_DE_MODELO_DO_LIVRO extends
  Model<INTERFACE_DO_DOCUMENTO_DO_CARRINHO> { }