import * as css from './styles'
import MeiosDePagamento from './MeiosDePagamento'
import Meta from './Meta'
import Menus from './Menus'

export default function Footer () {
  return (
    <css.Container>
      <Menus />
      <css.Secao />
      <MeiosDePagamento />
      <Meta />
    </css.Container>
  )
}