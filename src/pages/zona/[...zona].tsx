import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import * as css from "../../styles/pages/Categorias"
import { WooProduto } from "../api/cpd/interfaces/Artigo/woo_product"
import { useEffect, useState } from "react"
import Head from 'next/head'
import Recomendados from '../../components/Recomendados'
import { MerchConnect } from "../../config/Woocommerce"
import ion from "../../config/ion_api_base"
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTema } from "../../contexts/theme"

/* 

    ZONA DE CATEGORIAS OU TAGS
    EZEQUIEL GUDBRAND, kinesislake.com - 2022
    @servosalt

  */

const Header = ({ titulo }) => {
  return (
    <Head>
      <title>Departamentos do Hangar Gudbrand: {titulo}</title>
      <meta name="description" content={`Zona especial para ${titulo}, confira diversos itens disponíveis para você!`} />

    </Head>
  )
}

export default function Zona({ zona, titulo, tipo }) {
  const [produtos, setProdutos] = useState([] as Array<WooProduto>)
  const [carregando, setCarregando] = useState(true)
  const [msg, setMSG] = useState('')
  const [wallpaper, setWallpaper] = useState('')
  const [total_de_paginas, setTotalPg] = useState(0)
  const [pg, setPg] = useState(1)

  const { colors } = useTema()

  //console.log(zona)

  function handleBackground(): string {
    let x
    let escolhido
    let padrao = ''
    switch (titulo) {
      case 'valkirias': {
        x = Math.floor(Math.random() * (valk.length))
        escolhido = valk[x]
        break
      }
      case 'guerreiros': {
        x = Math.floor(Math.random() * (guer.length))
        escolhido = guer[x]
        break
      }
      case 'dispositivos': {
        x = Math.floor(Math.random() * (disp.length))
        escolhido = disp[x]
        break
      }
      default: {
        padrao = '/images/categorias/padrao.jfif'
        break
      }
    }
    //console.log('NUMERO DE X: ',x)
    return padrao ? padrao : escolhido
  }

  //ESCOLHE O WALLPAPER
  useEffect(() => {
    setWallpaper(handleBackground())
  }, [])

  //console.log('CATEGORIA', categoria)
  async function SOLICITAR_PRODUTOS_REFERENTES() {
    setMSG('')
    const { data: resposta } = await ion({
      method: 'get',
      url: '/merch/pesquisar_por_tag_ou_categoria',
      params: { id: zona[0].id, tipo: tipo, page: pg, verbo: titulo }
    })

    if (resposta && resposta.status === 'ENCONTRADO') {
      if (resposta.produtos) {
        setProdutos(resposta.produtos)
        setTotalPg(resposta.total_de_paginas)
      } else {
        setMSG('Nada encontrado!')
      }
    } else if (resposta && resposta.status === 'VAZIO') {

    } else {
      setMSG(resposta.erro ? resposta.erro : 'Serviço indisponível')
    }
  }

  //APOS MONTADO SOLICITA OS DADOS
  useEffect(() => {
    //SOLICITAR_PRODUTOS_REFERENTES()
  }, [])

  useEffect(() => {
    //SOLICITAR_PRODUTOS_REFERENTES()
    setWallpaper(handleBackground())
  }, [titulo])

  //CARREGANDO
  useEffect(() => {
    if (produtos) {
      setCarregando(false)
    }
  }, [produtos])
  return (
    <css.Container>
      <Header titulo={titulo} />

      <css.Right bg={wallpaper}>
        <div className="flutuante">
          <h1>{'#' + titulo}</h1>
          <h5>fotos do pinterest</h5>
        </div>
      </css.Right>
      <css.Left>

        {carregando ?
          <div className="carregando-pagina-pesquisa">
            <ScaleLoader color={colors.accent} loading={carregando} width={7} height={30} />
          </div>
          : <Recomendados
            tipo={tipo} id={''} tags={zona} />}

      </css.Left>
    </css.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx.params.zona as Array<string>
  let cat_page = 0, tag_page = 0, totalPagesCat = 0, totalPagesTag = 0, lista = [];
  //console.log(ctx.params)
  return new Promise(async (resolve, reject) => {

    if ((slug[1] && slug[1].toLowerCase() === 'ct') || slug[0] && !slug[1]) //CATEGORIA
    {
      console.log('ENTROU NO CATEGORIA')
      do { //SE TIVER MAIS PAG REPETE

        const cat_response = await MerchConnect.get("products/categories", {
          per_page: 100, page: ++cat_page
        })
        totalPagesCat = cat_response.headers["x-wp-totalpages"]

        const cat = cat_response.data.filter(el => {
          return el.slug === slug[0] ? true : false
        })

        cat.forEach(el => lista.push(el))

      } while (cat_page < totalPagesCat)
      resolve({ props: { zona: lista, titulo: slug[0], tipo: 'Categoria' } })

    } else if (slug[1] && slug[1].toLowerCase() === 'tg') //TAG
    {
      console.log('ENTROU NO TAG')
      do {
        const tag_response = await MerchConnect.get("products/tags", {
          per_page: 100, page: ++tag_page
        })
        totalPagesTag = tag_response.headers["x-wp-totalpages"]

        const tag = tag_response.data.filter(el => {
          return el.slug === slug[0] ? true : false
        })

        tag.forEach(el => lista.push(el))

      } while (tag_page < totalPagesTag)
      resolve({ props: { zona: lista, titulo: slug[0], tipo: 'Tag' } })
    } else {
      resolve({ props: {} })
    }
  })
}

const valk = [
  '/images/categorias/valkirias/01.jfif',
  '/images/categorias/valkirias/01.jfif',
  '/images/categorias/valkirias/03.jfif'
]

const guer = [
  '/images/categorias/guerreiros/01.jfif',
  '/images/categorias/guerreiros/01.jfif',
  '/images/categorias/guerreiros/03.jfif'
]

const disp = [
  '/images/categorias/dispositivos/01.jfif',
  '/images/categorias/dispositivos/01.jfif',
  '/images/categorias/dispositivos/03.png'
]