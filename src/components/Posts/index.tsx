import React, { useState } from 'react';
import * as css from './styles-front';
import Carousel from 'react-elastic-carousel';

import Link from 'next/link';
import { WooProduto } from '../../pages/api/cpd/interfaces/Artigo/woo_product';

export default function Posts({ items }) {
  const [images, setImages] = useState(items as Array<WooProduto>);

  function trocarIMG(id: string, url: string) {
    document.getElementById(id)?.setAttribute('src', url);
  }

  return (
    <css.Container id="ultimas-colecoes">
      <div className="carousel-gudbrand-posts">
        <Carousel
          isRTL={false}
          itemsToShow={4}
          pagination={false}
          showEmptySlots={false}
          breakPoints={[
            { width: 900, itemsToShow: 3, itemsToScroll: 1 },
            { width: 1000, itemsToShow: 4, itemsToScroll: 1 }
          ]}
        >
          {images.map(item => <div key={item.slug}>
            <Link href='/item/[slug]' as={`/item/${item.slug}`}><a
              onMouseLeave={() => trocarIMG(item.slug, item.images[0].src)}
              onMouseEnter={() => item.images[1] ? trocarIMG(item.slug, item.images[1].src) : null}
            >
              <img
                src={item.images[0].src}
                width="236px"
                id={item.slug}
                height="400px"
              />
              <h2>{item.name}</h2>
              <h4>R$ {parseFloat(item.price).toFixed(2)}</h4>
              <p>ou em 4x de R${(parseFloat(item.price) / 4).toFixed(2)} sem juros</p>
            </a></Link>
          </div>)}
        </Carousel>
      </div>
      <div className="mobile-post-vision">
        {images.map(item => <div key={item.slug}>
          <Link href='/item/[slug]' as={`/item/${item.slug}`}><a
            onMouseLeave={() => trocarIMG(item.slug, item.images[0].src)}
            onMouseEnter={() => item.images[1] ? trocarIMG(item.slug, item.images[1].src) : null}
          >
            <img
              src={item.images[0].src}
              width="236px"
              id={item.slug}
              height="400px"
            />
            <h2>{item.name}</h2>
            <h4>R$ {parseFloat(item.price).toFixed(2)}</h4>
            <p>ou em 4x de R${(parseFloat(item.price) / 4).toFixed(2)} sem juros</p>
          </a></Link>
        </div>)}
      </div>
    </css.Container>
  );
}