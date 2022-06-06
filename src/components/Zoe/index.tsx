import React, { useState, useEffect } from 'react'
import * as css from './styles'
import { FaFingerprint } from 'react-icons/fa'
import Interface from './Interface'
import { useZoe } from './Contextos/ZOE'

export default function Zoe() {

  const { zoeUI: { confUI, UIs }
  } = useZoe()
  const [operante, setOperante] = useState(false)

  useEffect(() => {
    let btn = document.getElementById('RVL__btnCENTRAL')
    if (UIs.zoe) {
      btn.setAttribute('ativo', 'sim')
    } else {
      btn.removeAttribute('ativo')
    }
  })

  return (
    <css.Container>
      {/* <MenuContextual /> */}
      <css.btnCentral id="RVL__btnCENTRAL" onClick={() => confUI('zoe', !UIs.zoe)}>
        <span id='RVL__ZOE_MENU' >Menu Especial</span>
        <FaFingerprint />
      </css.btnCentral>
      { UIs.zoe ? <Interface /> : ''}
    </css.Container>
  )
}