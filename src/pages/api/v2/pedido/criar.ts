import { NextApiRequest, NextApiResponse } from "next";
import { MerchConnect } from '../../../../config/Woocommerce'
import mercadopago from 'mercadopago'
import REPO from "../../../../HPD/DB/NoSQL/Colecoes";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN_TEST,
  sandbox: true
})

/* preferences.back_urls = {
  success: `https://gudbrand.vercel.app/api/v2/gateway/redirecionamento-sucesso`,
  failure: `https://gudbrand.vercel.app/api/v2/gateway/redirecionamento-divergente`,
  pending: `https://gudbrand.vercel.app/api/v2/gateway/redirecionamento-divergente`
}

preferences.notification_url = `https://gudbrand.vercel.app/api/v2/gateway/queue`

preferences.auto_return = 'approved'
preferences.binary_mode = true */

//const { body } = await mercadopago.preferences.create(preferences)

export default async function Criar_Pedido(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { usuarioID, carrinho, endereco, frete, checkout, line_items, tipo_de_frete,
    pedido_ID, preferencia, numero, total_pago, CID } = req.body

  if (req.method === 'GET')
    return res.json({ erro: "Não autorizado!" })

  else if (req.method === 'POST' &&
    req.headers.authorization === 'tilapiaseafogando') {

    return new Promise(async (resolve, reject) => {

      const USUARIO = await REPO.REGISTRO.DAN(usuarioID as string)

      const carrinho_servidor = await REPO.CARRINHO.atualizar_logistica(
        CID as string, endereco.cep as string)

      console.log(carrinho_servidor.fretes, 'FRETES -------')

      if (!USUARIO) { //USUARIO NÃO ENCONTRADO

        res.json({ status: 'ERRO', erro: 'Usuário inválido' })
        resolve(res)

      }

      if (pedido_ID) { //DELETA PEDIDO ANTERIOR

        //console.log('-----', pedido_ID)
        const CHECA_PEDIDO = await MerchConnect.get('orders/' + pedido_ID)
        //console.log('res do checa pedido', CHECA_PEDIDO)

        if (CHECA_PEDIDO) {

          try {

            const { header: DELETA } = await
              MerchConnect.delete(`orders/${pedido_ID}`)

            //console.log('DELETA HEADER: ', DELETA)

            await REPO.LIVRO.deletar_protocolo(pedido_ID)

          } catch (err) {

            console.log(err)
            resolve(res)

          }
        }

      }

      try {

        const { data: CRIAR_PEDIDO_WOOCOMMERCE } = await MerchConnect.post('orders', {
          payment_method: 'MPGATE',
          payment_method_title: 'Pagamento via Mercado Pago',
          status: 'pending',
          billing: {
            first_name: USUARIO.nome,
            last_name: USUARIO.sobrenome,
            address_1: endereco.endereco + ', ' + endereco.numero,
            city: endereco.cidade,
            state: endereco.uf,
            postcode: endereco.cep,
            country: 'BR',
            email: USUARIO.email,
            phone: numero ? numero : USUARIO.telefone
          },
          shipping: {
            first_name: endereco.destinatario,
            last_name: '',
            address_1: endereco.endereco + ', ' + endereco.numero,
            city: endereco.cidade,
            state: endereco.uf,
            postcode: endereco.cep,
            country: 'BR',
          },
          shipping_lines: [
            {
              method_id: 'GUDBRAND_TRANSPORTE',
              method_title: tipo_de_frete ? tipo_de_frete : 'Transporte Gudbrand',
              total: frete.toString()
            }
          ],
          line_items: line_items
        })

        //console.log(CRIAR_PEDIDO_WOOCOMMERCE)

        if (!CRIAR_PEDIDO_WOOCOMMERCE) {

          res.json({ status: 'ERRO', erro: 'O pedido não pode ser gerado' })
          resolve(res)

        }

        await REPO.LIVRO.inserir({
          nome: USUARIO.nome, sobrenome: USUARIO.sobrenome, comprador_ID: usuarioID,
          status: 'pending', entrega: endereco,
          custo_de_entrega: frete.toString(), pedido_ID: CRIAR_PEDIDO_WOOCOMMERCE.id,
          carrinho, line_items, checkout_mercado_pago: checkout, total_pago
        })
        //console.log('CRIANDO NOVO PEDIDO: ',CRIAR_NOVO_PEDIDO_ABERTO)

        //INICIO DE GATE DE PAGAMENTO -------

        preferencia.back_urls = {

          success: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/gateway/redirecionamento-sucesso`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/gateway/redirecionamento-divergente`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/gateway/redirecionamento-divergente`

        }

        preferencia.notification_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/gateway/queue`

        preferencia.external_reference = CRIAR_PEDIDO_WOOCOMMERCE.id.toString()
        preferencia.auto_return = 'approved'
        preferencia.binary_mode = true

        //console.log('--------', preferencia)

        const { body } = await mercadopago.preferences.create(preferencia)

        //FIM DE GATE DE PAGAMENTO ------

        console.log(body)
        console.log(body.init_point)

        res.json({
          status: 'SUCESSO',
          init_point: body.init_point,
          sandbox_init_point: body.sandbox_init_point,
          pedido_ID: CRIAR_PEDIDO_WOOCOMMERCE.id
        })

      } catch (err) {

        console.log(err)
        res.json({ status: 'ERRO', erro: 'Serviço indisponível' })

      }

      resolve(res)

    })
  }
  else {
    return res.json({ erro: "Não autorizado!" })
  }
}
