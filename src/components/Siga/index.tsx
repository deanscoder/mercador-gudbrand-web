import * as css from './styles'
import { FaInstagram } from 'react-icons/fa'
import Router from 'next/router'

const BannerSiga = () => {

  return (
    <css.Container>
      <div>
        <section>

          <FaInstagram />
          <h2>Siga o nosso instagram</h2>
        </section>
        <button type='button' onClick={() =>
          Router.push('https://instagram.com/grupogud')}>
          Seguir @grupogud
          </button>
      </div>
    </css.Container>
  )
}


export default BannerSiga