import React, { useState, useEffect, createContext } from 'react'
import { NotificationManager } from 'react-notifications'
import Router from 'next/router'
import { INTERFACE_DE_ENDERECO_DE_USUARIO, INTERFACE_DE_HISTORICO_DO_USUARIO, INTERFACE_DE_REGISTRO_DO_USUARIO } from '../../../HPD/DB/NoSQL/Colecoes/Registro/Interface'
import { INTERFACE_DO_LIVRO } from '../../../HPD/DB/NoSQL/Colecoes/Livro/Interface'
import bosons from '../../../HPD/ALIAS/bosons'


  /* 

    CONFIGURAÇÃO DO CONTEXTO DE AUTENTICAÇÃO
    EZEQUIEL GUDBRAND, kinesislake.com - 2022
    @servosalt

  */


const prefixo = process.env.PUBLIC_PREFIXO

interface ENVELOPE_DE_CRIAR_CONTA {
  nome: string
  sobrenome: string
  email: string
  senha: string
}

export interface PAYER_INTERFACE_MERCADO_PAGO {
  name: string
  surname: string
  email: string
  identification: { type: string, number: string }
  address: {
    street_name: string
    street_number: number
    zip_code: string
  }
}

export interface AUTENTICACAO_INTERFACE {
  logado: boolean
  carregando: boolean
  perfil: INTERFACE_DE_REGISTRO_DO_USUARIO
  pedidos: PEDIDOS_INTERFACE
  painel_lateral: boolean
  __painel_lateral: React.Dispatch<boolean>
  __perfil: React.Dispatch<any>
  sair(): void
  forceUpdate(): void
  verifica_disponibilidade_de_usuario(usuario: string): Promise<boolean>
  verifica_disponibilidade_de_numero(numero: string): Promise<boolean>
  verifica_disponibilidade_de_email(email: string): Promise<boolean>
  requisitar_meus_pedidos(): Promise<void>
  esta_logado(): Promise<boolean>
  criar_conta(dados: ENVELOPE_DE_CRIAR_CONTA): Promise<boolean>
  fazer_login(usuario: string, senha: string): Promise<boolean>
  revogar_acesso(): Promise<boolean>
  pedido_em_aberto(): Promise<{ status: string, pedido_ID?: number }>
  criar_modelo_payer_mercado_pago(cpf: string): PAYER_INTERFACE_MERCADO_PAGO
  atualizar_status_de_pedidos(): Promise<boolean>
  atualizar_historico(args: INTERFACE_DE_HISTORICO_DO_USUARIO): Promise<void>
  atualizar_usuario(usuario: string): Promise<boolean>
  atualizar_email(email: string): Promise<boolean>
  atualizar_dados_pessoais(nome: string, sobrenome: string, honorifico: string):
    Promise<boolean>
  atualizar_telefone(telefone: string): Promise<boolean>
  atualizar_enderecos(dados: {
    endereco_padrao: INTERFACE_DE_ENDERECO_DE_USUARIO,
    enderecos: Array<INTERFACE_DE_ENDERECO_DE_USUARIO>
  }): Promise<boolean>
  verificar_email(email: string, codigo: string): Promise<boolean>
  reenviar_codigo(): Promise<void>
}

export interface PEDIDOS_INTERFACE {
  cancelado?: Array<INTERFACE_DO_LIVRO>
  finalizado?: Array<INTERFACE_DO_LIVRO>
  devolvido?: Array<INTERFACE_DO_LIVRO>
  processando?: Array<INTERFACE_DO_LIVRO>
  todos?: Array<INTERFACE_DO_LIVRO>
}

export const ContextoAut = createContext({} as AUTENTICACAO_INTERFACE)

export default function ProvedorAut<AUTENTICACAO_INTERFACE>({ children }) {
  const [logado, __logado] = useState(null)
  const [perfil, __perfil] = useState(null)
  const [carregando, __carregando] = useState(true)
  const [pedidos, __pedidos] = useState({} as PEDIDOS_INTERFACE)
  const [painel_lateral, __painel_lateral] = useState(false)


  //Após montado, procura localmente os dados
  useEffect(() => {
    const usuario = JSON.parse(
      localStorage.getItem(`${prefixo}:DAN`)
    )
    if (usuario) {
      __perfil(usuario)
      __carregando(false)
      esta_logado()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`${prefixo}:DAN`,
      JSON.stringify(perfil))
  }, [perfil])

  function forceUpdate() {
    const usuario = JSON.parse(
      localStorage.getItem(`${prefixo}:DAN`)
    )
    if (usuario) {
      __perfil(usuario)
      __carregando(false)
    }
  }

  //Remove dos registros locais as credenciais
  async function sair() {
    localStorage.removeItem(`${prefixo}:DAN`)
    __logado(false)
    await revogar_acesso()
    await bosons.get('/conta/autorizacao/retirar_token')
    __perfil({})
    localStorage.removeItem(`${prefixo}:DAN`)
    let data = new Date(2010, 0, 1)
    let nova_data = data.toLocaleDateString()
    document.cookie = 'ada=; expires=' + nova_data + '; path=/'
    document.cookie = 'ada-token=; expires=' + nova_data + '; path=/'
    /* try {
      const { data: revogar } = await bosons({
        method: 'get',
        url: '/conta/autorizacao/retirar_token'
      })
  
      if (revogar.status === 'ERRO') {
        console.log(revogar.err)
      }
    } catch (err) {
      //console.log(err)
    } */

    Router.push('/')
  }

  async function criar_conta(dados: ENVELOPE_DE_CRIAR_CONTA): Promise<boolean> {
    const { data: resposta } = await bosons({
      method: 'POST',
      url: '/conta/criar',
      data: { registro: dados }
    })

    if (resposta && resposta.status === 'CRIADO') {

      __perfil(resposta.registro)

      localStorage.setItem(`${prefixo}:DAN`,
        JSON.stringify(resposta.registro))

      __logado(true)

      NotificationManager.info(`Seja Bem vindo!`, '(¯ ▽ ¯) ノ')

      if (resposta.registro.email_verificado) {

        return true

      } else {

        Router.push('/conta/verificar-email?email=' + resposta.registro.email)
        return true

      }

    } else if (resposta && resposta.erro) {
      NotificationManager.warning(resposta.erro, '┐ (˘, ˘) ┌')
      return false
    } else {
      return false
    }
  }

  async function fazer_login(usuario: string, senha: string): Promise<boolean> {
    try {
      const { data: resposta } = await bosons({
        method: 'post',
        url: '/conta/acessar',
        data: {
          email: usuario,
          chave: senha
        }
      })

      if (resposta) {

        if (resposta.status === 'ACESSO_PERMITIDO') {
          __perfil(resposta.registro)
          __logado(true)
          localStorage.setItem(`${prefixo}:DAN`,
            JSON.stringify(resposta.registro))

          if (resposta.registro.email_verificado) {

            return true

          } else {

            Router.push('/conta/verificar-email?email=' + resposta.registro.email)
            return true
          }

        } else if (resposta.status === 'ERRO') {
          NotificationManager.warning(resposta.erro, '┐ (¯ ヘ ¯) ┌')
        }
        return false

      } else {
        return false
      }

    } catch (err) {
      return false
    }
  }

  function esta_logado(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: resposta } = await bosons({
          method: 'get',
          url: '/conta/autorizacao/logado'
        })

        if (resposta && resposta.status === 'LOGADO') {
          __logado(true)
          __perfil(resposta.registro)
          resolve(true)
        } else {
          __logado(false)
          __perfil({})
          localStorage.removeItem(`${prefixo}:DAN`)
          resolve(false)
        }
      } catch (err) {
        console.log('ERRO ESTA_LOGADO AUT/CONTEXTO', err)
        __logado(false)
        resolve(false)
      }
    })
  }

  function pedido_em_aberto(): Promise<{ status: string, pedido_ID?: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: resposta } = await bosons({
          method: 'get',
          url: '/pedido/em_aberto',
          params: { DAN: perfil.DAN }
        })

        if (resposta && resposta.status === 'ENCONTRADO') {
          resolve({ status: 'ENCONTRADO', pedido_ID: resposta.pedido_ID })
        } else {
          console.log(resposta)
          resolve({ status: 'ERRO' })
        }
      } catch (err) {
        console.log(err)
        resolve({ status: 'ERRO' })
      }
    })
  }

  async function revogar_acesso(): Promise<boolean> {
    try {
      const { data: revogar } = await bosons({
        method: 'get',
        url: '/conta/autorizacao/revogar_token'
      })

      if (revogar.status === 'ERRO') {
        console.log(revogar.err)
        return false
      }

      return true

    } catch (err) {
      return false
      //console.log(err)
    }
  }

  function criar_modelo_payer_mercado_pago(cpf: string):
    PAYER_INTERFACE_MERCADO_PAGO {
    const payer = {
      name: perfil.nome,
      surname: perfil.sobrenome,
      email: perfil.email,
      identification: { type: "CPF", number: cpf },
      address: {
        street_name: perfil.endereco_padrao.endereco,
        street_number: parseInt(perfil.endereco_padrao.numero),
        zip_code: perfil.endereco_padrao.cep.replace(/\D/g, '')
      }

    }

    return (payer)
  }

  function verifica_disponibilidade_de_usuario(usuario: string):
    Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const { data: resposta } = await bosons({
        method: 'get',
        url: '/conta/existe/usuario',
        params: {
          usuario
        }
      })
      if (resposta.status === "DISPONIVEL") {
        resolve(true)
      } else {
        NotificationManager.info('', 'Usuário já cadastrado')
        //setMsg(resposta.erro)
        resolve(false)
      }
    })
  }

  function verifica_disponibilidade_de_numero(numero: string):
    Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const { data: resposta } = await bosons({
        method: 'get',
        url: '/conta/existe/numero',
        params: {
          numero
        }
      })
      if (resposta.status === "DISPONIVEL") {
        resolve(true)
      } else {
        NotificationManager.info('Esse número telefônico já está em uso', 'Ops, já cadastrado')
        //setMsg(resposta.erro)
        resolve(false)
      }
    })
  }

  function verifica_disponibilidade_de_email(email: string):
    Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const { data: resposta } = await bosons({
        method: 'get',
        url: '/conta/existe/email',
        params: {
          email
        }
      })
      if (resposta.status === "DISPONIVEL") {
        resolve(true)
      } else {
        NotificationManager.info('Esse endereço de email já está em uso', 'Ops, já cadastrado')
        //setMsg(resposta.erro)
        resolve(false)
      }
    })
  }

  function requisitar_meus_pedidos(): Promise<void> {
    return new Promise(async () => {

      try {

        const { data: resposta } = await bosons({
          method: 'GET',
          url: '/pedido/listar'
        })

        if (resposta) {
          if (resposta.status === 'ENCONTRADO') {
            __pedidos({
              cancelado: resposta.cancelado,
              processando: resposta.processando,
              finalizado: resposta.finalizado,
              devolvido: resposta.devolvido,
              todos: resposta.todos
            })
          } else if (resposta.status === 'VAZIO') {
            __pedidos({} as PEDIDOS_INTERFACE)
          }
        }
      } catch (err) {
        console.log(err)
      }

    })
  }

  function atualizar_status_de_pedidos(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {

        const { data: res } = await bosons({
          method: 'get',
          url: '/pedido/atualizar_pedidos_do_usuario'
        })

        if (res) {
          if (res.ok) {
            resolve(true)
          } else {
            resolve(false)
          }
        }

      } catch (err) {
        reject(err)
      }
    })
  }

  function atualizar_historico(
    historico: INTERFACE_DE_HISTORICO_DO_USUARIO
  ): Promise<void> {

    return new Promise(async (resolve, reject) => {

      try {

        const { data: res } = await bosons({
          method: 'post',
          url: '/conta/atualizar/historico',
          data: { historico }
        })

        if (res) {

          if (res.status === 'ATUALIZADO') {

            let usuario = perfil
            usuario.historico = res.registro.historico
            __perfil(usuario)
            localStorage.setItem(`${prefixo}:DAN`,
              JSON.stringify(perfil))
          }

        }
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }

  function atualizar_enderecos(dados: {
    endereco_padrao: INTERFACE_DE_ENDERECO_DE_USUARIO,
    enderecos: Array<INTERFACE_DE_ENDERECO_DE_USUARIO>
  }): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      const { data: res } = await bosons({
        method: 'post',
        url: '/conta/atualizar/endereco',
        data: {
          endereco_padrao: dados.endereco_padrao,
          enderecos: dados.enderecos
        }
      })

      if (res && res.status === "ATUALIZADO") {

        __perfil(res.registro)
        localStorage.setItem(`${prefixo}:DAN`,
          JSON.stringify(perfil))
        NotificationManager.success('', 'Atualizado com sucesso')
        resolve(true)

      } else {

        if (res.erro) {
          NotificationManager.info(res.erro, '	〣 (ºΔº) 〣')
        }

        resolve(false)
      }
    })
  }

  function atualizar_email(email: string): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      const { data: res } = await bosons({
        method: 'post',
        url: '/conta/atualizar/email',
        data: { email }
      })

      if (res && res.status === "ATUALIZADO") {

        __perfil(res.registro)
        localStorage.setItem(`${prefixo}:DAN`,
          JSON.stringify(perfil))
        NotificationManager.success('', 'Atualizado com sucesso')
        resolve(true)

      } else {

        if (res.erro) {
          NotificationManager.info(res.erro, '	〣 (ºΔº) 〣')
        }

        resolve(false)
      }
    })
  }

  function atualizar_dados_pessoais(
    nome: string, sobrenome: string, honorifico: string
  ): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      const { data: res } = await bosons({
        method: 'post',
        url: '/conta/atualizar/dados_pessoais',
        data: { nome, sobrenome, honorifico }
      })

      if (res && res.status === "ATUALIZADO") {

        __perfil(res.registro)
        localStorage.setItem(`${prefixo}:DAN`,
          JSON.stringify(perfil))
        NotificationManager.success('', 'Atualizado com sucesso')
        resolve(true)

      } else {

        if (res.erro) {
          NotificationManager.info(res.erro, '	〣 (ºΔº) 〣')
        }

        resolve(false)
      }
    })
  }

  function atualizar_usuario(
    usuario: string
  ): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      const { data: res } = await bosons({
        method: 'post',
        url: '/conta/atualizar/usuario',
        data: { usuario }
      })

      if (res && res.status === "ATUALIZADO") {

        __perfil(res.registro)
        localStorage.setItem(`${prefixo}:DAN`,
          JSON.stringify(perfil))
        NotificationManager.success('', 'Atualizado com sucesso')
        resolve(true)

      } else {

        if (res.erro) {
          NotificationManager.info(res.erro, '	〣 (ºΔº) 〣')
        }

        resolve(false)
      }
    })
  }

  function atualizar_telefone(
    telefone: string
  ): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      const { data: res } = await bosons({
        method: 'post',
        url: '/conta/atualizar/telefone',
        data: { telefone }
      })

      if (res && res.status === "ATUALIZADO") {

        __perfil(res.registro)
        localStorage.setItem(`${prefixo}:DAN`,
          JSON.stringify(perfil))
        NotificationManager.success('', 'Atualizado com sucesso')
        resolve(true)

      } else {

        if (res.erro) {
          NotificationManager.info(res.erro, '	〣 (ºΔº) 〣')
        }

        resolve(false)
      }
    })
  }

  async function verificar_email(
    email: string, codigo: string)
    : Promise<boolean> {

    try {

      const { data: resposta } = await bosons({
        method: 'post',
        url: '/conta/autorizacao/verificar_email',
        data: { email, codigo }
      })

      if (resposta) {

        if (resposta.status === 'VERIFICADO') {

          NotificationManager.success('', 'Email verificado!')
          return true

        } else if (resposta.status === 'ERRO') {

          NotificationManager.warning(resposta.erro, '┐ (¯ ヘ ¯) ┌')
          return false

        }

      } else {

        NotificationManager.warning('Algo de errado não deu certo, tente novamente mais tarde!', '┐ (¯ ヘ ¯) ┌')
        return false

      }

    } catch (err) {
      console.log(err)
    }
  }

  async function reenviar_codigo() {
    try {

      const { data: res } = await bosons({
        method: 'get',
        url: '/conta/autorizacao/reenviar_codigo'
      })

      if (res) {

        if (res.status === 'REENVIADO') {

          NotificationManager.info('', 'Codigo Re-enviado')

        } else {

          NotificationManager.info(res.erro, 'Oops')

        }
      }

    } catch (err) {
      NotificationManager.info('Tente novamente mais tarde', 'Oops')
    }
  }

  return (
    <ContextoAut.Provider value={{
      logado, esta_logado, carregando, pedidos,
      pedido_em_aberto, verifica_disponibilidade_de_usuario,
      perfil, revogar_acesso, verifica_disponibilidade_de_email,
      verifica_disponibilidade_de_numero, fazer_login,
      sair, criar_conta, requisitar_meus_pedidos, painel_lateral, __painel_lateral,
      __perfil, atualizar_status_de_pedidos, atualizar_historico,
      atualizar_email, atualizar_usuario, atualizar_dados_pessoais,
      forceUpdate, atualizar_enderecos, atualizar_telefone,
      criar_modelo_payer_mercado_pago, verificar_email, reenviar_codigo
    }}>
      {children}
    </ContextoAut.Provider>
  )
}



