import { NextApiRequest, NextApiResponse } from "next";
import dandan from '../../../../utilidade/confere_dandan'
import { MerchConnect } from "../../../../config/Woocommerce";
import REPO from "../../../../HPD/DB/NoSQL/Colecoes";

var Cookies = require('cookies')

export default async function Atualizar_Pedidos_Do_Usuario(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.json({ status: 'NAO_AUTORIZADO', erro: 'Verbo inválido!' })
  } else {
    try {
      // CRIA INSTANCIA DE COOKIE
      const cookies = new Cookies(req, res)

      // RECUPERA OS COOKIES DE AUTORIZAÇÃO
      const ada = cookies.get('ada')
      const ada_token = cookies.get('ada-token')

      // ENVIA AS AUTORIZAÇÕES
      // PARA O DAN CHEIRAR
      const { registro } = await dandan(ada, ada_token)

      if (!registro) {
        return res.status(401).json({
          status: 'DESLOGADO',
          erro: 'Você precisa estar logado!'
        })
      }

      // PROCURA A LISTA DE
      // PEDIDOS NO LIVRO CAIXA
      // DESTE USUARIO REQUISITOR
      const resposta = await REPO.LIVRO.comprador(registro.DAN)

      if (!resposta) {
        return res.status(200).json({
          status: 'VAZIO',
          erro: 'Ainda não existem pedidos!'
        })
      }

      // CRIA LISTA DE ID
      // PARA USAR DE DELIMITADOR DO WOO
      const lista_de_IDs = resposta.map(pedido => pedido.pedido_ID)
      let pg = 0, totalPG = 0, lista_de_ordens_woo = []

      // FAZ O LOOP PARA PEGAR TODAS AS ORDENS
      // RELACIONADAS A ESTE USUARIO
      do {

        const { data: resposta_woo, headers: head } = await MerchConnect.get('orders', {
          include: lista_de_IDs, per_page: 100, page: ++pg, status: [
            'processing', 'completed', 'cancelled', 'refunded'
          ]
        })
        totalPG = parseInt(head["x-wp-totalpages"])
        lista_de_ordens_woo = lista_de_ordens_woo.concat(resposta_woo)

      } while (totalPG > pg)

      const processo_de_atualizacao = new Promise((resolve, reject) => {

        // INICIO DO FILTRO DE PEDIDOS
        // VAMOS CHECAR CADA UM DELES SE
        // OS STATUS DE AMBOS BATEM
        resposta.forEach(pedido => {
          lista_de_ordens_woo.forEach(async pedido_woo => {

            // SE O PEDIDO ID DO MONGO
            // FOR IGUAL AO PEDIDO ID DO WOO
            if (pedido.pedido_ID === pedido_woo.id) {

              // SE O STATUS DO WOO
              // FOR DIFERENTE DO STATUS DO MONGO
              if (pedido.status !== pedido_woo.status) {

                try {
                  console.log('tentou atualizar pedido n ', pedido_woo.id)
                  // ATUALIZA O MONGO
                  // PQ ATÉ O MOMENTO NÃO TEM APP PARA ISSO
                  await REPO.LIVRO.atualizar_status_via_pedido(pedido_woo.id,
                    pedido_woo.status
                  )

                } catch (error) {
                  console.log(error)
                  reject(error)
                }

              }

            }

          })
        })

        resolve(true)

      })


      return res.status(200).json({ status: 'FINALIZADO', ok: await processo_de_atualizacao })

    } catch (err) {
      console.log(err)
      return res.json({ status: 'ERRO', erro: err })
    }
  }
}