import React, { useState } from 'react'
import Link from 'next/link'
import {
  ListaMenu,
  ItemMenu
} from './styles'
import Categories from './Categorias'
import { FiChevronDown } from 'react-icons/fi'
import { useZoe } from '../../Zoe/Contextos/ZOE'

export default function Menu() {
  const [dropdown, __dropdown] = useState(false)
  const { autenticacao: { perfil } } = useZoe()
  return (
    <nav>
      <ListaMenu>
        <ItemMenu
          onMouseEnter={() => __dropdown(true)}
          onMouseLeave={() => __dropdown(false)}
        >
          Coleções <FiChevronDown />
          {dropdown ? <Categories /> : null}
        </ItemMenu>
        {/* <ItemMenu>
          <Link href={
            !perfil ?
              "https://blogr.gudbrand.com.br" :
              `https://blogr.gudbrand.com.br/?username=${perfil.usuario}&email=${perfil.email}&nome=${perfil.nome}&sobrenome=${perfil.sobrenome}&DAN=${perfil.DAN}`
          }>
            <a>
              Blogr
            </a>
          </Link>
        </ItemMenu> */}

      </ListaMenu>

    </nav>
  )
}