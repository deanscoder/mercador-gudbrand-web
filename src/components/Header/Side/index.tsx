import React, { useEffect, useState } from 'react'
import * as css from './styles'
import Router from 'next/router'
import {
  MdShoppingBasket,
  MdPerson,
} from 'react-icons/md'
import { useZoe } from '../../Zoe/Contextos/ZOE'
import { BiSun, BiMoon } from 'react-icons/bi'
import { useTema } from '../../../contexts/theme'
import HashLoader from "react-spinners/HashLoader";
import { NotificationContainer } from 'react-notifications'

const LogMeIn = () => {
  const [user, setUser] = useState({ email: '', senha: '' })
  const { autenticacao: {
    fazer_login, logado, sair, esta_logado, __painel_lateral } } = useZoe()
  const [carregando, __carregando] = useState(false)

  const { colors } = useTema()



  useEffect(() => {
    esta_logado()
  }, [])

  async function validar() {
    __carregando(true)
    if (!user.email || !user.senha) {
      alert('Por favor preencha os campos corretamente!')
      __carregando(false)
      setTimeout(() => __painel_lateral(false), 5000)
      Router.push('/conta/acesse')
    } else {
      if (await fazer_login(user.email, user.senha)) {
        __carregando(false)
        __painel_lateral(false)
      } else {
        __carregando(false)
      }
    }
  }
  return (
    <css.LogMe id="painel-de-logar-lateral">
      <ul>
        <NotificationContainer />
        {carregando ?
          <div className="carregando-pagina-pesquisa">
            <HashLoader color={colors.accent} loading={carregando} size={35} />
          </div>
          :
          <>
            {!logado &&
              <form onSubmit={(e) => e.preventDefault()}>
                <li>
                  <input type="text" placeholder="Email ou Usuário"
                    id="username"
                    autoComplete="username"
                    onBlur={(e) => setUser(prev => (
                      { ...prev, email: e.target.value })
                    )}
                  />
                </li>

                <li>
                  <input type="password" placeholder="Senha"
                    id="current-password"
                    autoComplete="current-password"
                    onChange={(e) => setUser(prev => (
                      { ...prev, senha: e.target.value })
                    )}
                  />
                </li>
                <li>
                  <span className="p-link span-login"
                    onClick={() => Router.push(
                      '/conta/acesse?solicitar_chave=true'
                    )}>
                    Esqueci minha senha
                    </span>
                </li>

                <li>
                  <div>
                    <button type='submit' onClick={validar}>Entrar</button>
                    <button type='button' onClick={() => Router.push('/conta/cadastrar')}>
                      Criar Conta
            </button>
                  </div>
                </li>
              </form>
            }
          </>
        }


        {logado &&
          <ul id="menu-logado-especial">
            <li onClick={() => Router.push('/conta/painel')}>Painel do cliente</li>
            <li onClick={() => Router.push('/conta/meu-carrinho')}>Meu carrinho</li>
            <li onClick={() => Router.push('/conta/enderecos')}>Meus endereços</li>
            <li onClick={() => Router.push('/conta/pedidos')}>Minhas compras</li>
            <li onClick={sair}>Deslogar</li>
          </ul>
        }

      </ul>
    </css.LogMe>
  )
}

export default function Side() {

  const {
    carrinho: { carrinho },
    autenticacao: { painel_lateral, __painel_lateral }
  } = useZoe()

  const { toggleTheme, title } = useTema()

  //Se está logado, mostra o menu com Sobrenome
  return (
    <css.Placeholder>
      <css.SideHeadMenu>

        {title !== 'light' ?
          <li className="toggle-btn" onClick={toggleTheme}>
            <BiSun size={18} />
          </li>
          :
          <li className="toggle-btn" onClick={toggleTheme}>
            <BiMoon size={18} />
          </li>
        }

        <li>
          <MdPerson id="icone-do-painel-de-login" onClick={() => __painel_lateral(!painel_lateral)} />
          {painel_lateral && <LogMeIn />}
        </li>

        <li
          onClick={() => Router.push('/conta/meu-carrinho')}
        > <MdShoppingBasket />
          {!!carrinho.length && <div id='basketflag'>
            {carrinho.length}</div>}
        </li>
      </css.SideHeadMenu>

    </css.Placeholder>
  )
}
