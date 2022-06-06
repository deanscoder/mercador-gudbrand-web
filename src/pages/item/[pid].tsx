import { GetServerSideProps } from 'next'
import * as css from '../../styles/pages/Product'
import { SideBySideMagnifier } from "react-image-magnifiers"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { useEffect, useState } from 'react';
import Frete from '../../components/Frete';
import { useZoe } from '../../components/Zoe/Contextos/ZOE';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Atributos from '../../components/Atributos';
import { MerchConnect } from '../../config/Woocommerce';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Recomendados from '../../components/Recomendados';
import BannerSiga from '../../components/Siga';
import Parcelamento from '../../components/Parcelamento';


const Header = ({ item }) => {
  const [local, setLocal] = useState('')
  useEffect(() => { setLocal("https://" + location.host) }, [])
  const LD = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": item.name,
    "image": item.images[0].src,
    "description": item.description,
    "brand": item.tags[0] ? item.tags[0].name : 'GUDBRAND',
    "sku": item.sku,
    "offers": {
      "@type": "Offer",
      "url": local ? local + '/item/' + item.slug : "https://www.gudbrand.com.br/item/" + item.slug,
      "priceCurrency": "BRL",
      "price": item.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  }

  return (
    <Head>
      <title>{item.name} - Mercado Gudbrand</title>
      <meta name="description" content={item.description} />
      {
        item ?
          <>
            <meta name="keywords" content={item.tags.map(x => x.name).join(', ')} />

            <meta property="og:title" content={item.name} />
            <meta property="og:url" content={local ? local + item.slug : "https://www.gudbrand.com.br/hangar/" + item.slug} />
            <meta property="og:description" content={item.description} />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:image" content={item.images[0].src} />
            <meta property="og:image:type" content='image/jpeg' />
            <meta property="og:image:alt" content={item.nome} />
            <meta property="og:image:width" content='1200' />
          </>
          :
          null
      }

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />


    </Head>
  )
}


const AutoPlaySlider = withAutoplay(AwesomeSlider)

//CONFIGURAÇÃO DO SLIDE DO PRODUTO
const SlideShow = ({ images, name }) => {
  return (
    <AutoPlaySlider
      play={true}
      cancelOnInteraction={true}
      interval={6000}
      bullets={true}
    >
      {images.map(img =>
        <div key={img}>
          <SideBySideMagnifier
            imageSrc={img.src}
            imageAlt={img.name}
            largeImageSrc={img.src}
            alwaysInPlace={true}
            allowOverflow={false}
            className="imagenizer"
          />
        </div>
      )}
    </AutoPlaySlider>
  )
}

const ProdutoView = (props) => {
  const lojaID = props.lojaID
  const data = props.data
  const [quantidade, setQtd] = useState(1) //QUANTIDADE DE PRODUTOS
  //console.log(props)
  //INVOCA A ZOE
  const {
    carrinho: { adicionar, selecionado, __selecionado },
    autenticacao: { atualizar_historico, logado }
  } = useZoe()

  const router = useRouter()

  useEffect(() => {
    __selecionado(prev => ({ ...prev, lojaID: lojaID }))
    if (logado) {
      atualizar_historico({
        item: data.nome,
        url: '/item/' + data.slug,
        thumb: data.images[0].src
      })
    }
  }, [])

  //AÇÃO DE POR NA SACOLA
  function putAction() {
    return new Promise((res, rej) => {
      if (selecionado.variante.price && data.type === 'variable') { //TESTA SE TEM VARIAÇÃO
        adicionar({
          ID: data.id,
          nome: `${data.name} - ${selecionado.variante.sku.toUpperCase()}`,
          url: data.slug,
          quantidade: quantidade,
          preco: parseFloat(selecionado.variante.price),
          thumbnail: data.images[0].src,
          V_ID: selecionado.variante.id,
          peso: selecionado.variante.weight ? parseFloat(selecionado.variante.weight) : parseFloat(data.weight),
          dimensoes: selecionado.variante.dimensions ? selecionado.variante.dimensions : data.dimensions,
          lojas: data.lojas
        })
        res(true)
      } else if (data.price && data.type !== 'variable') {  //CASO NÃO TENHA USA O PADRÃO
        adicionar({
          ID: data.id,
          nome: `${data.name} - ${data.sku.toUpperCase()}`,
          url: data.slug,
          quantidade: quantidade,
          preco: parseFloat(data.price),
          thumbnail: data.images[0].src,
          peso: parseFloat(data.weight),
          dimensoes: data.dimensions,
          lojas: data.lojas
        })
        res(true)
      } else { //EM CASO DE TER ATRIBUTO E NÃO ESTEJA SELECIONADO
        NotificationManager.warn('Antes de por no carrinho você precisa escolher uma variação do produto', 'Selecione um atributo')
        rej(false)
      }
    })
  }
  //GERENCIADOR DE SACOLA
  async function putOnBag(e) {
    e.preventDefault()
    let resultado = await putAction() //ESPERA A PROMISE DE POR NO CONTEXTO
    if (resultado) {
      NotificationManager.success('Item Adicionado ao seu carrinho', 'Prontinho!')
      setQtd(1)
    }
  }

  async function comprar(e) {
    e.preventDefault()
    let resultado = await putAction() //ESPERA A PROMISE DE POR NO CONTEXTO
    if (resultado) {
      router.push('/mercado/pagar')
      setQtd(1)
    }
  }

  return (
    <css.Container>
      <Header item={data} />

      <css.SecaoEsquerda>
        <SlideShow images={data.images} name={data.name} />
      </css.SecaoEsquerda>

      <css.SecaoDireita>
        <css.Flag>GUDBRAND - Produtos</css.Flag>
        <css.Titulo>{data.name}</css.Titulo>

        <css.Meta>
          <span>(Cod. item {selecionado.variante ? selecionado.variante.sku : data.sku})</span>
          <span>Ver mais <Link href={`/zona/${data.categories[0].slug}/ct`} >
            <a>
              {data.categories[0].name}
            </a>
          </Link></span>
        </css.Meta>

        {data.type === 'variable' && Atributos(data.id, lojaID)}

        {/* AREA DE PRODUTO VARIAVEL */}
        {data.type === 'variable' && selecionado.variante.stock_status === 'instock' && //SE ESTA A VENDA
          <css.QuantidadeArea>
            <div>
              <span id='quantidade-field'>{quantidade}</span>

              <css.QtdContainer>
                <button onClick={() =>
                  setQtd(res => quantidade === 1 ? 1 : quantidade - 1)}>
                  -
                </button>
                {selecionado.variante && selecionado.variante.manage_stock ?
                  <button onClick={() =>
                    setQtd(
                      quantidade < parseInt(selecionado.variante.stock_quantity) ? quantidade + 1 : quantidade
                    )}>+</button>
                  :
                  <button onClick={() =>
                    setQtd(
                      quantidade < 6 ? quantidade + 1 : quantidade
                    )}>+</button>
                }
              </css.QtdContainer>
            </div>
          </css.QuantidadeArea>
        }
        {data.type === 'variable' && selecionado.variante.stock_status === 'instock' &&
          <css.SecaoPagamento>
            <css.Preco>
              RS {
                selecionado.variante && selecionado.variante.price ?
                  (parseFloat(selecionado.variante.price) * quantidade).toFixed(2)
                  :
                  (parseFloat(data.price) * quantidade).toFixed(2)
              }

              <css.Parcelamento>
                {selecionado.variante.regular_price && <i>
                  De R$ {parseFloat(selecionado.variante.regular_price).toFixed(2)}</i>}<br />
              </css.Parcelamento>
              {selecionado && selecionado.variante && <Frete data={data} quantidade={quantidade} />}
            </css.Preco>

          </css.SecaoPagamento>
        }
        {selecionado.variante && selecionado.variante.stock_status === 'outofstock' && <h2>FORA DE ESTOQUE</h2>}

        {data.type === 'variable' && selecionado.variante.stock_status === 'instock' &&
          <css.SecaoPagamento>
            <css.Comprar
              id='btn-adicionar-na-sacola'
              onClick={(e) => putOnBag(e)}>
              <span>Por no carrinho ({quantidade}) </span><span>
                R${
                  selecionado.variante && selecionado.variante.price ?
                    (parseFloat(selecionado.variante.price) * quantidade).toFixed(2)
                    :
                    (parseFloat(data.price) * quantidade).toFixed(2)
                }
              </span>
            </css.Comprar>

            <css.Comprar
              className='btn-comprar-diretamente'
              onClick={(e) => comprar(e)}
            >
              <span>Comprar
              </span>
            </css.Comprar>
          </css.SecaoPagamento>
        }

        {/* FIM DA AREA DE PRODUTO VARIAVEL */}

        {/* AREA DE PRODUTO SIMPLES */}
        {data.type === 'simple' && data.stock_status === 'instock' && //SE ESTA A VENDA
          <css.QuantidadeArea>
            <div>
              <span id='quantidade-field'>{quantidade}</span>

              <css.QtdContainer>
                <button onClick={() =>
                  setQtd(res => quantidade === 1 ? 1 : quantidade - 1)}>
                  -
              </button>
                {selecionado.variante && selecionado.variante.manage_stock ?
                  <button onClick={() =>
                    setQtd(
                      quantidade < parseInt(selecionado.variante.stock_quantity) ? quantidade + 1 : quantidade
                    )}>+</button>
                  :
                  <button onClick={() =>
                    setQtd(
                      quantidade < 6 ? quantidade + 1 : quantidade
                    )}>+</button>
                }
              </css.QtdContainer>
            </div>
          </css.QuantidadeArea>
        }
        {data.type === 'simple' && data.stock_status === 'instock' &&
          <css.SecaoPagamento>

            <css.Preco>
              RS {
                selecionado.variante && selecionado.variante.price ?
                  (parseFloat(selecionado.variante.price) * quantidade).toFixed(2)
                  :
                  (parseFloat(data.price) * quantidade).toFixed(2)
              }

              <css.Parcelamento>
                {data.regular_price && parseFloat(data.regular_price) !== parseFloat(data.price) && <i>
                  De R$ {parseFloat(data.regular_price).toFixed(2)}</i>}<br />
              </css.Parcelamento>
              {data && <Frete data={data} quantidade={quantidade} />}
            </css.Preco>
          </css.SecaoPagamento>
        }
        {data.type === 'simple' && data.stock_status === 'instock' &&
          <css.SecaoPagamento>

            <css.Comprar
              id='btn-adicionar-na-sacola'
              onClick={(e) => putOnBag(e)}
            >
              <span>Por no carrinho ({quantidade}) </span><span>
                R${
                  selecionado.variante && selecionado.variante.price ?
                    (parseFloat(selecionado.variante.price) * quantidade).toFixed(2)
                    :
                    (parseFloat(data.price) * quantidade).toFixed(2)
                }
              </span>
            </css.Comprar>

            <css.Comprar
              className='btn-comprar-diretamente'
              onClick={(e) => comprar(e)}
            >
              <span>Comprar
              </span>
            </css.Comprar>
          </css.SecaoPagamento>
        }

        {data &&
          <Parcelamento
            valor={selecionado.variante && selecionado.variante.price ?
              (parseFloat(selecionado.variante.price) * quantidade).toFixed(2)
              :
              (parseFloat(data.price) * quantidade).toFixed(2)}
            vezes={3} />
        }
      </css.SecaoDireita>


      <css.SegundaParte>
        <h2>Descrição do produto</h2>
        <div dangerouslySetInnerHTML={{ __html: data.description }}>
        </div>

        <h3>Tags</h3>
        <div>
          {data.tags.map(tag =>
            <a key={tag.name} href={'/atendente_zoe/tag/' + tag.slug}>{tag.name}{' '}
            </a>
          )}
        </div>
      </css.SegundaParte>
      <css.Banners>
        <BannerSiga />
      </css.Banners>
      <css.Recomendados>---- Você Também Pode Gostar ----</css.Recomendados>
      <Recomendados id={data.id} tipo={'Tag'} tags={data.tags} />
      <NotificationContainer />
    </css.Container>
  )
}

export default ProdutoView

export const getServerSideProps: GetServerSideProps = async ctx => {
  const pid = ctx.params.pid as string
  let loja = ctx.query.lojaID as string
  if (!loja) {
    loja = '1' //LOJA PADRAO
  }

  return new Promise((resolve, reject) => {
    MerchConnect.get("products", { per_page: 100, slug: pid })
      .then(res => {
        let filtro = res.data.filter(el => {
          return el.slug === pid
        })
        //console.log(filtro[0])
        resolve({ props: { data: filtro[0], lojaID: loja } })
      })
      .catch(err => {
        console.log(err)
        resolve({ props: [] })
      })
  })
}

//RETIRA SELEÇAO VISUAL DOS BOTÕES DE TAMANHO
//query: id
function limparAtivos(query: string) {
  let estrutura, elemento = null
  estrutura = document.getElementById(query)
  let ativos = estrutura.getElementsByTagName('BUTTON')

  for (let i = 0; i < ativos.length; i++) {
    if (ativos[i].hasAttribute('ativo')) {
      elemento = ativos[i]
    }
  }
  if (elemento !== null)
    elemento.removeAttribute('ativo')
}

interface VariaveisData {
  cor?: string
  tamanho?: string
  tensao?: string
  corrente?: string
}