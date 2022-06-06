import { Model, Document } from "mongoose";

export interface INTERFACE_DE_ENDERECO_DE_USUARIO {
  _id?: string
  cep: string
  endereco?: string
  numero?: string
  cidade?: string
  bairro?: string
  uf?: string
  pais?: string
  nome?: string
  destinatario?: string
  tel?: string
}

interface INTERFACE_DE_FAVORITOS_DE_USUARIO {
  loja?: number
  item?: string
  url?: string
  thumb?: string
}

interface INTERFACE_DE_AVALIACOES_DO_USUARIO {
  produto_id?: number
  avaliacao_id?: number
}

export interface INTERFACE_DE_HISTORICO_DO_USUARIO {
  realizadoEm?: string
  item?: string
  url?: string
  thumb?: string
}

export interface INTERFACE_DE_REGISTRO_DO_USUARIO {
  DAN: string
  IsA: boolean
  usuario?: string
  cpf?: string
  nome: string
  honorifico?: string
  sobrenome: string
  email: string
  senha: string
  chave_reserva?: string
  endereco_padrao?: INTERFACE_DE_ENDERECO_DE_USUARIO
  enderecos?: Array<INTERFACE_DE_ENDERECO_DE_USUARIO>
  telefone?: string
  favoritos?: Array<INTERFACE_DE_FAVORITOS_DE_USUARIO>
  versao_token?: number
  versao_deslogar?: number
  email_ADA?: string
  email_verificado: boolean
  avaliacoes?: Array<INTERFACE_DE_AVALIACOES_DO_USUARIO>
  historico?: Array<INTERFACE_DE_HISTORICO_DO_USUARIO>
}

export interface INTERFACE_DO_DOCUMENTO_DO_REGISTRO
  extends INTERFACE_DE_REGISTRO_DO_USUARIO,
  Document {
  nCompleto?: String
  gerar_codigo_de_verificacao(): String
  alterar_senha(antiga: String, nova: String): Boolean
  gerar_chave_reserva(): String
  revogar_chave_reserva(): Boolean
}
export interface INTERFACE_DE_MODELO_DO_REGISTRO extends
  Model<INTERFACE_DO_DOCUMENTO_DO_REGISTRO> { }