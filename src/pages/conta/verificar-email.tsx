import * as css from '../../styles/pages/Verficar'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import ClockLoader from "react-spinners/ClockLoader";
import { useTema } from '../../contexts/theme';
import { NotificationContainer } from 'react-notifications'
import { useZoe } from '../../components/Zoe/Contextos/ZOE';

const ConfirmeEmail = () => {
  const [codigo, setC] = useState('')
  const [carregando, setCR] = useState(false)
  const [carregandoTimeout, setCRT] = useState(false)


  const router = useRouter()
  const { email, rd } = router.query

  const { colors } = useTema()

  const { autenticacao: { verificar_email, reenviar_codigo } } = useZoe()

  useEffect(() => {
    let primeiro_input = document.getElementById("primeiro_input") as HTMLInputElement

    if (primeiro_input) {

      primeiro_input.focus()

    }
  }, [])

  useEffect(() => {
    if (codigo.length === 6) {

      setCR(true)
      requistar_verificacao()

    }
  }, [codigo])

  function propagar_codigo(): void {
    let formulario = document.getElementById(
      "formulario_de_validacao_de_email"
    ) as HTMLFormElement

    let inputs = formulario.getElementsByTagName("input")

    let numeros = []

    for (var i = 0; i < inputs.length; i++) {
      numeros.push(inputs[i].value)
    }

    setC(numeros.join(''))

  }

  function passar_para_o_proximo(
    anterior: string, atual: string, proximo: string
  ): void {

    if (atual && proximo && !anterior) {

      let input_atual = document.getElementById(atual) as HTMLInputElement
      let input_prox = document.getElementById(proximo) as HTMLInputElement

      if (input_atual.value.length === input_atual.maxLength) {

        input_prox.focus()

      }

    } else if (atual && !proximo && anterior) {

      let input_anterior = document.getElementById(anterior) as HTMLInputElement
      let input_atual = document.getElementById(atual) as HTMLInputElement

      if (input_atual.value.length === 0) {

        input_anterior.focus()

      }
      //REQ servidor

    } else {

      let input_anterior = document.getElementById(anterior) as HTMLInputElement
      let input_atual = document.getElementById(atual) as HTMLInputElement
      let input_prox = document.getElementById(proximo) as HTMLInputElement

      if (input_atual.value.length === input_atual.maxLength) {

        input_prox.focus()

      } else if (input_atual.value.length === 0) {

        input_anterior.focus()

      }

    }

  }

  async function requistar_verificacao() {

    const resposta = await verificar_email(email as string, codigo)

    if (!resposta) {
      setC('')
      setCR(false)
    } else {

      if (rd) {

        router.back()

      } else {

        router.push('/')

      }
    }

  }

  async function voucher_reenvio() {
    setCRT(true)
    const btn = document.getElementById('DIV_REENVIO') as HTMLButtonElement
    await reenviar_codigo()
    btn.disabled = true

    setTimeout(() => {

      setCRT(false);
      btn.disabled = false;

    }, 30000)
  }

  return (
    <>
      <css.Container>

        <h4>Insira seu código de verificação</h4>
        <css.Formulario id="formulario_de_validacao_de_email">

          <input
            id="primeiro_input"
            type="tel"
            autoComplete="off"
            maxLength={1}
            onKeyUp={() => passar_para_o_proximo(
              "", "primeiro_input", "segundo_input")}
          />

          <input
            id="segundo_input"
            type="tel"
            autoComplete="off"
            maxLength={1}
            onKeyUp={() => passar_para_o_proximo(
              "primeiro_input", "segundo_input", "terceiro_input")}
          />
          <input
            id="terceiro_input"
            type="tel"
            autoComplete="off"
            maxLength={1}
            onKeyUp={() => passar_para_o_proximo(
              "segundo_input", "terceiro_input", "quarto_input")}
          />

          <input
            id="quarto_input"
            type="tel"
            autoComplete="off"
            maxLength={1}
            onKeyUp={() => passar_para_o_proximo(
              "terceiro_input", "quarto_input", "quinto_input")}
          />

          <input
            id="quinto_input"
            type="tel"
            autoComplete="off"
            maxLength={1}
            onKeyUp={() => passar_para_o_proximo(
              "quarto_input", "quinto_input", "sexto_input")}
          />


          <input
            id="sexto_input"
            type="tel"
            autoComplete="off"
            maxLength={1}
            onChange={propagar_codigo}
            onKeyUp={() => passar_para_o_proximo(
              "quinto_input", "sexto_input", "")}
          />

        </css.Formulario>

        {carregando &&
          <PropagateLoader color={colors.accent} loading={carregando} size={15} />
        }

        {!carregando &&
          <>
            <button id="DIV_REENVIO" onClick={voucher_reenvio}>Reenviar codigo</button>
            <ClockLoader color={colors.accent} loading={carregandoTimeout} size={15} />
          </>
        }


        <NotificationContainer />
      </css.Container>
    </>
  )
}

export default ConfirmeEmail