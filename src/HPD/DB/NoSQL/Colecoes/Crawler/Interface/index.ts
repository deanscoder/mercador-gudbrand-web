import { Model, Document } from "mongoose";

export interface INTERFACE_DO_CRAWLER {
  PID: number
  LID?: number
  nome?: string
  tipo?: string
  slug?: string
  loja?: string
  tags?: Array<string>
  marcas?: Array<string>
  departamentos?: Array<string>
  categorias?: Array<string>
  referencia_externa?: string
  palavras_chave?: string
  palavras_chute?: Array<string>
  criadoEm?: string
  imagens?: Array<{ src: string, nome?: string, alt?: string }>
  regiao?: { localidade: string, UF: string }
  preco?: string
  indexar?: boolean
}

export interface INTERFACE_DO_DOCUMENTO_DO_CRAWLER extends
  INTERFACE_DO_CRAWLER, Document {

}

export interface INTERFACE_DE_MODELO_DO_CRAWLER extends
  Model<INTERFACE_DO_DOCUMENTO_DO_CRAWLER> { }