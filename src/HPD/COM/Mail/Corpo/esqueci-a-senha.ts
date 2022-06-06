const esqueci_minha_senha = (usuario, senha) =>
  `
<html>
<body style="margin: 0;padding: 0;">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500;1,300&display=swap" rel="stylesheet">
  
  <table style="width: 100%;text-align: center;background: transparent;font-family: Roboto;
  height: 100%;font-size: 1.2em;">
    <tr>
      <td>
        <h1>Txaram nova senha chegou!</h1>
        <h2>${senha}</h2>
        <p>Olá ${usuario.nCompleto}, eu sou a Zoe a assistente do Mercado Gudbrand, eu mesma gerei esta senha aleatória para ser a sua chave reserva, 
        assim que efetuar o seu acesso em nosso site com seu usuario ou email você agora pode usar essa nova senha para acessar, 
        é extremamente recomendado você trocar a senha assim que logar no <b>Painel do Usuário</b>, basta por essa senha aleatoria como sua senha antiga e criar uma novinha em folha 
        é bem rápido.
        </p>
        <h5>O MERCADO GUDBRAND agradece a sua atenção!</h5>
      </td>
    </tr>
  </table>

 
</body>
</html>
`

export default esqueci_minha_senha