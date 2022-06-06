import React, { useEffect, useState } from 'react';
import * as css from './styles';
import { useZoe } from '../Zoe/Contextos/ZOE';
import { useRouter } from 'next/router'
import axios from 'axios'

interface Ponto {
  id: number
  nome: string
  endereco: string, bairro: string
  numero: string, referencia: string, estimativa: string
  taxa: number
}

interface LocaisDeRetirada {
  existe: boolean
  locais: Array<Ponto>
}

export default function FreteCarrinho({ subtotal }) {
  // ---------- ESTADOS
  const [meucep, setMeuCep] = useState('');
  const [inserido, __inserido] = useState(false);
  const [consulta, __consulta] = useState({} as any);
  const [taxa, __taxa] = useState(0);
  const Router = useRouter()

  // ---------- INVOCAÇÕES
  const { autenticacao: { perfil, logado },
    carrinho: { carrinho_servidor,
      inserir_no_servidor, atualizar_frete
    } } = useZoe()

  // ---------- EFEITOS
  useEffect(() => {
    inserir_no_servidor()
  }, [])

  useEffect(() => {
    if (perfil && perfil.endereco_padrao)
      REALIZAR_ORCAMENTO(perfil.endereco_padrao.cep.replace(/\D/g, ''))
  }, [perfil])

  // ---------- FUNÇÕES
  async function REALIZAR_ORCAMENTO(cep: string) {
    atualizar_frete(cep)
    const { data: res } = await axios({
      method: 'post',
      url: '/api/envio/orcamento_carrinho',
      data: {
        cep,
        pacotes: carrinho_servidor
      },
      headers: { 'DanGuard': 'auau14' }
    })

    if (res.status === 'DISPONIVEL') {

      let valor = 0
      res.frete.forEach(x => valor += x.taxa_de_entrega)

      __taxa(valor)
      __consulta(res.endereco)
      __inserido(true)

    } else {

      if (res.erro)
        console.log(res.erro)

      else
        console.log('Serviço indisponivel no momento!')

    }
  }

  function ORCAMENTO_DE_FRETE(e) {
    e.preventDefault()
    const cep = meucep.replace(/\D/g, '');
    REALIZAR_ORCAMENTO(cep)
  }


  if (!logado || (perfil && !perfil.endereco_padrao)) {
    return (
      <css.Container>
        {!inserido ? <form onSubmit={ORCAMENTO_DE_FRETE}>
          <input type="text" name="calcular_frete"
            placeholder="Calcular frete (CEP)"
            value={meucep}
            onChange={(e) => setMeuCep(e.target.value)} />
          <button type="submit">Consultar</button>
        </form> : <div>
            <p>{consulta && consulta.logradouro}, {consulta && consulta.cep}</p>
            <span>{consulta && consulta.bairro}, {consulta && consulta.localidade} - {consulta && consulta.uf}</span>
            <div id='trocar-enderecos' onClick={() => __inserido(false)}>tentar outro cep</div>
          </div>}
        { taxa > 0 && <css.Frete>Frete R$ {taxa.toFixed(2)}</css.Frete>}
      </css.Container>
    )
  } else {
    return (
      <css.Container>
        <h4>Endereço de entrega</h4>
        {perfil && perfil.endereco_padrao &&
          <div>
            <p>{perfil.endereco_padrao.endereco}, {perfil.endereco_padrao.numero}</p>
            <span>{perfil.endereco_padrao.cidade}, {perfil.endereco_padrao.cidade} - {perfil.endereco_padrao.uf}</span>
            <div id='trocar-enderecos' onClick={() => Router.push('/conta/enderecos')}>Trocar endereço</div>

          </div>
        }
        {perfil && !perfil.endereco_padrao && <p className="p-link"
          onClick={() => Router.push('/conta/enderecos')}>Adicionar endereço</p>}
        { taxa > 0 && <css.Frete>Frete R$ {taxa.toFixed(2)}</css.Frete>}
      </css.Container>
    )
  }
}