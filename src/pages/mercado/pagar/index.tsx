import axios from 'axios'
import { useEffect, useState } from 'react'
import Navegacao from '../../../components/Header/Navegacao'
import { useZoe } from '../../../components/Zoe/Contextos/ZOE'
import * as css from '../../../styles/pages/Pagar'
import Router from 'next/router'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTema } from '../../../contexts/theme'
import ScaleLoader from "react-spinners/ScaleLoader";
import faces from '../../../HPD/ALIAS/notification_faces'

/* 

   ÁREA DE CHECKOUT - PAGAMENTOS
   INTEGRAÇÃO COM MERCADO PAGO, MELHOR ENVIO E WOOCOMMERCE
   EZEQUIEL GUDBRAND, kinesislake.com - 2022
   @servosalt

 */

export default function Pagar() {
  const {
    carrinho: { carrinho, valor_total, frete, carrinho_servidor,
      atualizar_frete, criar_lista_woocommerce, checkout_mercadopago,
      valor_total_com_frete, fretes, CID },
    autenticacao: { perfil, esta_logado, pedido_em_aberto, carregando,
      criar_modelo_payer_mercado_pago }
  } = useZoe()

  const [pedido_ID, setPedidoID] = useState(0)
  const [contador, setContador] = useState(0)
  const [load, setLoad] = useState(true)
  const [carregando_gate, setCG] = useState(false)
  const [autorizado, setAutorizado] = useState(true)
  const [cpf, setCPF] = useState('')

  const { theme, colors } = useTema()

  const [idx, setIDX] = useState(0)
  const msg = [
    'Abrindo o gate de pagamento',
    'Só mais uns instantes'
  ]

  useEffect(() => {
    setTimeout(() => setIDX(idx + 1), 3000)
  }, [])

  function criar_preferencia_mercado_pago() {
    const preferencia = {
      items: checkout_mercadopago(),
      payer: criar_modelo_payer_mercado_pago(cpf),
      metadata: {
        nome: perfil.nome, sobrenome: perfil.sobrenome
      }
    }
    return preferencia
  }

  async function inicializador() {
    const resposta = await pedido_em_aberto()
    if (resposta.status === 'ENCONTRADO') {
      setPedidoID(resposta.pedido_ID)
      //NotificationManager.info('Pedido recuperado', 'Kirie Gudbrand diz')
    }
    if (perfil.endereco_padrao) {

      await atualizar_frete(perfil.endereco_padrao.cep)

    }
    setLoad(false)

  }

  async function esta_autorizado() {
    if (await esta_logado()) {
      setAutorizado(true)
    } else {
      setAutorizado(false)
    }
  }

  useEffect(() => {
    if (!carregando && contador < 1) {
      setContador(1)
      inicializador()
    }
  }, [carregando, perfil])

  useEffect(() => {
    esta_autorizado()
  }, [])

  useEffect(() => {
    if (!autorizado) {
      NotificationManager.info('Você precisa estar logado', faces.look)
      Router.push('/conta/acesse?redirecionado=sim')
    }
  }, [autorizado])

  async function abrir_gate_de_pagamento() {
    setCG(true)
    const { data: res } = await axios({
      method: 'post',
      url: '/api/v2/pedido/criar',
      data: {
        usuarioID: perfil.DAN,
        carrinho,
        endereco: perfil.endereco_padrao,
        frete,
        CID,
        checkout: checkout_mercadopago(),
        line_items: criar_lista_woocommerce(),
        pedido_ID,
        preferencia: criar_preferencia_mercado_pago(),
        numero: perfil.endereco_padrao.tel.replace(/\D/g, ''),
        total_pago: valor_total_com_frete
      },
      headers: { authorization: 'tilapiaseafogando' } //MEME
    })
    if (res) {
      Router.push(res.sandbox_init_point)
      setCG(false)
    } else {
      setCG(false)
    }
  }



  return (<>
    <Navegacao nome={'Finalizando a compra'} />
    <css.Container>
      {carregando_gate &&
        <css.Tela_de_carregamento>
          <div className="carregando-pagina-pesquisa">
            <ScaleLoader color={colors.accent} loading={carregando_gate} width={10} height={30} />
            {msg && <h3>{msg[idx]}</h3>}
          </div>
        </css.Tela_de_carregamento>
      }

      <SkeletonTheme baseColor={theme.colors.caixa} highlightColor={theme.colors.background}>

        <css.Entrega>
          <css.SubTitulo>{!load ? 'Quem vai receber a encomenda? ' : < Skeleton />}</css.SubTitulo>
          <ul>
            {perfil && perfil.endereco_padrao &&
              <>
                {load ? <Skeleton count={5} /> :
                  <div>
                    <h2>{perfil.endereco_padrao.destinatario}</h2>
                    <p>{perfil.endereco_padrao.tel}</p>
                    <div>{perfil.endereco_padrao.nome}</div>
                    <div>{perfil.endereco_padrao.endereco}, {perfil.endereco_padrao.numero}</div>
                    <div>{perfil.endereco_padrao.cidade} - {perfil.endereco_padrao.uf}</div>
                  </div>
                }
                <div></div>
              </>
            }
          </ul>
          {perfil && !perfil.endereco_padrao &&
            <div className="btn-de-novo-endereco" onClick={() => Router.push('/conta/enderecos/criar')}>
              Adicionar endereço de entrega
            </div>
          }
          {perfil && perfil.endereco_padrao &&
            <div className="btn-de-novo-endereco" onClick={() => Router.push('/conta/enderecos')}>
              Mudar endereço de entrega
            </div>
          }
        </css.Entrega>

        <css.Resumo>
          <css.SubTitulo>{!load ? 'Orçamento detalhado ' : < Skeleton />}</css.SubTitulo>


          {carrinho.length === 0 && <li>
            <div><Skeleton borderRadius={3} width={80} height={80} /></div>
            <div><Skeleton /></div>
            <div><Skeleton /></div>
            <div><Skeleton /></div>
          </li>}

          {!!carrinho_servidor.length && carrinho_servidor.map(o => <div
            key={o.loja}
            className='divisor-de-lojas'>
            <h4>{o.loja}</h4>
            {!!o.carrinho.length && o.carrinho.map(pro => <li key={pro.url + pro.V_ID}>
              <css.Imagem img={pro.thumbnail} />
              <div>{pro.quantidade}x</div>
              <div><h2>{pro.nome}</h2></div>
              <div>R${pro.preco.toFixed(2)}</div>
            </li>)
            }

            <li className="sub-total-li">
              <div><h2>sub-total</h2></div>
              <div>R${valor_final_por_loja(o.carrinho).toFixed(2)}</div>
            </li>
            {!!fretes.length && <li className="sub-total-li">
              <div><h2>{!!fretes.length && fretes.find(x => x.LID === o.loja_ID).nome}</h2></div>
              <div>R${!!fretes.length && fretes.find(x => x.LID === o.loja_ID).taxa_de_entrega.toFixed(2)}</div>
            </li>}
          </div>)}


          <li className="sub-total-li resumo-final">
            {frete ?
              <>
                <div><h2>Custo de entrega</h2></div>
                <div>
                  {frete === -1 && <span className='texto-verde'>frete grátis</span>}
                  {frete === -2 && <span className='texto-laranja'>retirada agendada</span>}
                  {frete !== -1 && frete !== -2 && frete !== 0 &&
                    <span>R${frete.toFixed(2)}</span>}
                </div>
              </>
              :
              <>
                <div><h2>Custo total de entrega</h2></div>
                <div><Skeleton /></div>
              </>
            }
          </li>

          {frete ?
            <li className="sub-total-li">
              <div><h2>Valor total</h2></div>
              <div>R${valor_total_com_frete().toFixed(2)}</div>
            </li> :
            <li className="sub-total-li">
              <div><h2>Valor total</h2></div>
              <div>R${valor_total().toFixed(2)}</div>
            </li>
          }
        </css.Resumo>
        <css.Pagamento>
          <div>

            <input type="text" id="cpf-faturamento"
              value={cpf}
              onChange={(e) => setCPF(e.target.value)}
              placeholder="CPF de faturamento"
            />

          </div>

          <button onClick={abrir_gate_de_pagamento}>Pagar Agora</button>
        </css.Pagamento>
        <NotificationContainer />
      </SkeletonTheme>

    </css.Container>
  </>
  )
}

function valor_final_por_loja(carrinho: any) {

  let valor = 0
  carrinho.forEach(x => valor += x.preco * x.quantidade)

  return valor

}

function carregar_gate(carregando) {
  const [idx, setIDX] = useState(0)
  const msg = [
    'Abrindo o gate de pagamento',
    'Só mais uns instantes'
  ]

  const { colors } = useTema()

  useEffect(() => {
    setTimeout(() => setIDX(idx + 1), 3000)
  }, [])

  return (
    <css.Tela_de_carregamento>
      <div className="carregando-pagina-pesquisa">
        <ScaleLoader color={colors.accent} loading={carregando} width={10} height={30} />
        {msg && <h3>{msg[idx]}</h3>}
      </div>
    </css.Tela_de_carregamento>)
}