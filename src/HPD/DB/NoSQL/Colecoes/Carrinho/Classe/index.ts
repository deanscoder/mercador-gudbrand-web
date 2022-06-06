import Carrinho from '../Modelo'
import {
  INTERFACE_DO_CARRINHO, INTERFACE_DO_CARRINHO_POR_LOJA,
  INTERFACE_DE_ITENS_NO_CARRINHO
} from '../Interface'
import Selecionar_Loja from '../../../../../../config/lojas'
import logistica_multilojas from '../../../../../../plugins/@kinesislake/logistica'

export default new class CARRINHO {

  // LISTAR TODOS INDEXES
  listar() {
    return Carrinho.find()
  }

  // ACHAR Carrinho ATRAVES DO DAN
  DAN(DAN: string) {
    return Carrinho.findOne({ DAN })
  }

  // ACHAR Carrinho ATRAVES DO CID
  CID(CID: string) {
    return Carrinho.findById(CID)
  }

  // ACHAR Carrinho ATRAVES DO nome DO criador
  criador(criador: string) {
    return Carrinho.find({ criador })
  }

  // ACHAR Carrinho ATRAVES DO DAN DO criador
  criador_ID(criador_ID: string) {
    return Carrinho.find({ criador_ID })
  }

  async atualizar_logistica(CID: string, cep: string) {
    const lista_carrinho = await Carrinho.findById(CID)
    let carrinho_temporario = lista_carrinho

    const promeca = new Promise((resolve, reject) => {
      lista_carrinho.carrinho.forEach(async (carrinho, index) => {

        const loja = Selecionar_Loja(carrinho.loja_ID)
        const endereco = await logistica_multilojas._obter_endereco(cep)

        if (endereco.localidade === loja.endereco.cidade) {

          carrinho_temporario.carrinho[index].frete = 10
          carrinho_temporario.carrinho[index].nome_frete = 'Entrega local'
          carrinho_temporario.carrinho[index].tempo_de_entrega = { min: 1, max: 1 }

        } else {

          const resultado = await logistica_multilojas._obter_menor_orcamento(
            {
              postal_code: loja.endereco.cep,
              address: loja.endereco.endereco,
              number: loja.endereco.numero
            },
            { postal_code: cep },
            {
              height: carrinho.media_de_dimensoes,
              width: carrinho.media_de_dimensoes,
              length: carrinho.media_de_dimensoes,
              weight: carrinho.peso_total
            }
          )
          carrinho_temporario.carrinho[index].frete = resultado.taxa_de_entrega
          carrinho_temporario.carrinho[index].nome_frete = resultado.nome
          carrinho_temporario.carrinho[index].tempo_de_entrega = resultado.tempo_de_entrega

        }

        console.log('----- temporario', carrinho_temporario.carrinho[index].frete)

      })

      resolve(true)

    })

    if (await promeca) {

      const dados = await Carrinho.findByIdAndUpdate(CID, carrinho_temporario,
        { new: true, useFindAndModify: false })

      const carrinho_servidor = dados.carrinho
      let carrinho = [] as Array<INTERFACE_DE_ITENS_NO_CARRINHO>
      let fretes = [] as Array<number>

      dados.carrinho.forEach(cart => {
        console.log(cart)
        carrinho = carrinho.concat(cart.carrinho)
        fretes.push(cart.frete)
      })

      return ({ carrinho_servidor, carrinho, fretes })

    } else {
      return ({ carrinho_servidor: [], carrinho: [], fretes: [] })

    }

  }

  async atualizar_frete(
    CID: string,
    loja_ID: number,
    frete: number,
    tempo_de_entrega: { min: number, max: number },
    nome_frete: string
  ) {

    const carrinho = await Carrinho.findById(CID)

    let temp = carrinho

    let index = temp.carrinho.findIndex(o => o.loja_ID === loja_ID)
    temp.carrinho[index].frete = frete
    temp.carrinho[index].tempo_de_entrega = tempo_de_entrega
    temp.carrinho[index].nome_frete = nome_frete

    return await Carrinho.findByIdAndUpdate(CID, { $set: { carrinho: temp.carrinho } },
      { new: true, useFindAndModify: false })
  }

  // INSERIR NOVO INDEX NO CARRINHO
  inserir(DAN: string, carrinho: Array<INTERFACE_DO_CARRINHO_POR_LOJA>) {
    var options = {
      upsert: true, new: true, setDefaultsOnInsert: true,
      useFindAndModify: false
    }

    if (DAN) {

      return Carrinho.findOneAndUpdate({ pertence_a: DAN }, {
        $set: {
          carrinho
        }
      }, options)

    } else {

      return Carrinho.create({
        carrinho
      })

    }
  }

  // ATUALIZA CARRINHO
  async atualizar(CID: string, dados: Array<INTERFACE_DO_CARRINHO_POR_LOJA>) {

    return await Carrinho.findByIdAndUpdate(CID, { carrinho: dados },
      { new: true, useFindAndModify: false })

  }

  async baixar_carrinho(DAN: string): Promise<{
    carrinho_servidor: Array<INTERFACE_DO_CARRINHO_POR_LOJA>,
    carrinho: Array<INTERFACE_DE_ITENS_NO_CARRINHO>,
    fretes: Array<number>
  } | boolean> {
    const dados = await Carrinho.findOne({ pertence_a: DAN })

    if (dados) {

      const carrinho_servidor = dados.carrinho
      let carrinho = [] as Array<INTERFACE_DE_ITENS_NO_CARRINHO>
      let fretes = [] as Array<number>
      dados.carrinho.forEach(cart => {
        carrinho.concat(cart.carrinho)
        fretes.push(cart.frete)
      })

      return ({ carrinho_servidor, carrinho, fretes })
    } else {
      return (false)
    }
  }

  async baixar_carrinho_via_CID(CID: string): Promise<{
    carrinho_servidor: Array<INTERFACE_DO_CARRINHO_POR_LOJA>,
    carrinho: Array<INTERFACE_DE_ITENS_NO_CARRINHO>,
    fretes: Array<number>

  } | boolean> {
    const dados = await Carrinho.findById(CID)

    if (dados) {

      const carrinho_servidor = dados.carrinho
      let carrinho = [] as Array<INTERFACE_DE_ITENS_NO_CARRINHO>
      let fretes = [] as Array<number>

      dados.carrinho.forEach(cart => {
        console.log(cart)
        carrinho = carrinho.concat(cart.carrinho)
        fretes.push(cart.frete)
      })

      return ({ carrinho_servidor, carrinho, fretes })
    } else {
      return (false)
    }
  }

  async deletar(DAN: string) {
    try {

      await Carrinho.deleteOne({ DAN }, null, function (erro) {
        if (erro) {
          console.log(erro)
          return false
        } else {
          return true
        }
      })

      return true

    } catch (Err) {
      return false
    }
  }

  async deletar_via_CID(CID: string) {
    try {

      await Carrinho.findByIdAndDelete(CID, null, function (erro) {
        if (erro) {
          console.log(erro)
          return false
        } else {
          return true
        }
      })

      return true

    } catch (Err) {
      return false
    }
  }
}