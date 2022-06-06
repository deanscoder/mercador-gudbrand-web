import { NextApiRequest, NextApiResponse } from "next"

const REDIRECIONAMENTO_SUCESSO = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.writeHead(302, { location: '/caixa/processo_de_pagamento/sucesso'} )
  res.end()
  
  return { }
}

export default REDIRECIONAMENTO_SUCESSO