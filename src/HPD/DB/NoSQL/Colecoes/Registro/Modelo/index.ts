import mongoose from '../../../../..'
import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import {
  INTERFACE_DO_DOCUMENTO_DO_REGISTRO,
  INTERFACE_DE_MODELO_DO_REGISTRO
} from '../Interface'

import { sign } from 'jsonwebtoken'

const opts = { toJSON: { virtuals: true } };

const RegistroSchema = mongoose.Schema({
  DAN: { type: String, unique: true, default: uuid() },
  IsA: { type: Boolean, default: false },
  usuario: { type: String, lowercase: true, sparse: true, index: true, unique: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String },
  cpf: { type: String },
  honorifico: { type: String },
  endereco_padrao: {
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
  enderecos: [{
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
  }],
  telefone: { type: String, unique: true, sparse: true, index: true },
  favoritos: [
    {
      loja: Number,
      item: String,
      url: String,
      thumb: String
    }
  ],
  historico: [
    {
      realizadaEm: { type: Date, default: Date.now() },
      item: String,
      url: String,
      thumb: String
    }
  ],
  avaliacoes: [{
    produto_id: Number,
    avaliacao_id: Number
  }],
  email_verificado: { type: Boolean, default: false },
  email_ADA: { type: String, default: '' },
  versao_token: { type: Number, default: 0 },
  versao_deslogar: { type: Number, default: 0 },
  chave_reserva: { type: String }
}, opts)

RegistroSchema.pre('save', async function (next) {
  let nb = Math.trunc(Math.random() * (999 - 100) + 100)
  if (!this.usuario) {
    this.usuario = this.nome.toLowerCase().replace(" ", ".") + nb.toString()
    //this.wooUsername = this.username
  }
  if (!this.email_ADA) {
    const codigo = Math.floor(Math.random() * 999999 + 100001)
    console.log(codigo)

    this.email_ADA = codigo
  }
  next()
})

RegistroSchema.virtual('nCompleto').get(function () {
  return `${this.nome} ${this.sobrenome}`
})


RegistroSchema.methods.gerar_chave_reserva = async function () {
  try {

    const sugestao = Math.floor(
      Math.random() * Date.now() / 2 * 7).toString(16)

    let sobrenome = this.sobrenome as string
    let array = sobrenome.split(' ')
    let nome = array[array.length - 1].toLowerCase()

    const nova = nome + sugestao
    const hash = await bcrypt.hash(nova, 10)
    this.chave_reserva = hash
    this.save()
    return nova
  } catch (err) {
    return ''
  }
}

RegistroSchema.methods.revogar_chave_reserva = async function () {
  try {

    this.chave_reserva = ''
    this.save()
    return true
  } catch (err) {
    return false
  }
}

RegistroSchema.methods.alterar_senha = async function alterar_senha
  (chave: string, nova: string) {
  try {

    if (this.chave_reserva && this.chave_reserva.length > 1) {

      if (!await bcrypt.compare(chave, this.chave_reserva)) {
        return false
      } else {
        this.chave_reserva = ''
        const hash = await bcrypt.hash(nova, 10)
        this.senha = hash
        this.save()
        return true
      }

    }

    if (!await bcrypt.compare(chave, this.senha)) {
      return false
    } else {
      const hash = await bcrypt.hash(nova, 10)
      this.senha = hash
      this.save()
      return true
    }



  } catch (Err) {
    console.log(Err)
    return false
  }

}

RegistroSchema.methods.gerar_codigo_de_verificacao = async function () {
  const codigo = Math.floor(Math.random() * 999999 + 100001)
  console.log(codigo)

  this.email_ADA = codigo
  this.save()

  return this.email_ADA
}

export default mongoose.models.Registro as INTERFACE_DE_MODELO_DO_REGISTRO ||
  model<INTERFACE_DO_DOCUMENTO_DO_REGISTRO, INTERFACE_DE_MODELO_DO_REGISTRO>
    ('Registro', RegistroSchema)
