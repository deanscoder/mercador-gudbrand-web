import Livro from '../Modelo'
import { INTERFACE_DO_LIVRO } from '../Interface'

export default new class LIVRO {

  // LISTAR TODOS INDEXES
  listar() {
    return Livro.find()
  }

  // LISTAR TODOS INDEXES
  pegar_um(query) {
    return Livro.findOne(query)
  }

  // ACHAR Livro ATRAVES DO DAN DO comprador
  comprador(DAN: string) {
    return Livro.find({
      comprador_ID: DAN,
      $or: [
        { status: 'processing' },
        { status: 'completed' },
        { status: 'cancelled' },
        { status: 'refunded' }]
    })
  }

  // ACHAR Livro ATRAVES DO pagamento ID
  pagamento(ID: string) {
    return Livro.findOne({ pagamento_ID: ID })
  }

  // ACHAR Livro ATRAVES DO pedido ID
  pedido(ID: number) {
    return Livro.findOne({ pedido_ID: ID })
  }

  // ATUALIZAR Status DO Livro ATRAVES DO pedido ID
  atualizar_status_via_pedido(ID: number, status: string) {
    return Livro.findOneAndUpdate({ pedido_ID: ID },
      { $set: { status: status } }, { new: true })
  }

  // ACHAR Livros ATRAVES DA loja
  loja(LID: number) {
    return Livro.find({ loja_ID: LID })
  }

  // ACHAR Livros ATRAVES DO nome de usuario
  nome_de_usuario(nome: string) {
    return Livro.find({ nome })
  }

  // ACHAR Livros ATRAVES DO cpf de faturamento
  cpf(cpf: string) {
    return Livro.find({ cpf })
  }

  // ACHAR Livros ATRAVES Do endereco ip
  ip(endereco_ip: string) {
    return Livro.find({ endereco_ip })
  }


  // INSERIR NOVO protocolo NO livro
  inserir(protocolo) {
    return Livro.create(protocolo)
  }

  // INSERIR NOVOS protocolos NO livro
  // ATRAVES DE ARRAY
  inserir_varios(protocolos: Array<INTERFACE_DO_LIVRO>) {
    return Livro.create(protocolos)
  }

  // ATUALIZA INDEX DE PRODUTO VINDO DO WOOCOMMERCE
  async atualizar_via_mercado_pago_notification_payment(PID: number, dados) {

    let dados_atualizados = {
      pagamento_ID: dados.id, documento_string: JSON.stringify(dados),
      referencia_externa: dados.external_reference,
      endereco_ip: dados.additional_info.ip_address,
      parcelas: dados.installments,
      tipo_de_pagamento: dados.payment_type_id,
      ultimos_digitos_cartao: dados.card.last_four_digits,
      pedido_do_portal_de_pagamento_ID: dados.id,
      status: 'processing'
    }

    return await Livro.findOneAndUpdate({ pedido_ID: PID }, {
      $set: dados_atualizados
    }, { new: true })

  }

  async deletar_protocolo(PID: number) {
    try {

      Livro.deleteOne({ PID }, null, function (erro) {
        if (erro) {
          console.log(erro)
          return false
        } else {
          return true
        }
      })

      return true

    } catch (Err) {
      return false
    }
  }
}