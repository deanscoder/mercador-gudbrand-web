import mongoose from '../../../../..'
import { model } from 'mongoose'
import {
  INTERFACE_DO_DOCUMENTO_DO_CARRINHO,
  INTERFACE_DE_MODELO_DO_LIVRO
} from '../Interface'
import { v4 as uuid } from 'uuid'

const CarrinhoSchema = mongoose.Schema({
  DAN: { type: String, unique: true, sparse: true, index: true, default: uuid() },
  carrinho: [{
    loja: String,
    loja_ID: Number,
    frete: { type: Number, default: 0 },
    tempo_de_entrega: { min: Number, max: Number },
    nome_frete: String,
    media_de_dimensoes: Number,
    peso_total: { type: Number, default: 0 },
    carrinho: [{
      ID: Number,
      V_ID: Number,
      nome: String,
      url: String,
      thumbnail: String,
      quantidade: Number,
      preco: Number,
      dimensoes: {
        length: String,
        width: String,
        height: String
      },
      peso: Number,
      lojas: [{ id: Number, name: String, slug: String }]
    }]
  }],
  pertence_a: String,
  criado_em: { type: Date, expires: '7d', default: Date.now() }
})

//delete mongoose.connection.models.Book
export default mongoose.models.Carrinho as INTERFACE_DE_MODELO_DO_LIVRO ||
  model<INTERFACE_DO_DOCUMENTO_DO_CARRINHO, INTERFACE_DE_MODELO_DO_LIVRO>(
    'Carrinho', CarrinhoSchema)