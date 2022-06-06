const verificar_email = (usuario, codigo) =>
  `
<html>
<body style="margin: 0;padding: 0;">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500;1,300&display=swap" rel="stylesheet">
  
  <table style="width: 100%;text-align: center;background: transparent;font-family: Roboto;
  height: 100%;font-size: 1.2em;">
    <tr>
      <td>
        <h1>Seu código de verificação chegou, Uhul!</h1>
        <h2>${codigo}</h2>
        <p>Olá ${usuario.honorifico ? usuario.honorifico + ' ' + usuario.nome : usuario.nCompleto}, eu sou a Zoe a assistente do Mercado Gudbrand, por favor use esse código para 
        verificar seu endereço de email em nosso banco de dados.
        </p>
        <p>Por que isso é necessário? Bom, eu sei que é chato, mas a gente precisa 
        para em caso de algum infortúnio com suas compras ou até mesmo acesso a sua conta 
        nós possamos te ajudar de maneira mais rápida, sem um meio de contato fica beeem mais 
        difícil não acha? Desde já obrigadinha pela sua compreensão! </p>
        <h5>MERCADO GUDBRAND agradece a sua atenção!</h5>
      </td>
    </tr>
  </table>

 
</body>
</html>
`

export default verificar_email