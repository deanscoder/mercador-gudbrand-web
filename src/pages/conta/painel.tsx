import * as css from '../../styles/pages/MinhaConta'
import { useZoe } from '../../components/Zoe/Contextos/ZOE'
import MeusDados from '../../components/MinhaConta/MeusDados'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'

export default function MinhaConta() {
  const { autenticacao: { esta_logado } } = useZoe()
  const Router = useRouter()
  const [autorizado, setAutorizado] = useState(true)

  async function esta_autorizado() {
    if (await esta_logado()) {
      setAutorizado(true)
    } else {
      setAutorizado(false)
    }
  }

  useEffect(() => {
    esta_autorizado()
  }, [])

  useEffect(() => {
    if (!autorizado) {
      NotificationManager.info('Você precisa estar logado!', 'ヽ (‘ー `) ┌ ')
      Router.push('/conta/acesse?redirecionado=sim')
    }
  }, [autorizado])
  return  (
    <css.Container>
      <css.Variavel>
        <MeusDados />
      </css.Variavel>
      <NotificationContainer />
    </css.Container>
  )
}