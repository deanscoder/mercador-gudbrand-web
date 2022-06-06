import { NextApiRequest, NextApiResponse } from "next";
import ConConfig from "../../../../config/base_de_requisicao";
import { MerchConnect } from '../../../../config/Woocommerce'
import { WooProduto } from "../../cpd/interfaces/Artigo/woo_product";

export default async function Pesquisar (
  req : NextApiRequest,
  res : NextApiResponse
) {
  const { p } = req.query
  if (req.method === 'GET')
  {
    let listaFixa = []
    let pg = 0, totalPages = 0;
    return new Promise(async (resolve, reject) => {
      const Con = MerchConnect
      let categorias = [], tags = [], produtos = []
      do {
        const { data: resposta, headers: header } = await Con.get('products', {
          search: p, page: ++pg, ...ConConfig  
        })
        //console.log(' --- Reposta das req: --- ', header, resposta)
        totalPages = header["x-wp-totalpages"]
        if (resposta)
        { produtos = resposta }
      } while (pg < totalPages)
      pg = 0; totalPages = 0;

      do {
        const { data: resposta, headers: header } = await Con.get('products/categories', {
          search: p, page: ++pg, per_page: 50  
        })
        //console.log(' --- Reposta das req: --- ', header, resposta)
        totalPages = header["x-wp-totalpages"]
        if (resposta)
        { 
          resposta.forEach(el => categorias.push(el))
        }
      } while (pg < totalPages)
      pg = 0; totalPages = 0;

      do {
        const { data: resposta, headers: header } = await Con.get('products/tags', {
          search: p, page: ++pg, per_page: 50  
        })
        //console.log(' --- Reposta das req: --- ', header, resposta)
        totalPages = header["x-wp-totalpages"]
        if (resposta)
        { 
          resposta.forEach(el => tags.push(el))
        }
      } while (pg < totalPages)
      pg = 0; totalPages = 0;

      categorias.forEach(async el => {
        do {
          const { data: resposta, headers: header } = await Con.get('products', {
            category: el.id, page: ++pg, ...ConConfig
          })
          //console.log(' --- Reposta das req: --- ', header, resposta)
          totalPages = header["x-wp-totalpages"]
          if (resposta)
          { 
            produtos = resposta
          }
        } while (pg < totalPages)
      })
      pg = 0; totalPages = 0;

      tags.forEach(async el => {
        do {
          const { data: resposta, headers: header } = await Con.get('products', {
            tag: el.id, page: ++pg, ...ConConfig
          })
          //console.log(' --- Reposta das req: --- ', header, resposta)
          totalPages = header["x-wp-totalpages"]
          if (resposta)
          { 
            produtos = resposta
          }
        } while (pg < totalPages)
      })
      pg = 0; totalPages = 0;
      console.log('Categorias ->', categorias)
      console.log('Tags ->', tags)
      if (produtos.length !== 0) {
        res.json({status: 'SUCESSO', produtos})
        resolve(res)
      }
      res.json({status: 'ERRO', erro: 'Serviço indisponível!'})
      resolve(res)
    })
  } else { return res.status(401) }
}