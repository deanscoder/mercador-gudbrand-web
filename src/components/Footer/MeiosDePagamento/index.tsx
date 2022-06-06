import * as css from './styles'

export default function MeiosDePagamento() {
  const bandeiras = '/images/svg/bandeiras'

  return (
    <css.Container>
      <ul>
        <li><img src={bandeiras + '/visa.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/mastercard.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/american.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/hipercard.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/elo.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/boleto.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/diners.svg'} width='50px' /></li>
        <li><img src={bandeiras + '/paypal.svg'} width='50px' /></li>
      </ul>
      <span>Divida sua compra em até 3x sem juros</span>
    </css.Container>
  )
}