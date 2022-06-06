import { useEffect, useState } from 'react'
import * as css from '../styles'

export default function AlterarEmail ({email, focus}) {
  const [contador, setContador] = useState(0)
  useEffect(() => {
    if(contador === 0)
      focus(false)
    else
      focus(true)
  }, [contador])

  return (
    <css.AlterarTextInputContainer>
      <input type="email" id='alterar-email' placeholder={email} onChange={e => setContador(e.target.value.length)} />
    </css.AlterarTextInputContainer>
  )
}