import axios from 'axios'

export default async function _obter_endereco(cep: string):
  Promise<VIACEP_RESPONSE_INTERFACE> {

  try {

    const { data: viacep } = await axios({
      method: 'GET',
      url: `https://viacep.com.br/ws/${cep}/json`
    })

    return viacep

  } catch (err) {

    console.log(err)
    return ({} as VIACEP_RESPONSE_INTERFACE)
  }
}

export interface VIACEP_RESPONSE_INTERFACE {
  logradouro: string,
  uf: string,
  complemento?: string,
  cep: string,
  bairro: string,
  localidade: string
}