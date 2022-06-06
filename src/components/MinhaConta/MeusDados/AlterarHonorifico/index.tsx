import { useEffect, useState } from 'react'
import * as css from '../styles'

export default function AlterarHonorifico({ honorifico, focus }) {
  const [contador, setContador] = useState(0)

  useEffect(() => {
    if (contador === 0)
      focus(false)
    else
      focus(true)
  }, [contador])

  return (
    <css.AlterarTextInputContainer>
      <input type="text" placeholder={honorifico} id="alterar-honorifico"
        list="sugestoes-de-nomes" onChange={e =>
          setContador(e.target.value.length)} />

      <datalist id="sugestoes-de-nomes">
        <option value="senhor" />
        <option value="senhora" />
        <option value="Lord" />
        <option value="Lady" />
        <option value="Grande senhor" />
        <option value="Grande senhora" />
        <option value="O sofrido" />
        <option value="A sofrida" />
      </datalist>
    </css.AlterarTextInputContainer>
  )
}