import * as css from './styles'
import Carousel from 'react-elastic-carousel';

export default function SlideMenu_da_Pagina_Principal () {
  return (
    <css.Container>
      <Carousel
          isRTL={false}
          itemsToShow={8}
          pagination={false}
          showEmptySlots={false}
          showArrows={false}
          transitionMs={400}
        >
          
        </Carousel>
    </css.Container>
  )
}