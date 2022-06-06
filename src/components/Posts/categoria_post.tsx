import React, { useState } from 'react';
import * as css from './styles';

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function MansoryPosts(props) {
  const [load, setLoad] = useState(true);
  const items = props.items as Array<any>

  return (
    <css.Container id="nossos-produtos">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 580: 2, 680: 3, 850: 2, 1030: 3, 1220: 4 }}
        gutter="100px"
      >
        <Masonry>
          {items && items.map((x, idx) => <css.Produto key={x.slug} href={`/item/${x.slug}`}>
            <css.ProdutoHead mobileHeight={Math.floor(Math.random() * 60) + 190}>
              <img
                src={x.images && !!x.images.length ? x.images[0].src : x.imagens[0].src}
              />
            </css.ProdutoHead>
            <css.ProdutoBody>
              <h3>{x.name || x.nome}</h3>
              <h2>R${parseFloat(x.price || x.preco).toFixed(2)}</h2>
            </css.ProdutoBody>
          </css.Produto>)}
        </Masonry>
      </ResponsiveMasonry>

    </css.Container>
  );
}
