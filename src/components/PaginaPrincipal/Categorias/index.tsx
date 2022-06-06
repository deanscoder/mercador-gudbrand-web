import * as css from './styles';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Carousel from 'react-elastic-carousel';
import LISTA_DE_CATEGORIAS_VITRINES from '../../../config/CategoriasVitrine';

export default function Categorias() {
  return (
    <css.Container>
      <Carousel
        isRTL={false}
        itemsToShow={8}
        pagination={false}
        showEmptySlots={false}
        showArrows={false}
        enableMouseSwipe={true}

        breakPoints={[
          { width: 500, itemsToShow: 4, itemsToScroll: 4 },
          { width: 720, itemsToShow: 6, itemsToScroll: 3 },
          { width: 1000, itemsToShow: 8, itemsToScroll: 4 }
        ]}
      >

      </Carousel>
    </css.Container>
  )
}

export function Cervejarias() {
  const route = useRouter()
  return (
    <css.Container>
      <h4>Escolha agora por</h4>
      <css.Titulo>Consumíveis</css.Titulo>
      <Carousel
        isRTL={false}
        itemsToShow={5}
        pagination={true}
        showEmptySlots={false}
        showArrows={false}
        enableMouseSwipe={true}

        breakPoints={[
          { width: 720, itemsToShow: 2, itemsToScroll: 1 },
          { width: 1000, itemsToShow: 5, itemsToScroll: 1 }
        ]}
      >
        {LISTA_DE_CATEGORIAS_VITRINES.map(c =>
          <Link href={c.link}>
            <a>

              <css.Story
                key={c.link}
                bg={c.bg}
              >
                <img src={c.img} alt={c.alt} onClick={() => route.push(c.link)} />
              </css.Story>
            </a>
          </Link>
        )}
        <Link href={'/zona/consumiveis'}>
          <a>

            <css.Story className="ver-mais-li"
              bg={'#f4f4f4'}>
              <h2>Ver mais</h2>
            </css.Story>

          </a>
        </Link>
      </Carousel>
    </css.Container>
  )
}