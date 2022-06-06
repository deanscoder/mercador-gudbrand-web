import * as css from '../styles/pages/404'
import Head from 'next/head'

export default function QuatroZeroQuatro () {
  return (
    <css.Container>
      <Head>
        <title>Mommy? Sorry Mommy! 404</title>
        <meta name="description" content="Não achei o que você estava procurando, tente retornar a pesquisa com outros termos!" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <css.Direito />
      <css.Esquerdo>
        <h1>404</h1>
        <h2>Mommy? Sorry Mommy! T_T!</h2>
        <h2>Eu não achei o que você queria!</h2>
      </css.Esquerdo>

    </css.Container>
  )
}