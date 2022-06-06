const aprovado = (usuario, carrinho, livro) =>
  `
<html>
<body style="margin: 0;padding: 0;">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500;1,300&display=swap" rel="stylesheet">
  
  <table style="width: 100%;text-align: center;background: transparent;font-family: Roboto;
  height: 100%;font-size: 1.2em;">
    <tr>
      <td>
        <h1>Meus parabéns seu pedido de compra foi aprovado!</h1>
        <h2>Nós já recebemos o seu pagamento e em breve você receberá seu comprovante de compra e código de rastreio neste endereço de email.</h2>
        <p>Olá ${usuario.honorifico ? usuario.honorifico + ' ' + usuario.nome : usuario.nCompleto}, eu sou a Zoe a assistente do Mercado Gudbrand, a sua compra foi devidamente ordenada, 
        e em breve você vai receber o seu código de rastreio do pacote que também estará disponível em nosso site, na seção de <b>"Historico de Compras"</b>,
         muito obrigada pela preferência e por dar esse suporte a nosso pequeno negócio!
        </p>
        <p>Precisando de qualquer informação, ou precise de ajuda pode deixar com a gente, entre em contato pelos nossos canais de atendimento e ficaremos felizes em te ajudar!</p>
        ${carrinho}
        <h5>MERCADO GUDBRAND</h5>
      </td>
    </tr>
  </table>

 
</body>
</html>
`

export default aprovado