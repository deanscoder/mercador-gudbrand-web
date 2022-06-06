import { Document, Model, Types } from "mongoose";

interface AvaliacoesData {
  comprador?: Array<Types.ObjectId> | Record<string, unknown>;
  conteudo?: string
  fotos?: Array<string>
}

interface DimensoesData {
    busto?: { max: number, min: number }
    biceps?: { max: number, min: number }
    torax?: { max: number, min: number }
    cintura?: { max: number, min: number }
    quadril?: { max: number, min: number }
    quadriceps?: { max: number, min: number }
    joelho?: { max: number, min: number }
    comprimento?: number
}

interface TamData {
  nome: string
  sku: string
  quantidade: number
  valor: number
  dimensoes: DimensoesData
}

interface CorData {
  nome: string
  hex: string
  fotos: Array<string>
  videos: Array<string>
  tamanho: Array<TamData>
}

interface EspecificacoesData {
  pacote: {
    peso: string
    altura: number
    comprimento: number
    largura: number
    diametro?: number
  }
  artigo: {
    material: string
    lavagem?: string
    modelo: string
    categoria?: string
    publico?: string
  }
}

export interface Busca {
  palavras: Array<string>
}

interface Cor {
  nome?: string
  hex?: string
}

export interface Inventario {
  nome?: string
  preco?: number
  qtd?: number
  dimensoes?: DimensoesData
}

export interface ModeloData {
    nome: string
    link: string
    veste: string
    medidas: {
      altura: number
      torax: number
      busto: number
      biceps: number
      cintura: number
      quadril: number
      coxa: number
    }
}

export interface Artigo {
  DANv5?: string
  nome: string
  manufatura: string
  slug?: string
  especificacoes?: EspecificacoesData
  modelo?: ModeloData
  descricao?: string
  apresentacao?: Array<string>
  vitrine?: boolean
  criadoEm?: string
  atualizadoEm?: string
  cores?: Array<CorData>
  avaliacoes?: Array<AvaliacoesData>
  busca?: Busca
  guia?: string

  categoria?: Array<string>
  preco?: number
  qtd?: number
  refs?: string
  cor?: Cor
  img?: Array<string>
  variantes?: Array<Inventario>
}

export interface ArtigoDocument extends Artigo, Document {}

export interface ArtigoModel extends Model<ArtigoDocument> {}

//INTERFACE DE REQUISIÇÂO GRAPHQL

export interface ArtigoInput {
  nome?: string
  manufatura?: string
  especificacoes?: EspecificacoesData
  modelo?: ModeloData 
  descricao?: string
  apresentacao?: [string]
  vitrine?: boolean
  //cores?: CorData
  avaliacoes?: [AvaliacoesData]
  busca?: Busca
  guia?: string

  categoria?: Array<string>
  preco?: number
  qtd?: number
  ref?: string
  cor?: Cor
  img?: Array<string>
  child?: boolean
  variantes?: Array<Inventario>
}