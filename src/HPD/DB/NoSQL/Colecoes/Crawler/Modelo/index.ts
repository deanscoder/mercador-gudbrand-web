import mongoose from '../../../../..'
import { model } from 'mongoose'
import {
  INTERFACE_DO_DOCUMENTO_DO_CRAWLER,
  INTERFACE_DE_MODELO_DO_CRAWLER
} from '../Interface'

const CrawlerSchema = mongoose.Schema({
  PID: { type: Number, unique: true },
  tipo: { type: String, default: 'PRODUTO' },
  nome: { type: String },
  tags: [{ type: String }],
  departamentos: [{ type: String }],
  marcas: [{ type: String }],
  slug: { type: String },
  loja: { type: String },
  LID: { type: Number },
  regiao: { localidade: String, UF: String },
  referencia_externa: { type: String },
  categorias: [{ type: String }],
  palavras_chave: { type: String },
  palavras_chute: [{ type: String }],
  criadoEm: { type: Date, default: Date.now() },
  imagens: [{ src: String, alt: String, nome: String }],
  preco: { type: String },
  indexar: { type: Boolean, default: true }
})

export default mongoose.models.Crawler as INTERFACE_DE_MODELO_DO_CRAWLER ||
  model<INTERFACE_DO_DOCUMENTO_DO_CRAWLER, INTERFACE_DE_MODELO_DO_CRAWLER>('Crawler', CrawlerSchema)