import React, { useEffect, useState } from 'react';
import * as css from './styles';
import axios from 'axios';
import { useZoe } from '../Zoe/Contextos/ZOE';
import { useRouter } from 'next/router'

export default function Frete({ data, quantidade }) {
  // ---------- ESTADOS
  const [meucep, setMeuCep] = useState('');
  const [msg, __MSG] = useState('');
  const [taxa, __taxa] = useState(0);
  const [inserido, __inserido] = useState(false);
  const [consulta, __consulta] = useState({} as any);

  // ---------- INVOCAÇÕES
  const Router = useRouter()
  const { autenticacao: { perfil, logado },
    carrinho: { selecionado } } = useZoe()

  // ---------- EFEITOS
  useEffect(() => {
    if (perfil && logado && perfil.endereco_padrao)
      REALIZAR_ORCAMENTO(perfil.endereco_padrao.cep.replace(/\D/g, ''))
  }, [perfil])

  // ---------- FUNÇÕES
  async function REALIZAR_ORCAMENTO(cep: string) {

    let dimensoes = {} as any

    if (selecionado) {
      if (selecionado.variante) {
        if (selecionado.variante.dimensions) {
          dimensoes = selecionado.variante.dimensions
        }
      }
    }

    const { data: res } = await axios({
      method: 'post',
      url: '/api/envio/orcamento',
      data: {
        cep,
        peso: dimensoes ? dimensoes.weight : parseFloat(data.weight) * quantidade,
        dimensoes: {
          height: dimensoes ? dimensoes.height : data.dimensions.height,
          width: dimensoes ? dimensoes.width : data.dimensions.width,
          length: dimensoes ? dimensoes.length : data.dimensions.length
        },
        loja_ID: selecionado.lojaID ? selecionado.lojaID : 139
      },
      headers: { 'DanGuard': 'auau14' }
    })

    if (res.status === 'DISPONIVEL') {

      __consulta(res.endereco)
      __taxa(res.frete.taxa)
      __MSG(`${res.frete.nome} - De apróx. ${res.frete.tempo_de_entrega.max} dias úteis após a postagem`)
      __inserido(true)

    } else {

      if (res.erro)
        __MSG(res.erro)

      else
        __MSG('Serviço indisponivel no momento!')

    }
  }

  function ORCAMENTO_DE_FRETE(e) {

    e.preventDefault()
    const cep = meucep.replace(/\D/g, '');

    if (cep.length === 8)
      REALIZAR_ORCAMENTO(cep)
    else
      __MSG('Cep inválido')
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
        { msg && <css.Msg>{msg}<br /></css.Msg>}
      </css.Container>
    )
  } else {
    return (
      <css.Container>
        <h4>Endereço de entrega</h4>
        <div>
          <p>{perfil.endereco_padrao.endereco}, {perfil.endereco_padrao.numero}</p>
          <span>{perfil.endereco_padrao.cidade}, {perfil.endereco_padrao.cidade} - {perfil.endereco_padrao.uf}</span>
          <div id='trocar-enderecos' onClick={() => Router.push('/conta/enderecos')}>Trocar endereço</div>
        </div>
        { taxa > 0 && <css.Frete>Frete R$ {taxa.toFixed(2)}</css.Frete>}
        { msg && <css.Msg>{msg}<br /></css.Msg>}
      </css.Container>
    )
  }
}