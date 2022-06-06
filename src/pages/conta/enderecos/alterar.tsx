import * as css from '../../../styles/pages/MinhaConta'
import { useZoe } from '../../../components/Zoe/Contextos/ZOE'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Navegacao from '../../../components/Header/Navegacao'
import InputMask from 'react-input-mask'
import { NotificationContainer, NotificationManager } from 'react-notifications'

export default function AlterarEndereco() {
  const { autenticacao: { perfil, esta_logado, atualizar_enderecos } } = useZoe()
  const [endereco, setEndereco] = useState({
    endereco: '', cep: '', numero: '', cidade: '', uf: '', nome: '',
    complemento: '', bairro: '', pais: 'Brasil', tel: '', destinatario: ''
  })

  const Router = useRouter()
  const { enderecoID } = Router.query

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

  useEffect(() => {
    if (perfil) {
      perfil.enderecos.forEach(el => {
        if (el._id === enderecoID) {
          setEndereco(prev => ({
            ...prev,
            endereco: el.endereco,
            cep: el.cep,
            numero: el.numero,
            cidade: el.cidade,
            uf: el.uf,
            pais: el.pais,
            bairro: el.bairro,
            nome: el.nome,
            destinatario: el.destinatario ? el.destinatario : '',
            tel: el.tel ? el.tel : ''
          }))
        }
      })
    }
  }, [])

  async function LocalizarEndereco(cep: string): Promise<void> {
    const { data: resposta } = await axios({
      url: `https://viacep.com.br/ws/${cep}/json`,
      method: 'get'
    })
    if (resposta) {
      setEndereco(prev => ({
        ...prev,
        endereco: resposta.logradouro + ' ' + resposta.complemento,
        cidade: resposta.localidade,
        uf: resposta.uf,
        bairro: resposta.bairro
      }))
    }
  }

  function TestaIntegridade(): boolean {
    if (endereco.endereco && endereco.uf && endereco.numero && endereco.cep
      && endereco.bairro && endereco.cidade && endereco.nome && endereco.tel
      && endereco.destinatario && endereco.tel.length >= 11) {
      return true
    }
    else {
      NotificationManager.warning('Dados incompletos!', '(> ﹏ <)')
      return false
    }
  }

  function Deletar() {
    var perfil_temporario = perfil
    perfil_temporario.enderecos.forEach(async el => {
      if (el._id === enderecoID) {
        const index = perfil_temporario.enderecos.indexOf(el);
        if (index > -1) {
          perfil_temporario.enderecos.splice(index, 1);
          const resposta_do_servidor = await atualizar_enderecos(
            {
              endereco_padrao: perfil_temporario.endereco_padrao,
              enderecos: perfil_temporario.enderecos
            })
          if (resposta_do_servidor)
            Router.back()
          else
            NotificationManager.warning('Não se preocupe, não é culpa sua, nos vamos descobrir o que aconteceu', '╮ (¯ ~ ¯) ╭')
        }
      }
    })
  }

  async function Salvar(): Promise<void> {
    if (TestaIntegridade()) {
      var perfil_temporario = perfil
      let padrao = document.getElementById('tornar-padrao') as HTMLInputElement
      perfil_temporario.enderecos.forEach(el => {
        if (el._id === enderecoID) {
          el.bairro = endereco.bairro
          el.cep = endereco.cep
          el.destinatario = endereco.destinatario
          el.cidade = endereco.cidade
          el.endereco = endereco.endereco
          el.nome = endereco.nome
          el.pais = endereco.pais
          el.tel = endereco.tel.replace(/\D/g, "")
          el.uf = endereco.uf
          el.numero = endereco.numero
        }
      })
      if (padrao && padrao.checked) {
        perfil_temporario.endereco_padrao = endereco
      }
      //setPerfil(perfil_temporario)
      //console.log(endereco, perfil_temporario)
      const resposta_do_servidor = await atualizar_enderecos(
        {
          endereco_padrao: perfil_temporario.endereco_padrao,
          enderecos: perfil_temporario.enderecos
        })
      if (resposta_do_servidor)
        Router.back()
      else
        NotificationManager.warning('Não se preocupe, não é culpa sua, nos vamos descobrir o que aconteceu', '╮ (¯ ~ ¯) ╭')
    }
  }

  useEffect(() => {
    var cep = endereco.cep.replace(/\D/g, "") as string
    if (cep.length === 8) {
      LocalizarEndereco(cep)
    }
  },
    [endereco.cep])

  return (
    <>
      <Navegacao nome={`Alterar Endereço: ${endereco.nome}`} />
      <css.ContainerEnderecos>
        <ul>
          <li className="divisor-de-inputs"><span className="sub-titulo-inputs">Contato do recebedor</span></li>
          <li>
            <div>
              <input type="text" placeholder='Nome e sobrenome do destinatário'
                value={endereco.destinatario}
                onChange={(e) => setEndereco(prev => ({ ...prev, destinatario: e.target.value }))} />
            </div>
          </li>
          <li>
            <div>
              <InputMask
                mask='99 9 9999 9999'
                placeholder='Contato do destinatário'
                value={endereco.tel}
                onChange={(e) => setEndereco(prev => ({ ...prev, tel: e.target.value }))} />
            </div>
          </li>
          <li className="divisor-de-inputs"><span className="sub-titulo-inputs">Endereço</span></li>
          <li>
            <div>
              <InputMask
                id='cep-input'
                mask='99999-999'
                placeholder='CEP'
                value={endereco.cep}
                onChange={(e) => setEndereco(prev => ({ ...prev, cep: e.target.value }))} />
              <button id="botao-de-limpar-cep" onClick={() => setEndereco(prev => ({ ...prev, cep: '' }))}>
                x
              </button>
            </div>
          </li>
          <li>
            <div>
              <input type="text" placeholder='Cidade - Estado' readOnly
                value={endereco.cidade ? `${endereco.cidade} - ${endereco.uf}` : ''} />
            </div>
          </li>
          <li>
            <div>
              <input type="text" placeholder='Bairro' value={endereco.bairro}
                onChange={(e) => setEndereco(prev => ({ ...prev, bairro: e.target.value }))} />
            </div>
          </li>
          <li>
            <div>
              <input id="input-rua" type="text" placeholder='Nome da rua' value={endereco.endereco} about="Insira o nome da rua"
                onChange={(e) => setEndereco(prev => ({ ...prev, endereco: e.target.value }))} />
              <input id="input-numero" type="text" placeholder='Número' value={endereco.numero}
                onChange={(e) => setEndereco(prev => ({ ...prev, numero: e.target.value }))} />
            </div>
          </li>
          <li>
            <div>
              <input type="text" placeholder='Informações adicionais (opcional)'
                value={endereco.complemento}
                onChange={(e) => setEndereco(prev => ({ ...prev, complemento: e.target.value }))} />
            </div>
          </li>
          <li className="divisor-de-inputs"><span className="sub-titulo-inputs">Configurações</span></li>
          <li>
            <div>
              <input type="text" placeholder='Salvar como: Casa/Trabalho' value={endereco.nome}
                onChange={(e) => setEndereco(prev => ({ ...prev, nome: e.target.value }))} list="sugestoes-de-nomes" />
              <datalist id="sugestoes-de-nomes">
                <option value="Casa" />
                <option value="Trabalho" />
                <option value="Casa de praia" />
                <option value="Casa da namorada" />
                <option value="Casa do namorado" />
                <option value="Apartamento" />
                <option value="Sítio" />
                <option value="Chácara" />
              </datalist>
            </div>
          </li>
          <li>
            <input type="checkbox" id="tornar-padrao" onChange={(e) => console.log(e.target.value)} />
            <span> Usar como endereço padrão</span>
          </li>
          <li>
            <css.LinkConfirmarEndereco onClick={() => Salvar()}>Atualizar</css.LinkConfirmarEndereco>
          </li>
          <li>
            <css.LinkDeletarEndereco onClick={() => Deletar()}>Apagar endereço</css.LinkDeletarEndereco>
          </li>
        </ul>
        <NotificationContainer />

      </css.ContainerEnderecos>
    </>
  )
}