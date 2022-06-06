import { useEffect, useState } from 'react'
import * as css from './styles'
import { FiArrowRight } from 'react-icons/fi'

export default function Parcelamento({ valor, vezes }) {
  const [toggle, setT] = useState(false)
  const [parcela, setP] = useState([] as Array<number>)

  function decifrar() {
    let array_temporaria = [] as Array<number>

    if (valor) {

      if (vezes) {

        for (let i = 0; i < vezes; i++) {

          array_temporaria.push(valor / (i + 1))

        }

      } else {

        for (let i = 0; i < 3; i++) {

          array_temporaria.push(valor / (i + 1))

        }

      }

    }

    setP(array_temporaria)

  }

  useEffect(() => {
    if (valor) {

      decifrar()

    }
  }, [valor])

  return (
    <css.Container>
      { valor && parcela.length &&

        <ul>
          <li
            onClick={() => setT(!toggle)}
            className="toggle-li-para-parcelamento">
            Parcelamento
          <div>
              {parcela.length}x R${(parcela[parcela.length - 1]).toFixed(2)} (sem juros)
          <FiArrowRight />
            </div>
          </li>

          {toggle && <>

            {parcela.map((o, i) => <li className="parcelas-li" key={o + i}>

              <div>{i + 1}x</div>
              <div>R${o.toFixed(2)}</div>

            </li>)}
          </>}

        </ul>

      }

    </css.Container>
  )
}