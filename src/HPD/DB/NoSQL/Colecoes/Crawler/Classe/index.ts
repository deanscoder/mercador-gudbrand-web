import Crawler from '../Modelo'
import { INTERFACE_DO_CRAWLER } from '../Interface'
import Selecionar_Loja from '../../../../../../config/lojas'
import slugify from 'slugify'

export default new class CRAWLER {

  // LISTAR TODOS INDEXES
  async listar() {
    return await Crawler.find({})
  }

  // ACHAR Crawler ATRAVES DO tipo
  tipo(tipo: string) {
    return Crawler.find({ tipo: tipo })
  }

  // ACHAR Crawler ATRAVES DA palavra_chave
  palavra_chave(palavra_chave: string) {
    return Crawler.find({ palavra_chave })
  }

  // BUSCA AVANÇADA
  buscar(tipo: string, query: string) {
    return Crawler.find({
      tipo, $or: [
        { 'nome': query },
        { 'slug': query },
        { 'palavras_chave': query },
        { 'palavras_chute': query }
      ]
    }, null, { limit: 10 })
  }

  buscar_por_texto(query: any) {
    return Crawler.aggregate([query])
  }

  // BUSCA AVANÇADA COM PAGINAÇÃO
  // POR TIPO OU TODOS
  async buscar_com_paginacao(
    tipo: string, query: string, pagina: number, por_pagina: number
  ) {
    if (tipo !== 'TODOS') {

      const total_de_resultados = await Crawler.count({
        tipo, $or: [
          { 'slug': query },
          { 'categorias': query },
          { 'tags': query },
          { 'marcas': query },
          { 'departamentos': query }
        ]
      })

      const total_de_paginas = Math.round(total_de_resultados / por_pagina)

      const resultado = await Crawler.find({
        tipo, $or: [
          { 'palavras_chave': query },
          { 'nome': query },
          { 'slug': query },
          { 'categorias': query },
          { 'tags': query },
          { 'marcas': query },
          { 'departamentos': query }
        ]
      }, null, {
        skip: (pagina * por_pagina) - por_pagina,
        limit: por_pagina
      })

      return ({ resultado, pagina, total_de_paginas })
    } else {
      const total_de_resultados = await Crawler.count({
        $or: [
          { 'slug': query },
          { 'categorias': query },
          { 'tags': query },
          { 'marcas': query },
          { 'departamentos': query }
        ]
      })

      const total_de_paginas = Math.round(total_de_resultados / por_pagina)

      const resultado = await Crawler.find({
        $or: [
          { 'slug': query },
          { 'categorias': query },
          { 'tags': query },
          { 'marcas': query },
          { 'departamentos': query }
        ]
      }, null, {
        skip: (pagina * por_pagina) - por_pagina,
        limit: por_pagina
      })

      return ({ resultado, pagina, total_de_paginas })
    }
  }

  // INSERIR NOVO INDEX NO CRAWLER
  inserir(index: INTERFACE_DO_CRAWLER) {
    return Crawler.create(index)
  }

  // INSERIR NOVOS INDEXES NO CRAWLER
  // ATRAVES DE ARRAY
  inserir_varios(indexes: Array<INTERFACE_DO_CRAWLER>) {
    return Crawler.create(indexes)
  }

  // ATUALIZA INDEX DE PRODUTO VINDO DO WOOCOMMERCE
  async atualizar_index_do_produto_woocommerce(PID: number, dados) {
    var options = {
      upsert: true, new: true, setDefaultsOnInsert: true,
      useFindAndModify: false
    }
    const LOJA = Selecionar_Loja(dados.loja ? dados.loja[0].id : 129);
    let imagens = [], palavras_normalizadas = '';

    if (dados.images) {
      imagens = dados.images.map(x => ({
        src: x.src, nome: x.name, alt: x.alt
      }))
    }

    console.log(dados.departamentos)

    if (dados.tags && dados.tags.length) {

      let lista_de_tag = dados.tags.map(x =>
        slugify(x.name, { lower: true }).replace('-', ' '))

      palavras_normalizadas = palavras_normalizadas + ' ' +
        lista_de_tag.join(' ')

    }

    if (dados.departamentos && dados.departamentos.length) {

      let lista_de_departamentos = dados.departamentos.map(x =>
        slugify(x.name, { lower: true }).replace('-', ' '))

      palavras_normalizadas = palavras_normalizadas + ' ' +
        lista_de_departamentos.join(' ')

    }

    if (dados.marcas && dados.marcas.length) {

      let lista_de_marcas = dados.marcas.map(x =>
        slugify(x.name, { lower: true }).replace('-', ' '))

      palavras_normalizadas = palavras_normalizadas + ' ' +
        lista_de_marcas.join(' ')

    }

    if (dados.categories && dados.categories.length) {

      let lista_de_categories = dados.categories.map(x =>
        slugify(x.name, { lower: true }).replace('-', ' '))

      palavras_normalizadas = palavras_normalizadas + ' ' +
        lista_de_categories.join(' ')

    }

    let dados_atualizados = {
      PID: dados.id,
      LID: LOJA.LID,
      nome: dados.name,
      slug: dados.slug,
      tags: dados.tags ? dados.tags.map(tag =>
        slugify(tag.name as string, { lower: true })) : [''],
      departamentos: dados.departamentos ? dados.departamentos.map(dep =>
        slugify(dep.name as string, { lower: true })) : [''],
      marcas: dados.marcas ? dados.marcas.map(marca =>
        slugify(marca.name as string, { lower: true })) : [''],
      categorias: dados.categories ? dados.categories.map(
        categoria => slugify(categoria.name as string, { lower: true })) : [''],
      loja: LOJA.nome,
      imagens: imagens,
      palavras_chave: palavras_normalizadas,
      preco: dados.price ? dados.price : 'variavel',
      regiao: { localidade: LOJA.endereco.cidade, UF: LOJA.endereco.uf }
    }

    return await Crawler.findOneAndUpdate({ PID }, dados_atualizados,
      options)

  }

  async deletar_index_do_produto_woocommerce(PID: number) {
    try {

      let resposta = await Crawler.deleteOne({ PID }, null, function (erro) {
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