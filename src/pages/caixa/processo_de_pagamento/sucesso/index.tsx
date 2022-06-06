import Link from 'next/link'
import * as css from '../../../../styles/pages/Sucesso'
import { useZoe } from '../../../../components/Zoe/Contextos/ZOE'
import { useEffect } from 'react'
import Head from 'next/head'

export default function sucesso() {
  const { carrinho: { esvaziar_carrinho } } = useZoe()
  useEffect(() => {
    esvaziar_carrinho()
  }, [])
  return (
    <css.Container>
      <Head>
        <title>Compra realizada com sucesso!</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <css.Sucesso>
        <h1>Compra realizada com Sucesso!</h1>
        <h2>Meus parabéns, sua compra já foi aprovada! Agora é só aguardar o recebimento.</h2>
        <div>
          O seu pedido está agora em processamento, em breve você receberá em seu
          email o seu código de rastreio. Qualquer dúvida pode falar conosco pelos
          nossos portais. What's App, Instagram, Telegram ou E-Mail (atendimento@gudbrand.com.br).
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
