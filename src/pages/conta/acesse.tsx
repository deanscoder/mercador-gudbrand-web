import { useEffect, useState } from 'react'
import { useZoe } from '../../components/Zoe/Contextos/ZOE'
import * as css from '../../styles/pages/Login'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import HashLoader from "react-spinners/HashLoader";
import ion from '../../config/ion_api_base'
import { useTema } from '../../contexts/theme'

const Cabeçalho = () => {
  return (
    <Head>
      <title>Acesse agora - Mercado Gudbrand</title>
    </Head>
  )
}

const imagem_de_fundo = [
  "/images/background-acesso-escuro.png",
  "/images/background-acesso-claro.jpg"
]

const Acesse = () => {
  const [user, setUser] = useState({ email: '', senha: '' })
  const [carregando, setCR] = useState(false)
  const [greetings, setGreetings] = useState(false)
  const [esqueci, setEsqueci] = useState(false)

  const router = useRouter()
  const { redirecionado, solicitar_chave } = router.query

  const { title } = useTema()

  useEffect(() => {
    confUI('zoe', false)
    setTimeout(() => esta_autorizado(), 3000)

    let input = document.getElementById("identificacao-de-login") as HTMLInputElement

    if (input) {

      input.focus()
    }

    if (solicitar_chave) {
      setEsqueci(true)
    }
  }, [])

  const {
    autenticacao: { perfil, fazer_login, esta_logado },
    zoeUI: { confUI }
  } = useZoe()

  const [autorizado, setAutorizado] = useState(false)

  async function solicitar_acesso() {
    setCR(true)
    try {

      const { data: res } = await ion({
        method: 'post',
        url: '/conta/autorizacao/esqueci',
        data: { autorizacao: user.email }
      })

      if (res) {

        if (res.status === 'SOLICITADO') {

          NotificationManager.success('Uma nova senha a caminho, olhe a sua caixa de entrada', '(¯ ▽ ¯) ノ')
          setEsqueci(false)

        } else {

          NotificationManager.warning(res.erro, 'Oops')

        }

      }

    } catch (Err) {
      console.log(Err)
    }

    setCR(false)

  }

  async function esta_autorizado() {
    if (await esta_logado()) {
      setAutorizado(true)
      router.push('/conta/painel')
    } else {
      setAutorizado(false)
    }
  }

  async function entrar() {
    setCR(true)

    if (!user.email || !user.senha) {

      NotificationManager.warning('Por favor preencha os campos!', '┐ (¯ ヘ ¯) ┌')
      setUser(prev => ({ ...prev, email: '', senha: '' }))
      setCR(false)

    } else {

      const logando = await fazer_login(user.email, user.senha)

      if (logando) {

        NotificationManager.info(`Seja Bem vindo!`, '(¯ ▽ ¯) ノ')
        setGreetings(true)

        if (redirecionado) {

          router.back()

        } else {

          router.push('/')

        }
      } else {

        setCR(false)

      }

    }

  }

  function form_acessar(e) {
    e.preventDefault()
    entrar()
  }

  function form_recuperar(e) {
    e.preventDefault()
    solicitar_acesso()
  }

  return (
    <css.Container bg={title === 'dark' ? imagem_de_fundo[0] : imagem_de_fundo[1]}>
      <Cabeçalho />
      { !esqueci &&
        <css.Box>
          {carregando &&
            <css.Loading>
              <HashLoader color="#0066ff" />
              {greetings ? <h2>ε = ε = ε = ε = ┌ (; ¯ ▽ ¯) ┘</h2> :
                <h2>Só um segundinho...</h2>}
            </css.Loading>
          }
          {
            !carregando &&
            <form onSubmit={form_acessar}>
              <h1>Entre agora</h1>
              <ul>
                <li>
                  <input type="text" placeholder="Email ou Usuario"
                    id="identificacao-de-login"
                    autoComplete="username"
                    onChange={(e) => setUser(prev =>
                      ({ ...prev, email: e.target.value })
                    )}
                  />
                </li>

                <li>
                  <input type="password" placeholder="Senha"
                    id="current-password"
                    autoComplete="current-password"
                    onChange={(e) => setUser(prev =>
                      ({ ...prev, senha: e.target.value })
                    )}
                  />
                </li>

                <li>
                  <button type="submit">Entrar</button>
                </li>
                <li onClick={() => router.push('/conta/cadastrar')}>
                  <div id="non-register">Ainda não sou inscrito!</div>
                </li>
                <li onClick={() => setEsqueci(true)}>
                  <div id="non-register">Esqueci minha senha...</div>
                </li>
              </ul>
            </form>
          }
        </css.Box>
      }

      {esqueci &&
        <css.Box>
          {carregando &&
            <css.Loading>
              <HashLoader color="#0066ff" />
            </css.Loading>
          }
          <form onSubmit={form_recuperar}>
            <h1>Recuperar Acesso</h1>
            <ul>
              <li>
                <input type="text" placeholder="Email ou Usuario"
                  id="identificacao-de-login"
                  autoComplete="username"
                  onChange={(e) => setUser(prev =>
                    ({ ...prev, email: e.target.value })
                  )}
                />
              </li>

              <li>
                <button type="submit">Solicitar Acesso</button>
              </li>

              <li onClick={() => setEsqueci(false)}>
                <div id="non-register">Voltar</div>
              </li>
            </ul>

          </form>


        </css.Box>}
      <NotificationContainer />
    </css.Container>
  )
}

export default Acesse
