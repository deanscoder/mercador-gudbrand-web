import { NextApiRequest, NextApiResponse } from "next"

const REDIRECIONAMENTO_DIVERGENTE = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.writeHead(302, { location: '/caixa/processo_de_pagamento/whatever'} )
  res.end()
  
  return { }
}

export default REDIRECIONAMENTO_DIVERGENTE