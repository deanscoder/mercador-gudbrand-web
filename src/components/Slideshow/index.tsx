import * as  css from './styles'
import Carousel from 'react-elastic-carousel';

const images = [
  "/images/header/melhor-dupla.jpg",
  "/images/header/jovem-garota-cheia-de-vigor.jpg"
]

export default function Slideshow () 
{
  return (
    <css.Container>
      <Carousel
          isRTL={false}
          itemsToShow={1}
          pagination={false}
          showEmptySlots={false}
          enableAutoPlay={true}
          showArrows={false}
        >
          { images.map(x => 
          <css.Imagem key={x} src={x} >

          </css.Imagem>) }
        </Carousel>
    </css.Container>
  )
}