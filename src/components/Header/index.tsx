import React, { useEffect, useState } from 'react'
import {
  Container,
  Esquerda,
  Direita,
  Inf,
  Sup
} from './styles'
import Logo from './Logo'
import Menu from './Menu'
import Side from './Side'
import Zoe from '../Zoe'
import Search from './Search'


export default function HeaderBar() {
  const [cont, setContador] = useState(0)

  function fContador(): void {
    setContador(cont + 1)
  }

  /* useEffect(() => {
    if(!carregando && contador < 1) {
      setContadorr(1)
      console.log('Logado: ', esta_logado())
    }
  }, [carregando, perfil]) */

  return (<>
    {/* <Bar /> */}
    <Zoe />
    <Container id='RVLER_HEADER'>
      <Sup>
        <Logo />
        {/* <Buscar /> */}
        <Search />
        <Direita>
          <Side />
        </Direita>
      </Sup>

      <Inf>
        <Esquerda>
          <Menu />
          {/* <button className="MobileIcon" onClick={() => setMobile(!mobile)}>
        <AiOutlineMenu />
      </button> */}
        </Esquerda>
      </Inf>
    </Container>
  </>
  )
}

