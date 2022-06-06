import { useEffect, useState } from 'react'
import * as css from '../styles'
import InputMask from 'react-input-mask'

export default function AlterarContato ({contato, focus}) {
  const [contador, setContador] = useState(0)
  useEffect(() => {
    if(contador === 0)
      focus(false)
    else
      focus(true)
  }, [contador])

  return (
    <css.AlterarTextInputContainer>
      <InputMask
        mask='99 9 9999 9999'
        id='alterar-contato'
        placeholder={contato ? contato : 'Telefone celular'}
        onChange={e => setContador(e.target.value.length)} />
    </css.AlterarTextInputContainer>
  )
}