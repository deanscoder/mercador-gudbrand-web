import { NextApiRequest, NextApiResponse } from "next";
import Selecionar_Loja from "../../../../config/lojas";
import { MerchConnect } from "../../../../config/Woocommerce";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes';
import { INTERFACE_DE_ITENS_NO_CARRINHO } from "../../../../HPD/DB/NoSQL/Colecoes/Carrinho/Interface";
import dandan from "../../../../utilidade/confere_dandan";
var Cookies = require('cookies')

export default function inserir_no_carrinho(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return new Promise(async (resolve, reject) => {

      const cookies = new Cookies(req, res)

      // PEGA O TOKEN DE ATUALIZAÇÃO
      const ada_token = cookies.get('ada-token')
      const ada = cookies.get('ada')

      // TESTA SE O ACESSO ESTÁ PERMITIDO
      const {
        acesso, atualizado, token, re_token, registro
      } = await dandan(ada as string, ada_token)


      const cookie_configuracao = {
        httpOnly: true, path: '/', sameSite: 'lax',
        maxAge: 604800000, domain: '.gudbrand.com.br', secure: true
      }

      const cookie_configuracao_dev = {
        httpOnly: true, path: '/', sameSite: 'lax',
        maxAge: 604800000
      }

      // SE O TOKEN FOI ATUALIZADO
      // SETA O COOKIE NOVAMENTE
      if (atualizado) {
        cookies.set('ada-token', re_token,
          process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
        )

        cookies.set('ada', token,
          process.env.SANDBOX === 'true' ? cookie_configuracao_dev : cookie_configuracao
        )
      }

      const { carrinhos } = req.body as { carrinhos: Array<INTERFACE_DE_ITENS_NO_CARRINHO> }

      if (!carrinhos.length) {

        res.json({ status: 'ERRO', erro: 'Carrinho vazio!' })

      }

      try {

        const carrinhos_validados = await passar_pela_retifica(carrinhos)


        // CRIA LISTA DE LOJAS QUE APARECEM
        // NO CARRINHO RECEBIDO
        const lojas_separadas = carrinhos.map(x => x.lojas[0].id)
        const lojas_no_carrinho = lojas_separadas.filter((ele, pos) => {
          return lojas_separadas.indexOf(ele) === pos
        })


        let carrinho = lojas_no_carrinho.map(x => {
          // LISTA DE ITENS NO CARRINHO
          // QUE PERTENCE A ESSA LOJA
          let lista = carrinhos.filter((y) => y.lojas[0].id === x)

          if (lista) {

            let loja_selecionada = Selecionar_Loja(x)

            let media_de_dimensoes = dimensao_do_pacote(lista)
            let peso_total = 0
            lista.forEach(item => peso_total += item.peso)

            return ({
              loja: loja_selecionada.nome,
              loja_ID: loja_selecionada.LID,
              media_de_dimensoes,
              peso_total,
              carrinho: lista
            })
          }
        })

        //let resposta

        /* if (carrinho) {

          if (registro) {

            resposta = await REPO.CARRINHO.inserir(registro.DAN, carrinho)

          } else {

            resposta = await REPO.CARRINHO.inserir('', carrinho)

          }

        } */

        if (carrinho) {

          res.json({
            status: 'SUCESSO',
            carrinho: carrinhos,
            carrinho_servidor: carrinho,
            CID: 'sem-por-enquanto'
          })

        } else {

          res.json({ status: 'ERRO', erro: 'Serviço indisponível!' })
        }

      } catch (err) {
        console.log(err)
        res.json({ status: 'ERRO', erro: 'Serviço indisponível!' })

      }

      resolve(res)

    })

  } else {

    res.json({ status: 'ERRO', erro: 'Verbo inválido!' })

    return res
  }

}

function dimensao_do_pacote(carrinho): number {
  let volume = 0, metrica = 0
  for (var i = 0; i < carrinho.length; i++) {
    volume += (
      parseInt(carrinho[i].dimensoes.height) * parseInt(carrinho[i].dimensoes.length) * parseInt(carrinho[i].dimensoes.width)
    )
  }
  metrica = Math.pow(volume, 1 / 3)
  console.log('media de dimensao: ', metrica)
  return metrica
}

async function passar_pela_retifica(
  carrinhos: Array<INTERFACE_DE_ITENS_NO_CARRINHO>
): Promise<Array<INTERFACE_DE_ITENS_NO_CARRINHO>> {

  let lista = []
  let lista_de_id = carrinhos.map(x => ({ VID: x.V_ID, ID: x.ID }))
  let nova_lista = carrinhos

  lista_de_id.forEach(async x => {

    if (x.VID && x.VID !== undefined) {

      // COLETA VARIANTE
      try {

        const { data: resposta, headers: head } = await MerchConnect.get(
          'products/' + x.ID + '/variations/' + x.VID)

        if (resposta) {

          lista.push(resposta)
          let temp = nova_lista.filter(o => x.VID === resposta.id)

          if (temp) {
            let index = nova_lista.findIndex(o => x.VID === resposta.id)
            nova_lista[index].preco = parseFloat(resposta.price)
            nova_lista[index].dimensoes = resposta.dimensions
          }
        }

      } catch (Err) {
        console.log(Err)
      }



    } else {

      // COLETA SIMPLES
      try {

        const { data: resposta, headers: head } = await MerchConnect.get(
          'products/' + x.ID)

        if (resposta) {

          lista.push(resposta)
          let temp = nova_lista.filter(o => x.VID === resposta.id)

          if (temp) {
            let index = nova_lista.findIndex(o => x.VID === resposta.id)
            nova_lista[index].preco = parseFloat(resposta.price)
            nova_lista[index].dimensoes = resposta.dimensions
          }
        }

      } catch (Err) {
        console.log(Err)
      }


    }
  })



  if (lista) {

    return nova_lista

  } else {
    console.log('nada')
    return carrinhos
  }
}