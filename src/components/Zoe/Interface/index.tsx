import React, { useEffect, useState } from 'react'
import * as css from './styles'
import * as ico from 'react-icons/fa'
import { BiSun, BiMoon } from 'react-icons/bi'
import interruptor from './acoes/interruptor'
import { useZoe } from '../Contextos/ZOE'
import Sacola from './modelos/Sacola'
import { useRouter } from 'next/router'
import { useTema } from '../../../contexts/theme'
import { BsHeadset } from 'react-icons/bs'
export default function Interface() {
  const [zona, setZona] = useState(null)
  const router = useRouter()
  const {
    autenticacao: { perfil, logado },
    zoeUI: { confUI, UIs, useKeypress }
  } = useZoe()

  const { toggleTheme, title } = useTema()

  useEffect(() => {
    confUI('logar', true)

  }, [])

  useKeypress('Escape', () => {
    confUI('zoe', false)
  })

  return (
    <css.Container id='ZOE-ZONE'>
      <css.Caixa id='interface__op' >
        <css.Lista id='interface__op_lista'>

          {logado ?

            <css.Item id='interface__perfil' onClick={() =>
              router.push('/conta/painel')
            }>
              <ico.FaUserAstronaut />Painel
              </css.Item>

            :
            <css.Item id='interface__conta' onClick={() =>
              router.push('/conta/acesse')
            }>
              <ico.FaUserTag />Acesse agora
              </css.Item>

          }

          <css.Item id='interface__sacola' onClick={() => {
            confUI('operando', true); setZona(interruptor('sacola'))
          }}>
            <ico.FaShoppingBag />Meu carrinho
            </css.Item>

          {title !== 'light' ?
            <css.Item className="toggle-btn" onClick={toggleTheme}>
              <BiSun />Modo Superman
              </css.Item>
            :
            <css.Item className="toggle-btn" onClick={toggleTheme}>
              <BiMoon />Modo Batman
              </css.Item>
          }

          {/* <a href="https://blogr.gudbrand.com.br" target="_blank">
            <css.Item><ico.FaCocktail />Blogr</css.Item>
          </a> */}

          <a href="https://t.me/grupogud" target="_blank">
            <css.Item><ico.FaTelegram />Telegram</css.Item>
          </a>

          <a href="https://instagram.com/grupogud" target="_blank">
            <css.Item>
              <ico.FaInstagram />Instagram
            </css.Item>
          </a>

          <a href="/suporte/sac">
            <css.Item>
              <BsHeadset />SAC
            </css.Item>
          </a>

        </css.Lista>
      </css.Caixa>
      <css.Conteudo id='interface__conteudo' >
        {UIs.operando && zona === 'sacola' ? <Sacola /> : null}

      </css.Conteudo>
    </css.Container>
  )
}

