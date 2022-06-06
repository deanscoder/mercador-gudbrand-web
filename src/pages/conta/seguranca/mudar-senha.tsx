import * as css from '../../../styles/pages/MinhaConta'
import { useZoe } from '../../../components/Zoe/Contextos/ZOE'
import { useRouter } from 'next/router'
import Navegacao from '../../../components/Header/Navegacao'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'

export default function MudarSenha() {
  const { autenticacao: { perfil, esta_logado } } = useZoe()
  const Router = useRouter()
  const [senha, setSenha] = useState({ atual: '', nova: '' })
  const [MSG, setMSG] = useState('')

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

  function TestaIntegridade(): boolean {
    setMSG('')
    if (senha.atual && senha.nova) {
      if (senha.nova.length < 6) {
        setMSG('A senha deve ser maior do que 6 caracteres')
      } else {
        return true
      }
    }
    else {
      setMSG('Por favor preencha os campos corretamente!')
      return false
    }
  }

  async function Salvar(): Promise<void> {
    if (TestaIntegridade()) {
      const { data: res } = await axios({
        method: 'post',
        url: '/api/v2/conta/alterar_senha',
        data: {
          DAN: perfil.DAN, chave_antiga: senha.atual, chave_nova: senha.nova
        }
      })

      if (res && res.status === 'ATUALIZACAO_DE_SENHA_PERMITIDO') {
        setMSG('Uhul! Senha alterada com sucesso!')
      } else {
        setMSG('Serviço indisponível no momento!')
        console.log(res)
      }
    }
  }

  if (perfil) {
    return (
      <>
        <Navegacao nome={"Mudar senha"} />
        <css.ContainerMudarSenha>
          <ul>
            <li>
              <input type="password" value={senha.atual}
                placeholder="Senha atual" onChange={
                  (e) => setSenha(prev => ({ ...prev, atual: e.target.value }))
                } />
            </li>

            <li>
              <input type="password" value={senha.nova}
                placeholder="Senha nova" onChange={
                  (e) => setSenha(prev => ({ ...prev, nova: e.target.value }))
                } />
              {MSG}
            </li>

            <li>
              <css.LinkConfirmarEndereco onClick={Salvar}>Solicitar</css.LinkConfirmarEndereco>
            </li>
          </ul>
          <NotificationContainer />
        </css.ContainerMudarSenha>
      </>
    )
  } else {
    return (<h1>Você precisa estar logado</h1>)
  }
}