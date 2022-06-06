import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from 'mercadopago'
import { MerchConnect } from '../../../../config/Woocommerce'
import Zoe from "../../../../config/telegram";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';

const ANDRADE = process.env.TELEGRAM_PAI_ID

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN_TEST,
  sandbox: true
})

function MENSAGENS() {
  const greetings = [
    'Hooooyah, temos uma nova encomenda.',
    'Ow, vendeu um negócio aqui ó;',
    'Ebaaa! mais uma venda hein!',
    'Quem é a melhor vendedora? aqui está o novo pedido!;'
  ]

  return (greetings[Math.floor(Math.random() * greetings.length)])
}

export default function receptorDoMercadoPago(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.json({ status: 'ERRO', erro: 'Protocolo inválido!' })
  }
  return new Promise(async (resolve, reject) => {
    const { type: TIPO, data: DADOS_DA_NOTIFICACAO } = req.body

    console.log(req.body)
    if (TIPO === 'payment') {
      //SOLICITA AO SERVIDOR MERCADO PAGO DADOS SOBRE ESSA TRANSAÇÃO
      const DADOS_DO_PAGAMENTO = await mercadopago.payment
        .findById(parseInt(DADOS_DA_NOTIFICACAO.id as string))

      const { body: pagamento_mp } = DADOS_DO_PAGAMENTO

      if (!DADOS_DO_PAGAMENTO) {

        res.json({ status: 'ERRO', erro: 'Pagamento não encontrado!' })
        resolve(res)

      } else if (DADOS_DO_PAGAMENTO && DADOS_DO_PAGAMENTO.status === 404)
        res.json({ status: 'ERRO', erro: 'Pagamento não encontrado!' })

      resolve(res)

      const { data: valida } = await MerchConnect.get('orders/' + pagamento_mp.external_reference)

      if (valida) {
        if (valida.status !== 'pending') {
          res.json({ status: 'ERRO', erro: 'Pedido inválido!' })
          resolve(res)
        }
      }

      const { data: resposta } = await MerchConnect.put(
        `orders/${parseInt(pagamento_mp.external_reference)}`,
        { status: 'processing' })

      console.log(resposta, 'ATUALIZADO WOOCOMERCE PEDIDO')

      //PROCURA SE HÁ UM REGISTRO COM ESSE ID E ATT
      const livro = await REPO.LIVRO.atualizar_via_mercado_pago_notification_payment(
        parseInt(pagamento_mp.external_reference)
        , {
          pagamento_ID: pagamento_mp.id, documento_string: JSON.stringify(pagamento_mp),
          referencia_externa: pagamento_mp.external_reference,
          endereco_ip: pagamento_mp.additional_info.ip_address,
          parcelas: pagamento_mp.installments,
          tipo_de_pagamento: pagamento_mp.payment_type_id,
          ultimos_digitos_cartao: pagamento_mp.card.last_four_digits,
          pedido_do_portal_de_pagamento_ID: pagamento_mp.id,
          status: 'processing'
        })

      console.log(livro, 'ATUALIZAÇAO DE LIVRO FINANCEIRO')


      if (!livro) {
        //PESQUISA O REG DO COMPRADOR PELO METADATA
        const registro = await REPO.REGISTRO.DAN(pagamento_mp.metadata.DAN)

        if (!registro) {
          Zoe.sendMessage(ANDRADE, `Recebemos uma notícia de pagamento 
            orfão, não encontramos uma conta associada. Precisamos analisar. 
            ID: ${pagamento_mp.id}
            Comprador: ${pagamento_mp.payer.email}
            META: ${pagamento_mp.metadata}`, { parse_mode: 'HTML' })
        }

        //GRAVA NOVO REGISTRO NO LIVRO CAIXA
        const caixa = await REPO.LIVRO.inserir({
          pagamento_ID: pagamento_mp.id, documento_string: JSON.stringify(pagamento_mp),
          referencia_externa: pagamento_mp.external_reference,
          endereco_ip: pagamento_mp.additional_info.ip_address,
          parcelas: pagamento_mp.installments,
          tipo_de_pagamento: pagamento_mp.payment_type_id,
          ultimos_digitos_cartao: pagamento_mp.card.last_four_digits,
          pedido_do_portal_de_pagamento_ID: pagamento_mp.id,
          status: 'ORFAO', nome: pagamento_mp.metadata.nome,
          sobrenome: pagamento_mp.metadata.sobrenome
        })

        Zoe.sendMessage(ANDRADE, `
            ${MENSAGENS()}
            Pedido: ${pagamento_mp.id}
            Comprador: ${pagamento_mp.metadata.nome} ${pagamento_mp.metadata.sobrenome}
            Email: ${pagamento_mp.payer.email}
            Forma de pagamento: ${pagamento_mp.payment_type_id}
            Entrega: ${pagamento_mp.additional_info.payer.address.street_name}, ${pagamento_mp.additional_info.payer.address.street_number} - ${pagamento_mp.additional_info.payer.address.zip_code}
            `, { parse_mode: 'HTML' })

        res.json({ status: 'SUCESSO' })
        resolve(res.json)
      }

      res.json({ status: 'EVENTO_DUPLICADO' })
      resolve(res.json)
    }
    res.json({ status: 'TIPO_NAO_UTILIZADO' })
    resolve(res.json)
  })
}

/* "https://api.telegram.org/bot1628065676:AAG58L27eRn0jG_HRzi7jlGe35H6H0cP5Xg/getUpdates" */
