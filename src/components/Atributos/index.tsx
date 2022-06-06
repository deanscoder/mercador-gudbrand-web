import axios from 'axios'
import { useEffect, useState } from 'react'
import { AttrProduto, WooProduto } from '../../pages/api/cpd/interfaces/Artigo/woo_product'
import { useZoe } from '../Zoe/Contextos/ZOE'
import * as css from './styles'

export default function Atributos(produtoID: number, lojaID: number) {
  const [variacoes, setVariacoes] = useState([] as Array<WooProduto>)
  const { carrinho: { selecionado, __selecionado } } = useZoe()

  function _limpar_selecao() {
    __selecionado({})
  }

  async function FUNCAO_REQUISITORA_DE_ATRIBUTOS(produtoID: number) {
    const { data: resposta } = await axios({
      method: 'get',
      url: '/api/v2/merch/pesquisar_por_variacao',
      params: {
        lojaID: lojaID,
        produtoID: produtoID
      }
    })
    if (resposta && resposta.status === 'SUCESSO') {
      setVariacoes(resposta.variacao)
    }
  }
  useEffect(() => {
    FUNCAO_REQUISITORA_DE_ATRIBUTOS(produtoID)

    return () => _limpar_selecao()
  }, [])

  useEffect(() => {
    let DIV = document.getElementById('painel-seletor-de-atributos')
    let lista = DIV.getElementsByTagName('div')
    if (lista) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].hasAttribute('selecionado')) {
          lista[i].removeAttribute('selecionado')
        }
      }
      let novo = document.getElementById(selecionado.variante.permalink)
      if (novo)
        novo.setAttribute('selecionado', 'true')
    }

  }, [selecionado])

  return (
    <css.Container>
      <css.ContainerSeletor>
        {variacoes &&
          <css.ContainerAtributo id="painel-seletor-de-atributos">
            {variacoes.map(variacao => <div
              key={variacao.permalink}
              id={variacao.permalink}
              onClick={() => __selecionado(prev => ({ ...prev, variante: variacao }))}
            >
              <h4 className={'atributos-de-produtos'}>
                {variacao.attributes.map(atr => <span key={atr.option}>{atr.option} </span>)}
              </h4>
            </div>)}
          </css.ContainerAtributo>
        }
      </css.ContainerSeletor>
    </css.Container>
  )
}
