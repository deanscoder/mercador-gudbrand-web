import * as css from './styles'
import { useZoe } from '../../../Contextos/ZOE'
import { useState, useEffect } from 'react'
import { FiTrash } from 'react-icons/fi'
import Link from 'next/link'
import { FiPocket } from 'react-icons/fi'

export default function Sacola() {
  const [renderizar, setRender] = useState(false)

  const {
    carrinho: { carrinho, deletar, valor_total, quantidade_total },
    autenticacao: { perfil },
    zoeUI: { confUI }
  } = useZoe()


  return (
    <css.Container>
      <css.Meta>

        <h1>Olá {perfil ? perfil.nome : 'visitante'}</h1>
        {
          carrinho.length > 0 ?
            <p>Aqui estão algumas informações sobre a sua sacola</p>
            :
            <p>Hmm, sua sacola ainda está vazia!</p>
        }
        <div>

          {
            carrinho.length !== 0 ?

              <section>
                <div>{carrinho.length} Produto{carrinho.length > 1 ? 's ' : ' '}
        com {quantidade_total()} ite{quantidade_total() > 1 ? 'ns ' : 'm '} escolhidos ao todo.</div>
                <css.Psiu>
                  Podes optar em até 12x de R$ {(valor_total() / 12).toFixed(2)}
                </css.Psiu>
              </section>

              :

              null
          }
          <css.Valor>
            Valor total: R$ {valor_total().toFixed(2)}
          </css.Valor>
        </div>

        {
          carrinho.length > 0 ?

            <css.Finalizar onClick={() => setTimeout(() => confUI('zoe', false), 1000)}>
              <Link href='/mercado/pagar'>
                <a>
                  <FiPocket />
          Finalizar Compra
        </a>
              </Link>
            </css.Finalizar>

            :
            null
        }

      </css.Meta>

      {
        quantidade_total() > 0 ?

          <css.Data>

            <ul>
              {
                carrinho.map(item => <li key={item.V_ID ? item.V_ID : item.ID}>
                  <Link href={'/item/' + item.url}>
                    <a>
                      <css.Foto
                        url={item.thumbnail}
                      >

                      </css.Foto>
                    </a>
                  </Link>
                  <div>
                    <h2>{item.nome}</h2>
                    <p>{item.quantidade} unidades | R$ {item.preco} cada</p>
                  </div>
                  <css.Trash
                    onClick={() => deletar(item.ID, item.V_ID)}
                  >< FiTrash /> <span>Remover</span></css.Trash>
                </li>)
              }
            </ul>
          </css.Data>

          :

          null

      }
    </css.Container>
  )
}