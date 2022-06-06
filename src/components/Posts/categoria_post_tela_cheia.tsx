import React, { useState } from 'react';
import * as css from './categoria_post_styles';
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
//import GooglePhoto from 'react-google-photo';

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function MansoryPostsFull({
  pagina, total_de_paginas, pegar_proximo, itens }) {
  const [load, setLoad] = useState(true);

  console.log(itens)

  return (
    <css.Container id="nossos-produtos">
      <InfiniteScroll
        dataLength={itens.length}
        next={pegar_proximo}
        hasMore={total_de_paginas > pagina}
        loader={<Skeleton count={2} />}
        className='infinite-scroll-pesquisar'
      >

        {itens && itens.map((x, idx) => <css.Produto key={x.slug} >
          <Link href={'/item/' + x.slug}>
            <a>

              <css.ProdutoIMG src={x.images && !!x.images.length ?
                x.images[0].src : x.imagens[0].src} />

              <css.Meta>
                <h3>{x.name || x.nome}</h3>
                <p>R${parseFloat(x.price || x.preco).toFixed(2)}</p>
              </css.Meta>

            </a>
          </Link>
        </css.Produto>
        )}

      </InfiniteScroll>
    </css.Container>
  );
}
