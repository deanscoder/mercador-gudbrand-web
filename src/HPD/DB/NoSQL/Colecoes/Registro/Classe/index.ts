import { INTERFACE_DE_HISTORICO_DO_USUARIO, INTERFACE_DE_REGISTRO_DO_USUARIO } from '../Interface'
import Registro from '../Modelo'
import bcrypt from 'bcrypt'

export default new class REGISTRO {

  // LISTAR TODOS REGISTROS
  listar() {
    return Registro.find()
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario
        telefone historico nome sobrenome versao_token versao_deslogar email_verificado`
      )
  }

  // EFETUAR LOGIN
  solicitar_acesso(autenticacao: string) {

    return Registro.findOne({
      $or: [
        { 'email': autenticacao },
        { 'usuario': autenticacao },
        { 'telefone': autenticacao }
      ]
    })

  }

  // ACHAR REGISTRO ATRAVES DO DAN
  DAN(DAN: string) {
    return Registro.findOne({ DAN })
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario
      telefone historico nome sobrenome versao_token versao_deslogar email_ADA email_verificado`
      )
  }

  // ACHAR REGISTRO ATRAVES DO DAN e RETORNA TODO DOC
  DAN_com_senha(DAN: string) {
    return Registro.findOne({ DAN })

  }

  // ACRESCER VERSAO
  add_versao(DAN: string, versao: number) {
    return Registro.findOneAndUpdate({ DAN }, {
      $set: {
        versao_token: versao + 1
      }
    },
      { new: true })
  }

  // ADICIONA HISTORICO
  async add_historico(DAN: string, historico: INTERFACE_DE_HISTORICO_DO_USUARIO) {

    let usuario = await Registro.findOne({ DAN })

    return Registro.findOneAndUpdate({ DAN }, {
      $set: {
        historico: usuario.historico.push(historico)
      }
    },
      { new: true })
      .select(
        `historico`
      )
  }

  // INSERIR NOVO REGISTRO DE USUARIO
  async inserir(usuario: INTERFACE_DE_REGISTRO_DO_USUARIO) {

    usuario.senha = await bcrypt.hash(usuario.senha, 10)

    return Registro.create(usuario)
  }

  // INSERIR NOVOS REGISTROS DE USUARIOS
  // ATRAVES DE ARRAY
  inserir_varios(usuarios: Array<INTERFACE_DE_REGISTRO_DO_USUARIO>) {

    usuarios.forEach(async usuario =>
      usuario.senha = await bcrypt.hash(usuario.senha, 10))

    return Registro.create(usuarios)
  }

  // CONFERE SE JA EXISTE UM USUARIO COM ESSE NOME
  usuario_existe(nome: string) {
    return Registro.findOne({ usuario: nome })
  }

  // CONFERE SE JA EXISTE UM TELEFONE REGISTRADO
  telefone_existe(tel: string) {
    return Registro.findOne({ telefone: tel })
  }

  // CONFERE SE JA EXISTE UM EMAIL REGISTRADO
  async email_existe(email: string) {
    return await Registro.findOne({ email })
  }

  // ATUALIZA SOMENTE NOME E SOBRENOME DO USUARIO
  atualizar_dados_pessoais(DAN: string, dados) {
    var dados_atualizados = {
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      honorifico: dados.honorifico
    }

    return Registro.findOneAndUpdate({ DAN }, { $set: dados_atualizados },
      { new: true })
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario
          telefone historico nome sobrenome versao_token versao_deslogar email_verificado`
      )

  }

  // ATUALIZA SOMENTE TELEFONE DO USUARIO
  atualizar_telefone(DAN: string, telefone: string) {

    return Registro.findOneAndUpdate({ DAN }, { $set: { telefone } },
      { new: true })
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario
          telefone historico nome sobrenome versao_token versao_deslogar email_verificado`
      )

  }

  // ATUALIZA SOMENTE O ENDEREÇO PADRÃO
  // E LISTA DE ENDEREÇOS DO USUARIO
  atualizar_endereco(DAN: string, dados) {
    var dados_atualizados = {
      endereco_padrao: dados.endereco_padrao,
      enderecos: dados.enderecos
    }

    return Registro.findOneAndUpdate({ DAN }, { $set: dados_atualizados },
      { new: true })
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario
          telefone historico nome sobrenome versao_token versao_deslogar email_verificado`
      )

  }

  // VERIFICAR EMAIL
  async verificar_email(DAN: string, codigo: string) {
    const usuario = await Registro.findOne({ DAN })

    if (usuario) {

      if (usuario.email_verificado) {

        return true

      }

      if (usuario.email_ADA === codigo) {

        await Registro.updateOne({ DAN }, {
          $set: {
            email_verificado: true, email_ADA: ''
          }
        })

        return true

      } else {

        return false

      }
    }

  }

  // ATUALIZA SOMENTE O EMAIL VINCULADO AO DAN
  // TORNA EMAIL NÃO VERIFICADO
  atualizar_dados_de_seguranca_email(DAN: string, email: string) {
    return Registro.findOneAndUpdate({ DAN }, { $set: { email, email_verificado: false } },
      { new: true })
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario
          telefone historico nome sobrenome versao_token versao_deslogar email_verificado`
      )
  }

  // ATUALIZA SOMENTE O NOME DE USUARIO
  atualizar_dados_de_seguranca_usuario(DAN: string, usuario: string) {
    return Registro.findOneAndUpdate({ DAN }, { $set: { usuario } },
      { new: true })
      .select(
        `DAN email honorifico nCompleto endereco_padrao enderecos avaliacoes usuario chave_reserva
          telefone historico nome sobrenome versao_token versao_deslogar email_verificado`
      )
  }

  // ACHA USUARIO PARA RECUPERAÇAO DE SENHA
  recuperar_acesso(autenticacao: string) {
    return Registro.findOne({
      $or: [
        { 'email': autenticacao },
        { 'usuario': autenticacao },
        { 'telefone': autenticacao }
      ]
    })
  }
}