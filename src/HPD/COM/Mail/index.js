import nodemailer from 'nodemailer'
import CORPO_DE_EMAIL from './Corpo'

const from = '"Mercador Gudbrand" <nao-responder@gudbrand.com.br>'

function inicializador() {

  return nodemailer.createTransport({

    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }

  })

}

export async function email_de_verificacao(usuario, codigo) {

  const transportador = inicializador()

  const email = {
    from,
    to: usuario.email,
    subject: "Verifique o seu Email",
    html: CORPO_DE_EMAIL.verificar_email(usuario,
      codigo)
  }

  const Sender = () => new Promise((resolve, reject) => {

    transportador.sendMail(email)
      .then(response => {

        transportador.close();
        return resolve(response);

      })
      .catch(error => {

        transportador.close();
        return reject(error);

      });
  })

  return await Sender()

}

export async function email_de_recuperacao(usuario, senha) {

  const transportador = inicializador()

  const email = {
    from,
    to: usuario.email,
    subject: "Esqueci Minha Senha - Chave reserva",
    html: CORPO_DE_EMAIL.esqueci_minha_senha(usuario, senha)
  }

  const Sender = () => new Promise((resolve, reject) => {

    transportador.sendMail(email)
      .then(response => {

        transportador.close();
        return resolve(response);

      })
      .catch(error => {

        transportador.close();
        return reject(error);

      });
  })

  return await Sender()

}

export async function email_de_pedido_aprovado(usuario, livro) {

  const transportador = inicializador()
  const email = {
    from,
    to: usuario.email,
    subject: `Sua compra foi aprovada!`,
    html: CORPO_DE_EMAIL.aprovado(usuario, Itens(livro.carrinho), livro)
  }

  const Sender = () => new Promise((resolve, reject) => {

    transportador.sendMail(email)
      .then(response => {

        transportador.close();
        return resolve(response);

      })
      .catch(error => {

        transportador.close();
        return reject(error);

      });

  })

  return await Sender()

}

const Itens = (x) => {
  let lista = ``
  x.map(item => {
    lista += `<li><b>${item.quantidade}x</b> ${item.nome} - <b>R$ ${item.preco}</b></li> \n`
  })

  const pacote = `
  <ul style="list-style: none">
  ${lista}
  </ul>
  `
  return (pacote)
}

const EMAIL = {
  email_de_verificacao, email_de_recuperacao, email_de_pedido_aprovado
}

export default EMAIL