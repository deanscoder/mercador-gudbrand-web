import React, { useEffect } from "react";
import * as css from './styles';
import Carousel from 'react-elastic-carousel';
import Router from 'next/router'
import Link from 'next/link'

export default function OFERTAS({nome, verMais, lista}) {
    return (
    <css.Container>
      
      <css.Oferta>{nome}</css.Oferta>
      
      <Carousel
          isRTL={false}
          itemsToShow={6}
          pagination={true}
          showEmptySlots={false}
          showArrows={true}
          enableMouseSwipe={true}
          outerSpacing={0}
          breakPoints={[
            { width: 500, itemsToShow: 2, itemsToScroll: 1 },
            { width: 720, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1040, itemsToShow: 5, itemsToScroll: 5 }
          ]}
        >
          { lista && lista.map(item => <css.Div
            key={item.slug}>

            <Link href={'/item/' + item.slug}>
              <a>
                <css.Imagem src={item.images[0].src}>
                  <css.Meta>R${parseFloat(item.price).toFixed(2)}</css.Meta>
                </css.Imagem>
              </a>
            </Link>

          </css.Div>)}
          <css.DivVerMais>
            <css.Mais onClick={() => Router.push(verMais)}>Ver mais</css.Mais>
          </css.DivVerMais>
        </Carousel>
    </css.Container>
  )
}

const lista2 = [
  {
    nome: 'Produto 1#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 2#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 3#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 4#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 5#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 6#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 1#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 2#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 3#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 4#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 5#',
    url: '#',
    img: '#',
    preco: 100.00
  },
  {
    nome: 'Produto 6#',
    url: '#',
    img: '#',
    preco: 100.00
  }
]