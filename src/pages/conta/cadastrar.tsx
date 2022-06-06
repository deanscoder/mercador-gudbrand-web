import { useEffect, useState } from 'react'
import * as css from '../../styles/pages/Cadastrar'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useZoe } from '../../components/Zoe/Contextos/ZOE'
import { useTema } from '../../contexts/theme'
import PropagateLoader from "react-spinners/PropagateLoader";

import { NotificationContainer } from 'react-notifications'

const Cabeçalho = () => {
  return (
    <Head>
      <title>Cadastrar agora: Quero criar minha conta Gudbrand!</title>
    </Head>
  )
}

const imagem_de_fundo = [
  "/images/background-acesso-escuro.png",
  "/images/background-acesso-claro.jpg"
]

const Acesse = () => {
  const Route = useRouter()

  const [carregando, setCR] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const [dados, setDados] = useState(
    { email: '', nome: '', sobrenome: '', senha: '', honorifico: '' })

  const { autenticacao: { criar_conta } } = useZoe()

  const { title, colors } = useTema()

  async function enviar_requisicao() {
    if (dados.nome && dados.email && dados.sobrenome && dados.senha && dados.senha.length > 5) {
      const resposta = await criar_conta(dados)

      if (resposta) {
        setCR(false)
        Route.push('/conta/painel')
      }
    }
  }

  useEffect(() => {
    let btn = document.getElementById('btn-proximo-cadastro') as HTMLButtonElement
    if (dados.nome && dados.email && dados.sobrenome && dados.senha && dados.senha.length > 5) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  }, [dados])

  useEffect(() => {
    if (etapa === 1) {
      setCR(true)
      enviar_requisicao()
    }
  }, [etapa])

  return (
    <css.Container bg={title === 'dark' ? imagem_de_fundo[0] : imagem_de_fundo[1]}>
      <Cabeçalho />
      <css.Box>
        <h1>Inscreva-se</h1>

        <>
          <input type="email" placeholder='Email' value={dados.email}
            onChange={(e) => setDados(prev => ({ ...prev, email: e.target.value }))}
            autoComplete="email"
          />
          <input type="text" placeholder='Pronome de tratamento'
            value={dados.honorifico} onChange={(e) => setDados(prev =>
              ({ ...prev, honorifico: e.target.value }))}
            list="sugestoes-de-nomes" />

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

          <input type="text" placeholder='Nome' value={dados.nome}
            onChange={(e) => setDados(prev => ({ ...prev, nome: e.target.value }))}
            autoComplete="given-name"
          />
          <input type="text" placeholder='Sobrenome' value={dados.sobrenome}
            onChange={(e) => setDados(prev => ({ ...prev, sobrenome: e.target.value }))}
            autoComplete="family-name"
          />
          <input type="password" placeholder='Senha' value={dados.senha}
            onChange={(e) => setDados(prev => ({ ...prev, senha: e.target.value }))}
            autoComplete="new-password"
          />
          <span>A senha precisa ser maior do que 6 dígitos</span>
        </>

        {carregando ?
          <div className="carregamento-wrapper">
            <PropagateLoader color={colors.accent} loading={carregando} size={15} />
          </div>
          :
          <css.Botao type='button' id="btn-proximo-cadastro" onClick={() => setEtapa(1)}>Próximo</css.Botao>
        }

      </css.Box>
      <NotificationContainer />
    </css.Container>
  )
}

export default Acesse
