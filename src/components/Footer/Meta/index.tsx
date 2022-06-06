import * as css from './styles'
import Link from 'next/link'

export default function Meta() {
  const Data = new Date()
  const Atual = Data.getFullYear()
  return (
    <css.Container>
      <css.Usuario>
        <Link href="/conta/acesse">
          <a>
            Já é um cliente? Entrar
          </a>
        </Link>
      </css.Usuario>

      <css.pequeno_menu>
        <li><Link href="/suporte/notas/condicoes-de-uso"><a>
          Condições de uso
          </a></Link></li>

        <li><Link href="/suporte/notas/notas-de-privacidade-e-cookies"><a>
          Notas de privacidade
          </a></Link></li>

        <li><Link href="/suporte/notas/o-que-e-a-gudbrand"><a>
          O que é a Gudbrand
          </a></Link></li>
      </css.pequeno_menu>
      <p>- e-commerce prototipo exclusivamente virtual -</p>
      <p>© 2020-{Atual}, gudbrand.vercel.app, ou seus afiliados.</p>
      <p>Web client e-commerce desenvolvido por servosalt - {" "}
        <a href="https://github.com/servosalt" target="_blank">
          <b>Kinesis Lake</b></a></p>
    </css.Container>
  )
}