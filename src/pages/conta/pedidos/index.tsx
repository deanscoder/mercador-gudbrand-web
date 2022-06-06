import * as css from '../../../styles/pages/Pedido'
import { useZoe } from '../../../components/Zoe/Contextos/ZOE'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Link from 'next/link'
import Navegacao from '../../../components/Header/Navegacao'

export default function Meus_Pedidos() {
  const { autenticacao: { esta_logado, requisitar_meus_pedidos,
    pedidos } } = useZoe()
  const Router = useRouter()
  const [autorizado, setAutorizado] = useState(true)

  async function esta_autorizado() {
    if (await esta_logado()) {
      setAutorizado(true)
    } else {
      setAutorizado(false)
    }
  }

  useEffect(() => {
    esta_autorizado()
  }, [])

  useEffect(() => {
    if (!autorizado) {
      NotificationManager.info('Você precisa estar logado!', 'ヽ (‘ー `) ┌ ')
      Router.push('/conta/acesse?redirecionado=sim')
    } else {
      requisitar_meus_pedidos()
    }
  }, [autorizado])

  return (<>
    <Navegacao nome="Histórico de pedidos" />
    <css.Container>
      <css.Lista>
        {pedidos && pedidos.todos &&
          !!pedidos.todos.length &&
          pedidos.todos.reverse().map(pedido => <li key={pedido.pedido_ID}>

            <div className="primeiro-div-de-pedido">
              <h4>{new Date(pedido.realizado_em).getDate() + '/' +
                new Date(pedido.realizado_em).getMonth() + '/' +
                new Date(pedido.realizado_em).getFullYear() + ' às '
                + new Date(pedido.realizado_em).getHours().toLocaleString() + ':' +
                new Date(pedido.realizado_em).getMinutes().toLocaleString()}</h4>
              <h3>Pedido: {pedido.pedido_do_portal_de_pagamento_ID ?
                pedido.pedido_do_portal_de_pagamento_ID : pedido.pedido_ID}
              </h3>
              <p>{
                pedido.status === 'processing' &&
                pedido.codigo_de_rastreamento &&
                `Pedido Enviado - ${pedido.codigo_de_rastreamento}`
              }{
                  pedido.status === 'processing' &&
                  !pedido.codigo_de_rastreamento &&
                  'Preparando'
                }{
                  pedido.status === 'cancelled' &&
                  'Cancelado'
                }{
                  pedido.status === 'completed' &&
                  'Finalizado'
                }{
                  pedido.status === 'refunded' &&
                  'Estornado'
                }
              </p>
            </div>

            <div>
              {pedido.carrinho.map(item => <Link key={item.nome}
                href={'/item/' + item.url}>
                <a>
                  {item.quantidade}x - {item.nome} - R${item.preco}
                </a>
              </Link>)}
            </div>

            <div className='div-lateral'>
              <div>Forma de pagamento: {pedido.tipo_de_pagamento}</div>
              {pedido.ultimos_digitos_cartao &&
                <div>
                  Ultimos dígitos do cartão: ****{pedido.ultimos_digitos_cartao}
                </div>}
              {pedido.parcelas && <div>Parcelado em {pedido.parcelas}</div>}
            </div>

            {pedido.total_pago &&
              <div className="div-lateral">
                {pedido.custo_de_entrega &&
                  <div>Custo de entrega: {pedido.custo_de_entrega}</div>}
                <div>
                  Total Pago: {pedido.total_pago}
                </div>
              </div>}


          </li>)}

      </css.Lista>
      <NotificationContainer />
    </css.Container>
  </>
  )
}