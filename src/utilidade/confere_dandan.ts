import ACESSO_CONCEDIDO from "../config/Autorizacao/acesso_concedido"
import ATUALIZAR_TOKEN from "../config/Autorizacao/atualizar_token_de_acesso"

export default async function dandan(ada: string, re_ada?: string): 
  Promise<DANDAN_INTERFACE> {
  
  const { acesso, registro } = await ACESSO_CONCEDIDO(ada)

  if (!acesso && re_ada) {
    console.log('Entrou no primeiro if do confere dan')
    const { re_token, token, invalido, registro } = await ATUALIZAR_TOKEN(re_ada)
    console.log('Invalido: ', invalido)
    if (invalido) {
      return ({ acesso: false })
    }

    return ({ acesso: true, token, re_token, atualizado: true, registro })
  }
  
  if (acesso) {
    return ({ acesso, registro })
  } else {
    return ({ acesso: false })
  }
}

interface DANDAN_INTERFACE {
  re_token?: string
  token?: string
  acesso: boolean
  atualizado?: boolean
  registro?: any
}