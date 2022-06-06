import { GetServerSideProps } from "next";
import { MerchConnect } from "../../config/Woocommerce"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Axios from "axios";
import * as css from '../../styles/pages/Procurar';
import Head from 'next/head'
import {
  WooProduto
} from '../api/cpd/interfaces/Artigo/woo_product'
import MansoryPostsFull from "../../components/Posts/categoria_post_tela_cheia";
import ion from "../../config/ion_api_base";
import Navegacao from "../../components/Header/Navegacao";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTema } from "../../contexts/theme";

/* 

   ÁREA DE PESQUISAS
   EZEQUIEL GUDBRAND, kinesislake.com - 2022
   @servosalt

 */

const Cabecalho = ({ titulo }) => {

  return (
    <Head>
      <title>{
        !titulo ? 'Procurar: Ache agora o seu equipamento preferido!' :
          `Procurar por ${titulo}`
      }</title>
      { titulo && <link rel="canonical"
        href={'https://www.gudbrand.com.br/procurar'} />}
      <meta name="robots" content="noindex" />
      <meta name="description" content="Encontre aqui o que você está procurando, camisas, calças, fones, qualquer categoria de equipamento que desejar!" />
    </Head>
  )
}

export default function ProcurarPage(props) {
  const router = useRouter()
  const { p, tipo } = router.query
  const [resultado, setResultado] = useState([])
  const [titulo, setTitulo] = useState('')
  const [msg, setMSG] = useState('')
  const [carregando, setC] = useState(true);
  const { colors } = useTema()
  const [nulo, setN] = useState(false)

  const [pagina, setPG] = useState(1);

  async function fazPesquisa() {
    setN(false)
    setMSG('')
    await Axios({
      method: 'get',
      url: '/api/v2/merch/pesquisar',
      params: { p, pagina }
    })
      .then(res => {
        if (res.data.erro) {
          setMSG('Vish não achei nadinha!')
          setResultado([])
          setC(false)
        } else {
          if (res.data.status === 'VAZIO') {
            setN(true)
            setC(false)
          } else {
            setResultado(res.data.produtos)
            setC(false)
          }
        }
      })
    setC(false)

  }

  useEffect(() => {
    localStorage.setItem('GB7:ZONAS', JSON.stringify(props.busca))
    if (p && tipo) {
      fazPesquisa()
    }
  }, [])

  useEffect(() => {
    fazPesquisa()
    setTitulo(decodeURIComponent(p as string))
  }, [p])
  return (
    <css.Container>
      <Navegacao nome={'Procurando por ' + decodeURIComponent(p as string)} />
      <Cabecalho titulo={titulo} />

      <div className="carregando-pagina-pesquisa">
        {nulo && <h3>Eita, não temos nada ainda, mas eu vou dar um jeito!</h3>}
        <ScaleLoader color={colors.accent} loading={carregando} width={10} height={30} />
      </div>

      { msg && <css.NaoEncontrado className="nao-achei">{msg}</css.NaoEncontrado>}
      <ZonaProdutos itens={resultado}
        resultado={resultado} setResultado={setResultado} p={p} />
    </css.Container>
  )

}

const ZonaProdutos = ({ itens, resultado, setResultado, p }) => {
  const produtos = itens as Array<WooProduto>

  const [total_de_paginas, setTDP] = useState(0);
  const [pagina, setPG] = useState(1);
  const [carregando, setC] = useState(false);
  const { colors } = useTema()

  async function pegar_proximo() {
    setC(true)
    const { data: resposta } = await ion({
      method: 'get',
      url: '/merch/pesquisar',
      params: { p, pagina: pagina + 1 }
    })

    if (resposta && resposta.status === 'RESULTADO') {
      let antiga_lista = resultado
      setPG(pagina + 1)
      setTDP(resposta.total_de_paginas)
      setResultado(antiga_lista.concat(resposta.produtos))
      setC(true)
    }
  }
  return (
    <css.Produtos>
      <div className="carregando-pagina-pesquisa">
        <ScaleLoader color={colors.accent} loading={carregando} width={7} height={30} />
      </div>
      { produtos && <MansoryPostsFull itens={produtos} pagina={pagina}
        pegar_proximo={pegar_proximo} total_de_paginas={total_de_paginas} />}
    </css.Produtos>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let lista = []
  let tag_page = 0
  let cat_page = 0
  let totalPagesTag = 0
  let totalPagesCat = 0
  return new Promise(async (resolve, reject) => {
    do {
      const response = await MerchConnect.get("products/tags", {
        per_page: 100, page: ++tag_page
      })
      totalPagesTag = response.headers["x-wp-totalpages"]
      response.data.forEach(el => {
        lista.push({
          name: el.name,
          slug: el.slug,
          id: el.id,
          type: 'tg'
        })
      });
    } while (tag_page < totalPagesTag)

    do {
      const responseCat = await MerchConnect.get("products/categories", {
        per_page: 100, page: ++cat_page
      })
      totalPagesCat = responseCat.headers["x-wp-totalpages"]
      responseCat.data.forEach(el => {
        lista.push({
          name: el.name,
          slug: el.slug,
          id: el.id,
          type: 'ct'
        })
      });
    } while (cat_page < totalPagesCat)
    resolve({ props: { busca: lista } })
  })
}
