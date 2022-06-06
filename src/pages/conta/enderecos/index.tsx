import * as css from '../../../styles/pages/MinhaConta'
import { useZoe } from '../../../components/Zoe/Contextos/ZOE'
import { useRouter } from 'next/router'
import Navegacao from '../../../components/Header/Navegacao'
import { RiMapPinAddLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { INTERFACE_DE_ENDERECO_DE_USUARIO } from '../../../HPD/DB/NoSQL/Colecoes/Registro/Interface'
import faces from '../../../HPD/ALIAS/notification_faces'

export default function Enderecos() {
  const { autenticacao: { perfil, logado, atualizar_enderecos, esta_logado }
  } = useZoe()
  const Router = useRouter()

  function TestaIntegridade(endereco): boolean {
    if (endereco.endereco && endereco.uf && endereco.numero && endereco.cep
      && endereco.bairro && endereco.cidade && endereco.nome) {
      return true
    }
    else {
      alert('Serviço indisponivel!')
      return false
    }
  }

  async function Salvar(el: INTERFACE_DE_ENDERECO_DE_USUARIO): Promise<void> {
    if (TestaIntegridade(el)) {
      var perfil_temporario = perfil
      if (perfil_temporario.endereco_padrao !== el) {
        perfil_temporario.endereco_padrao = el
        //setPerfil(perfil_temporario)
        const resposta_do_servidor = await atualizar_enderecos(
          {
            endereco_padrao: perfil_temporario.endereco_padrao,
            enderecos: perfil_temporario.enderecos
          })
        if (!resposta_do_servidor)
          alert('Serviço indisponivel no momento')
      }
    }
  }

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
      NotificationManager.info('Você precisa estar logado!', faces.whatever)
      Router.push('/conta/acesse?redirecionado=sim')
    }
  }, [autorizado])

  return (
    <>
      <Navegacao nome={"Meus endereços"} />
      <css.ContainerEnderecos>
        <ul>
          <css.BlocoDeEnderecoPadrao>
            {perfil && perfil.endereco_padrao &&
              <>
                <h2>{perfil.endereco_padrao.destinatario}</h2>
                <p>{perfil.endereco_padrao.tel}</p>
                <div>{perfil.endereco_padrao.nome}</div>
                <div>{perfil.endereco_padrao.endereco}, {perfil.endereco_padrao.numero}</div>
                <div>{perfil.endereco_padrao.cidade} - {perfil.endereco_padrao.uf}</div>
              </>
            }{perfil && !perfil.endereco_padrao &&
              <h2>Selecione um endereço como padrão</h2>
            }
          </css.BlocoDeEnderecoPadrao>
          {perfil && perfil.enderecos && perfil.enderecos.length > 0 && perfil.enderecos.map(el =>
            <css.BlocoDeEndereco onClick={() => setTimeout(() => Salvar(el), 350)}>
              <div>{el.nome}</div>
              <div>{el.endereco}, {el.numero}</div>
              <div>{el.cidade} - {el.uf}</div>
              <button onClick={() => Router.push('/conta/enderecos/alterar?enderecoID=' + el._id)}>Editar</button>
            </css.BlocoDeEndereco>
          )}
          <li><css.LinkCriarEndereco
            onClick={() => Router.push('/conta/enderecos/criar')}>
            <RiMapPinAddLine /></css.LinkCriarEndereco></li>
        </ul>
        <NotificationContainer />

      </css.ContainerEnderecos>
    </>
  )
}