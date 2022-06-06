import * as css from './styles'
import Link from 'next/link'
import { useTema } from '../../../contexts/theme'
import { useZoe } from '../../Zoe/Contextos/ZOE'

const procon = '/images/svg/procon.svg'
const gudbrandB = '/gudbrandInv.png'
const gudbrandW = '/gudbrand.png'

export default function Menus() {
  const { autenticacao: { perfil } } = useZoe()
  const { title, toggleTheme } = useTema()
  return (
    <css.Container>
      <css.Nav>
        <ul>
          <h2>Suporte</h2>
          <li>
            <Link href={
              '/suporte/notas/o-que-e-a-gudbrand'}>
              <a>
                Quem somos
            </a>
            </Link>
          </li>

          <li>
            <Link href="/suporte/notas/notas-de-privacidade-e-cookies">
              <a>
                Notas de privacidade e cookies
            </a>
            </Link>
          </li>

          <li>
            <Link href="/suporte/notas/condicoes-de-uso">
              <a>
                Condições de uso
            </a>
            </Link>
          </li>
          <li>
            <Link href="/suporte/notas/condicoes-de-compra">
              <a>
                Condições de compra
            </a>
            </Link>
          </li>
          <li>
            <Link href="/suporte/sac">
              <a>
                Suporte de Atendimento ao Cliente - SAC
            </a>
            </Link>
          </li>
        </ul>
        <ul>
          <h2>Central</h2>
          <li>{title === 'light' ?
            <span onClick={toggleTheme}>Por tema escuro</span> :
            <span onClick={toggleTheme}>Por tema claro</span>
          }
          </li>
          <li>
            <Link href="/conta/painel">
              <a>
                Painel do cliente
            </a>
            </Link>
          </li>
          <li>
            <Link href="/conta/pedidos">
              <a>
                Meus pedidos
            </a>
            </Link>
          </li>

        </ul>
        <div id='procon'>
          <a href="https://www.procon.se.gov.br"><img src={procon} alt="Unidade do Procon de Sergipe" width='200px' /></a>
        </div>
        <div id='footer_logo'>
          <Link href='/'><a><img src={
            title !== 'dark' ? gudbrandB : gudbrandW
          } alt="Marca Gudbrand" width='200px' /></a></Link>
        </div>
      </css.Nav>
    </css.Container>
  )
}