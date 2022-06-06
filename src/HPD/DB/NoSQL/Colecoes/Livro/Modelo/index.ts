import mongoose from '../../../../..'
import { model } from 'mongoose'
import { INTERFACE_DO_DOCUMENTO_DO_LIVRO, INTERFACE_DE_MODELO_DO_LIVRO } from '../Interface'

const LivroSchema = mongoose.Schema({
  status: { type: String },
  pagamento_ID: { type: String },
  referencia_externa: String,
  pedido_do_portal_de_pagamento_ID: { type: String }, //merchant_order_id
  pedido_ID: { type: Number, unique: true },  //woocommerce_order_id
  comprador_ID: { type: String }, //registro_DAN
  loja_ID: { type: String },
  cpf: { type: String },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  realizado_em: { type: Date, default: Date.now() },
  atualizado_em: { type: Date, default: Date.now() },
  tipo_de_pagamento: String,
  parcelas: Number,
  total_pago: String,
  ultimos_digitos_cartao: String,
  documento_string: { type: String },
  endereco_ip: { type: String },
  entrega: {
    cep: { type: String },
    endereco: String,
    numero: String,
    bairro: String,
    cidade: String,
    uf: String,
    pais: String,
    nome: String,
    destinatario: String,
    tel: String
  },
  codigo_de_rastreamento: { type: String },
  custo_de_entrega: { type: String },
  cupom: {
    ID: String,
    desconto: Number
  },
  carrinho: [
    {
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
      peso: Number
    }
  ],
  line_items: [
    {
      product_id: Number,
      variation_id: Number,
      quantity: Number
    }
  ],
  checkout_mercado_pago: [
    {
      id: String,
      title: String,
      unit_price: Number,
      quantity: Number,
      picture_url: String,
      currency_id: String,
      description: String
    }
  ]
})

LivroSchema.pre('save', async function (next) {
  this.atualizado_em = Date.now()
  next()
})

//delete mongoose.connection.models.Livro
export default mongoose.models.Livro as INTERFACE_DE_MODELO_DO_LIVRO ||
  model<INTERFACE_DO_DOCUMENTO_DO_LIVRO, INTERFACE_DE_MODELO_DO_LIVRO>(
    'Livro', LivroSchema)