import { useState } from 'react'
import Navegacao from '../../Header/Navegacao'
import { useZoe } from '../../Zoe/Contextos/ZOE'
import AlterarEmail from './AlterarEmail'
import AlterarNome from './AlterarNome'
import AlterarUsuario from './AlterarUsuario'
import * as css from './styles'
import { useRouter } from 'next/router'
import AlterarContato from './AlterarContato'
import { FiEdit2, FiArrowRight } from 'react-icons/fi'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import BarLoader from "react-spinners/BarLoader";
import { useTema } from '../../../contexts/theme'
import AlterarHonorifico from './AlterarHonorifico'

export default function MeusDados() {
  const { autenticacao: {
    perfil, atualizar_dados_pessoais, atualizar_usuario, atualizar_email,
    verifica_disponibilidade_de_usuario, verifica_disponibilidade_de_email,
    verifica_disponibilidade_de_numero, atualizar_telefone } } = useZoe()
  const [alterarNome, setAlterarNome] = useState(false)
  const [alterarContato, setAlterarContato] = useState(false)
  const [alterarUsuario, setAlterarUsuario] = useState(false)
  const [alterarHonorifico, setAlterarHonorifico] = useState(false)
  const [alterarEmail, setAlterarEmail] = useState(false)
  const [alterarFocus, setAlterarFocus] = useState(false)
  const [carregando, setC] = useState(false)

  const { colors } = useTema()

  const Router = useRouter()


  function salvarAlteracaoDeNome(tipo: string) {
    setC(true)

    if (tipo === 'HONORIFICO') {

      let hn = document.getElementById('alterar-honorifico') as HTMLInputElement

      if (hn.value) {

        atualizar_dados_pessoais(
          perfil.nome,
          perfil.sobrenome,
          hn.value
        )
        setAlterarHonorifico(false)
        setAlterarFocus(false)
        setC(false)


      }
      else {

        NotificationManager.warning('Os campos devem estar preenchidos corretamente', 'Kirie diz:')
        setC(false)

      }

    } else {

      let nm = document.getElementById('alterar-nome') as HTMLInputElement
      let snm = document.getElementById('alterar-sobrenome') as HTMLInputElement

      if ((nm.value && !snm.value) || (!nm.value && snm.value) ||
        (nm.value && snm.value)) {

        atualizar_dados_pessoais(
          nm.value ? nm.value : perfil.nome,
          snm.value ? snm.value : perfil.sobrenome,
          perfil.honorifico)
        setAlterarNome(false)
        setAlterarFocus(false)
        setC(false)

      } else {

        NotificationManager.warning('Os campos devem estar preenchidos corretamente', 'Kirie diz:')
        setC(false)

      }

    }
  }

  async function salvarAlteracaoDeContato() {
    setC(true)
    let ct = document.getElementById('alterar-contato') as HTMLInputElement
    if (ct.value) {
      if (await verifica_disponibilidade_de_numero(ct.value.replace(/\D/g, ''))) {
        atualizar_telefone(ct.value.replace(/\D/g, ''))
        setAlterarContato(false)
        setAlterarFocus(false)
        setC(false)
      }
    } else {
      NotificationManager.warning('O campo de contato deve estar preenchido corretamente', 'Kirie diz:')
      setC(false)
    }
  }

  async function salvarAlteracaoDeEmail() {
    setC(true)
    let em = document.getElementById('alterar-email') as HTMLInputElement
    if (em.value) {
      if (await verifica_disponibilidade_de_email(em.value)) {
        atualizar_email(em.value)
        setAlterarEmail(false)
        setC(false)
        setAlterarFocus(false)
      }
    } else {
      NotificationManager.warning('O campo email deve estar preenchido corretamente', 'Kirie diz:')
      setC(false)
    }
  }

  async function salvarAlteracaoDeUsuario() {
    setC(true)
    let us = document.getElementById('alterar-usuario') as HTMLInputElement
    if (us.value) {
      if (await verifica_disponibilidade_de_usuario(us.value)) {
        atualizar_usuario(us.value)
        setAlterarUsuario(false)
        setAlterarFocus(false)
        setC(false)
      }
    } else {
      NotificationManager.warning('O campo usuario deve estar preenchido corretamente', 'Kirie diz:')
      setC(false)
    }
  }

  function fFocus(b: boolean) {
    setAlterarFocus(b)
  }

  return (
    <>
      <css.Capa>
        {perfil && perfil.nome && perfil.sobrenome &&
          <css.FotoPerfil>
            <h2>{perfil.nome[0] + perfil.sobrenome[0]}</h2>
          </css.FotoPerfil>
        }
      </css.Capa>
      <css.Container>
        <Navegacao nome={'Painel do cliente'} />
        {perfil &&
          <>
            <ul>
              <li className="carregando-painel">
                <BarLoader color={colors.accent} loading={carregando} width={300} />
              </li>
              <li className="divisor-de-inputs-painel"><span className="sub-titulo-inputs">Configurações pessoais</span></li>

              <li>
                {!alterarHonorifico &&
                  <div>
                    Pronome de tratamento:
              <span>{perfil.honorifico}</span>
                  </div>
                }{alterarHonorifico &&
                  <AlterarHonorifico honorifico={perfil.honorifico} focus={fFocus} />
                }
                {!alterarHonorifico && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarHonorifico(true)}><FiEdit2 /></css.ClickSpan>
                }{alterarHonorifico && alterarFocus &&
                  <css.ClickSpan onClick={() => salvarAlteracaoDeNome('HONORIFICO')}>Salvar</css.ClickSpan>
                }{alterarHonorifico && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarHonorifico(false)}><RiArrowGoBackFill /></css.ClickSpan>
                }
              </li>

              <li>
                {!alterarNome &&
                  <div>
                    Nome:
              <span>{perfil.nome} {perfil.sobrenome}</span>
                  </div>
                }{alterarNome &&
                  <AlterarNome nome={perfil.nome} sobrenome={perfil.sobrenome} focus={fFocus} />
                }
                {!alterarNome && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarNome(true)}><FiEdit2 /></css.ClickSpan>
                }{alterarNome && alterarFocus &&
                  <css.ClickSpan onClick={() => salvarAlteracaoDeNome('NOME')}>Salvar</css.ClickSpan>
                }{alterarNome && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarNome(false)}><RiArrowGoBackFill /></css.ClickSpan>
                }
              </li>

              <li>
                {!alterarUsuario &&
                  <div>
                    Usuário:
              <span>{perfil.usuario}</span>
                  </div>
                }{alterarUsuario &&
                  <AlterarUsuario usuario={perfil.usuario} focus={fFocus} />
                }
                {!alterarUsuario && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarUsuario(true)}><FiEdit2 /></css.ClickSpan>
                }{alterarUsuario && alterarFocus &&
                  <css.ClickSpan onClick={salvarAlteracaoDeUsuario}>Salvar</css.ClickSpan>
                }{alterarUsuario && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarUsuario(false)}><RiArrowGoBackFill /></css.ClickSpan>
                }
              </li>

              <li onClick={() => Router.push('/conta/pedidos')}>
                <div>
                  Histórico de compras
              </div>
                <css.ClickSpan><FiArrowRight /></css.ClickSpan>
              </li>

              <li onClick={() => Router.push('/conta/enderecos')}>
                <div>
                  Gerenciar meus endereços
              </div>
                <css.ClickSpan><FiArrowRight /></css.ClickSpan>
              </li>

              <li>
                {!alterarContato &&
                  <div>
                    Telefone:
              <span>{perfil.telefone}</span>
                  </div>
                }{alterarContato &&
                  <AlterarContato contato={perfil.telefone} focus={fFocus} />
                }
                {!alterarContato && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarContato(true)}><FiEdit2 /></css.ClickSpan>
                }{alterarContato && alterarFocus &&
                  <css.ClickSpan onClick={salvarAlteracaoDeContato}>Salvar</css.ClickSpan>
                }{alterarContato && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarContato(false)}><RiArrowGoBackFill /></css.ClickSpan>
                }
              </li>


              <li className="divisor-de-inputs-painel"><span className="sub-titulo-inputs">Segurança e acesso</span></li>

              <li>
                {!alterarEmail &&
                  <div>
                    Email:
              <span>{perfil.email}</span>
                  </div>
                }{alterarEmail &&
                  <AlterarEmail email={perfil.email} focus={fFocus} />
                }
                {!alterarEmail && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarEmail(true)}><FiEdit2 /></css.ClickSpan>
                }{alterarEmail && alterarFocus &&
                  <css.ClickSpan onClick={salvarAlteracaoDeEmail}>Salvar</css.ClickSpan>
                }{alterarEmail && !alterarFocus &&
                  <css.ClickSpan onClick={() => setAlterarEmail(false)}><RiArrowGoBackFill /></css.ClickSpan>
                }
              </li>

              {!perfil.email_verificado &&
                <li onClick={() => Router.push('/conta/verificar-email?email=' + perfil.email)}>
                  <div>Por codigo de verificação</div>
                  <css.ClickSpan><FiArrowRight /></css.ClickSpan>
                </li>
              }

              <li onClick={() => Router.push('/conta/seguranca/mudar-senha')}>
                <div>
                  Mudar minha senha
              </div>
                <css.ClickSpan><FiArrowRight /></css.ClickSpan>
              </li>

              <li className="divisor-de-inputs-painel"><span className="sub-titulo-inputs">Termos e serviços</span></li>

              <li onClick={() => Router.push('/suporte/notas/condicoes-de-uso')}>
                <div>Condições de uso</div>
                <css.ClickSpan ><FiArrowRight /></css.ClickSpan>
              </li>

              <li onClick={() => Router.push('/suporte/notas/condicoes-de-compra')}>
                <div>Condições de compra</div>
                <css.ClickSpan ><FiArrowRight /></css.ClickSpan>
              </li>

              <li onClick={() => Router.push('/suporte/notas/notas-de-privacidade-e-cookies')}>
                <div>Notas de privacidade e cookies</div>
                <css.ClickSpan ><FiArrowRight /></css.ClickSpan>
              </li>
            </ul>
          </>
        }
        <NotificationContainer />
      </css.Container>
    </>
  )
}