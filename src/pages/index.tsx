import { Cervejarias } from '../components/PaginaPrincipal/Categorias'
import { WooProduto } from './api/cpd/interfaces/Artigo/woo_product'
import OFERTAS from '../components/PaginaPrincipal/Ofertas'
import PASSO_A_PASSO from '../components/PaginaPrincipal/Passos'
import Slide_da_Pagina_Principal from '../components/PaginaPrincipal/Slide'
import { useTema } from '../contexts/theme'
import * as css from '../styles/pages/Principal'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ion from '../config/ion_api_base'
import BannerSiga from '../components/Siga'

const descricao = 'Projeto de web site e-commerce, consumindo API do Wordpress, ' +
  'WooCommerce (Gestão de Conteúdo), Mercado Pago (Gateway de pagamento) e Melhor Envio (Orçamento de logistica)'

export default function PAGINA_PRINCIPAL() {
  const { title } = useTema()
  const [lista_ofertas, setListaOfertas] = useState([] as Array<WooProduto>)
  const [lista_vc, setListaVC] = useState([] as Array<WooProduto>)
  const [lista_smart, setListaSmart] = useState([] as Array<WooProduto>)

  async function requisitar_oferta(
    id: number, tipo: string, page: number
  ) {
    try {
      const { data: resposta } = await ion({
        method: 'get',
        url: '/merch/pesquisar_por_tag_ou_categoria',
        params: { tipo, id, page }
      })
      return resposta
    } catch (err) {
      console.log(err)
    }
  }

  async function maestro() {
    try {
      const oferta = await requisitar_oferta(135, 'Tag', 1)
      if (oferta && oferta.produtos)
        setListaOfertas(oferta.produtos)

      const vc = await requisitar_oferta(109, 'Categoria', 1)
      if (vc && vc.produtos)
        setListaVC(vc.produtos)

      const smart = await requisitar_oferta(111, 'Categoria', 1)
      if (smart && smart.produtos)
        setListaSmart(smart.produtos)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    maestro()
  }, [])

  return (
    <>
      <css.ROOT>
        <PASSO_A_PASSO />
        <Slide_da_Pagina_Principal />
        {!!lista_ofertas.length &&
          <OFERTAS
            nome={'Ofertas do dia dos namorados'}
            verMais={"/ofertas/dia-dos-namorados"}
            lista={lista_ofertas} />
        }
        {/* <DuploBox /> */}

        <Cervejarias />

        {!!lista_smart.length &&
          <OFERTAS
            nome={'Para smartphones'}
            verMais={"/zona/para-smartphones"}
            lista={lista_smart} />
        }

        <BannerSiga />

        {!!lista_vc.length &&
          <OFERTAS
            nome={'Para você'}
            verMais={"/zona/para-voce"}
            lista={lista_vc} />
        }

      </css.ROOT>

      <Head>
        <title>Mercado Gudbrand - Web client e-commerce </title>
        <meta name="description" content={descricao} />
        <meta name="keywords" content="Loja Gudbrand, Hangar Gudbrand, Grupo Gudbrand, Moda Masculina, Moda Feminina, Acessorios, Aparelhos eletronicos, Loja de Moda" />
        <meta property="og:title" content='Gudbrand - Mercador de bens gerais' />
        <meta property="og:url" content='https://gudbrand.vercel.app' />
        <meta property="og:description" content={descricao} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:image" content="https://gudbrand.vercel.app/images/header/melhor-dupla.jpg" />
        <meta property="og:image:type" content='image/jpeg' />
        <meta property="og:image:alt" content="Dupla de jovens felizes sorrindo enquanto fazem questão de demonstrar" />
        <meta property="og:image:width" content='1200' />

        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />

      </Head>
    </>
  )
}

const LD =
{
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "Mercado Gudbrand",
  "url": "https://gudbrand.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://gudbrand.vercel.app/procurar?p={search_term_string}&tipo=pd",
    "query-input": "required name=search_term_string"
  }
}