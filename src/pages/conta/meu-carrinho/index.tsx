import * as css from '../../../styles/pages/MeuCarrinho'
import { useZoe } from '../../../components/Zoe/Contextos/ZOE'
import Navegacao from '../../../components/Header/Navegacao'
import FreteCarrinho from '../../../components/Frete/frete-carrinho-de-compras'
import { IoCloseSharp } from 'react-icons/io5'
import { RiShareForward2Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import BannerSiga from '../../../components/Siga'

export default function Meu_Carrinho() {
  const { carrinho: {
    carrinho, deletar, valor_total, compartilhar_carrinho, conectar_ao_carrinho, inserir_no_servidor }
  } = useZoe()
  const router = useRouter()
  const { carrinhoID } = router.query

  async function compartilhar() {
    const { msg, ID, link } = await compartilhar_carrinho()
    if (msg && ID && link) {
      NotificationManager.success(msg, 'Carrinho compartilhado')
      NotificationManager.info('Agora é só compartilhar', 'Link copiado!')
      navigator.clipboard.writeText(link)
    } else {
      NotificationManager.info(msg, 'Ops!')
    }
  }

  async function pegar_carrinho() {
    const { status, msg } = await conectar_ao_carrinho(carrinhoID as string)
    if (status && status === 'SUCESSO') {
      NotificationManager.success(msg, 'Carrinho recebido')
    } else {
      NotificationManager.warn(msg, 'Vish, deu ruim')
    }
  }

  useEffect(() => {
    if (carrinhoID) {
      pegar_carrinho()
    }
  }, [])

  return (
    <>
      <Navegacao nome={'Carrinho'} />
      <css.Container>
        <css.Lista>
          {/* {!!carrinho.length &&
            <li>
              <button id='compartilhar-carrinho' onClick={compartilhar}>
                <RiShareForward2Line /> Gerar link e copiar
          </button>
            </li>} */}

          {carrinho && carrinho.map(produto => <li key={produto.url + produto.V_ID}>
            <css.FotoDoProduto onClick={() => router.push('/item/' + produto.url)} url={produto.thumbnail} />

            <div className='ul-li-div-titulo' onClick={() => router.push('/item/' + produto.url)}>
              <h2>{produto.nome}</h2>
              <p>R${produto.preco}</p>
            </div>

            <div className='ul-li-div-meta'>
              <b>QTD</b>
              <p className="carrinho-quantidade">{produto.quantidade}</p>
            </div>

            <div className='ul-li-div-controles'>
              <button onClick={() => {
                deletar(produto.ID, produto.V_ID)
                NotificationManager.info('', 'Produto retirado do carrinho')
              }}>
                <IoCloseSharp />
              </button>
            </div>
          </li>)}

          <li className='mobile-balanco'>
            <div>Sub Total</div>
            <div>R$ {valor_total().toFixed(2)}</div>
          </li>

          <li className='mobile-balanco'>
            <div>Taxa de entrega</div>
            <div><FreteCarrinho subtotal={valor_total()} /></div>
          </li>

          <li className='mobile-balanco'>
            <css.BotaoDeCheckout onClick={() => router.push('/mercado/pagar')}>
              Finalizar Compra
          </css.BotaoDeCheckout>
          </li>
        </css.Lista>

        <css.Painel>
          <h2>Balanço</h2>
          <div>
            sub-total: R$ {valor_total().toFixed(2)}
            {!!carrinho.length && <FreteCarrinho subtotal={valor_total().toFixed(2)} />}
          </div>
          <css.BotaoDeCheckout onClick={() => router.push('/mercado/pagar')} className='btn-sem-borda'>
            Finalizar Compra
        </css.BotaoDeCheckout>
        </css.Painel>
        <NotificationContainer />
      </css.Container>
      <BannerSiga />
    </>
  )
}