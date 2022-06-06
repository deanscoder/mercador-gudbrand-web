import Link from 'next/link'
import * as css from '../../../../styles/pages/Sucesso'
import Head from 'next/head'

export default function whatever() {
  return (
    <css.Container>
      <Head>
        <title>Sala de espera!</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <css.Sucesso>
        <h1>Bem vindo a nossa sala de espera!</h1>
        <h2>Enquanto você decide, te direcionamos para a sala de espera.</h2>
        <div>Mantemos o seu carrinho, caso ainda deseje, Okay?
      </div>
        <Link href="/">
          <a>
            Voltar a Página Inicial
          </a>
        </Link>
      </css.Sucesso>

    </css.Container>
  )
}
