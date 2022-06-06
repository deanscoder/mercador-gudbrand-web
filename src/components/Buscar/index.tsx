import * as JsSearch from 'js-search';
import { useEffect, useState, useCallback, useMemo } from "react";
import * as css from './styles';
import { CategoriaProduto, TagsProduto, WooProduto } from '../../pages/api/cpd/interfaces/Artigo/woo_product';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiRightArrow } from 'react-icons/bi'
import { useZoe } from '../Zoe/Contextos/ZOE';
import ion from '../../config/ion_api_base';


interface WooSearch extends CategoriaProduto, TagsProduto {
  type?: string
}

export default function Buscar() {
  //const busca = items as Array<WooSearch>
  /* function reMountList() {
    var tagNames = []
    var tagSlugs = []
    busca.forEach(x => {
      x.tags.forEach(y => {
        tagNames.push(y.name)
        tagSlugs.push(y.slug)
      })
      x.tag_names = tagNames
      x.tag_slugs = tagSlugs
      tagNames = [] //RESETA
      tagSlugs = [] //RESETA
    })
  } */

  //const VL = Math.floor(Math.random() * busca.length)
  const [query, setQuery] = useState('')
  const [query_sugestoes, setQS] = useState([])
  const [query_em_progresso, setQEP] = useState(false)
  const [focus, setFocus] = useState(false)
  const [resultado, setResultado] = useState([] as Array<WooSearch>)
  const router = useRouter()
  const { publi: { registrar_interesse } } = useZoe()

  var search = new JsSearch.Search('id')
  search.addIndex('name')
  search.addIndex('slug')
  //search.addIndex('tag_names')
  //search.addIndex('tag_slugs')
  //search.addIndex('short_description')

  //search.addDocuments(busca)

  /* useEffect(() => {
    reMountList()
  }, []) */

  async function coletar_sugestoes() {
    const { data: resposta } = await ion({
      method: 'get',
      url: '/merch/sugestoes_de_pesquisa',
      params: new URLSearchParams({ p: query })
    })

    if (resposta) {
      if (resposta.sugestoes && !!resposta.sugestoes.length) {
        setQS(resposta.sugestoes)
      } else {
        setQS([''])
      }
    }

    setQEP(false)

  }

  useEffect(() => {
    if (query.length > 2 && !query_em_progresso) {

      setQEP(true)
      setTimeout(() => coletar_sugestoes(), 2000)
      //setResultado(search.search(query))

    }

  }, [query])

  function handleSubmit(e) {
    e.preventDefault()
    if (query) {

      const params = new URLSearchParams({ p: query, tipo: 'pd' })
      /* registrar_interesse({ tipo: 'PESQUISA', valor: query,
      dispositivo: navigator.userAgent }) */
      router.push(`/procurar?${params}`)

    }
  }

  function tratamento_de_link_de_lista_recomendados(nome: string, tipo: string) {
    if (tipo === 'tg') {
      registrar_interesse({
        tipo: 'TAG', valor: nome,
        dispositivo: navigator.userAgent
      })
    } else if (tipo === 'ct') {
      registrar_interesse({
        tipo: 'CATEGORIA', valor: nome,
        dispositivo: navigator.userAgent
      })
    }
    setQuery(nome)
  }

  return (
    <css.Container onSubmit={(e) => handleSubmit(e)}>
      <div>
        <div className="gradient-border">
          <input
            type="text"
            list="sugestoes-de-pesquisa"
            value={query}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 400)}
            onChange={(e) => setQuery(e.target.value)} />
          <button type="submit"><BiRightArrow /></button>
        </div>
      </div>
      <datalist id='sugestoes-de-pesquisa'>
        {query_sugestoes && query_sugestoes.map(item => <option
          key={item}
          value={item} />
        )}
      </datalist>
    </css.Container>
  )

}
