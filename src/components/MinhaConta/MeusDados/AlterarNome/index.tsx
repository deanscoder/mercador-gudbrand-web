import { useEffect, useState } from 'react'
import * as css from '../styles'

export default function AlterarNome ({nome, sobrenome, focus}) {
  const [contadorN, setContadorN] = useState(0)
  const [contadorS, setContadorS] = useState(0)
  useEffect(() => {
    if(contadorN === 0 && contadorS === 0)
      focus(false)
    else
      focus(true)
  }, [contadorN, contadorS])

  return (
    <css.AlterarTextInputContainer>
      <input type="text" id='alterar-nome' placeholder={nome} onChange={e => setContadorN(e.target.value.length)} />
      <input type="text" id='alterar-sobrenome' placeholder={sobrenome} onChange={e => setContadorS(e.target.value.length)}/>
    </css.AlterarTextInputContainer>
  )
}