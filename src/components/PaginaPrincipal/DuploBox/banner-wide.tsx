import * as css from './styles'
import Router from 'next/router'

export default function WideBox ({tema}) {
  return (
    <css.Container>
      <css.WideBox>
        <img
          src={`/images/banner-wide-gudbrand${tema === 'dark' ? '-b' : ''}.jpg`}
          alt="consiga cupom agora mesmo, basta seguir o nosso instagram clicando na imagem"
          onClick={() => Router.push('https://instagram.com/grupogud')}
          />
      </css.WideBox>
    </css.Container>
  )
}