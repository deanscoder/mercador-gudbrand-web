import * as css from './styles'

export default function Formulario({ children }) {

  return (
    <css.Container>
      <form>

        {children}

      </form>
    </css.Container>
  )
}