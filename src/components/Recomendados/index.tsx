import { useEffect, useState } from 'react'
import * as css from './styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { WooProduto } from '../../pages/api/cpd/interfaces/Artigo/woo_product'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import ion from '../../config/ion_api_base'
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTema } from '../../contexts/theme'

export default function Recomendados({ tipo, tags, id }) {
  const [total_de_paginas, setTDP] = useState(2)
  const [pagina_atual, setPA] = useState(1)
  const [MSG, setMSG] = useState('')
  const [produtos, setPD] = useState([] as Array<WooProduto>)
  const [ID_atual, setIDA] = useState({} as number)
  const [ID_index, setIDI] = useState(0)
  const [carregando, setC] = useState(true)
  const [nulo, setN] = useState(false)

  const { colors } = useTema()

  function novo_ciclo() {
    let limite = tags.length
    if (ID_index <= limite && pagina_atual === total_de_paginas) {
      setIDI(ID_index + 1)
      setPA(1)
      setTDP(2)
    }
  }

  async function coletar_lista() {
    setC(true)
    setN(false)
    try {

      const { data: res } = await ion({
        method: 'get',
        url: '/merch/pesquisar_por_tag_ou_categoria',
        params: {
          tipo,
          id: tags[ID_index].id,
          excluir: id,
          page: pagina_atual
        }
      })

      if (res) {
        novo_ciclo()
        if (res.status === 'ENCONTRADO') {
          setTDP(parseInt(res.total_de_paginas))
          setPD(res.produtos)
          setC(false)
        } else if (res.status === 'VAZIO') {

          setN(true)
          setC(false)

        }
      } else {
        setC(false)
        setMSG('Opa, desculpa, os nossos serviços estão instáveis')
      }

    } catch (err) {
      console.log(err)
      setC(false)
    }
  }

  async function pegar_proximos_produtos() {
    setC(true)
    try {
      const lista = produtos
      const { data: res } = await ion({
        method: 'get',
        url: '/merch/pesquisar_por_tag_ou_categoria',
        params: {
          tipo,
          id: tags[ID_index].id,
          excluir: id,
          page: pagina_atual + 1
        }
      })

      if (res) {
        novo_ciclo() //checa se troca de ciclo
        if (res.status === 'ENCONTRADO') {
          setPA(pagina_atual + 1)
          setTDP(parseInt(res.total_de_paginas))
          let lista_atualizada = lista.concat(lista, res.produtos)
          let filtro = new Set(lista_atualizada)
          let lista_final = [...filtro]
          setPD(lista_final)
          setC(false)
        }
      }

    } catch (Err) {
      console.log(Err)
      setC(false)
    }
  }

  useEffect(() => {
    coletar_lista()
  }, [])

  return (
    <css.Container>

      <div className="carregando-pagina-pesquisa">
        {nulo && <h3>Eita, não temos nada ainda, mas eu vou dar um jeito!</h3>}
        <ScaleLoader color={colors.accent} loading={carregando} width={7} height={30} />
      </div>

      {!!produtos.length &&

        <css.ListaDeProdutos>

          <InfiniteScroll
            dataLength={produtos.length}
            next={pegar_proximos_produtos}
            hasMore={total_de_paginas > pagina_atual}
            loader={<Skeleton count={2} />}
            className='infinite-scroll-recomendados'
          >

            {produtos.map(produto => <css.Produto key={produto.slug}>
              <Link href={'/item/' + produto.slug}>
                <a>
                  <css.ProdutoIMG src={produto.images[0].src} />

                  <css.Meta>
                    <h3>{produto.name}</h3>
                    <p>R${parseFloat(produto.price).toFixed(2)}</p>
                  </css.Meta>
                </a>
              </Link>
            </css.Produto>)}

          </InfiniteScroll>

        </css.ListaDeProdutos>

      }

    </css.Container>
  )
} 