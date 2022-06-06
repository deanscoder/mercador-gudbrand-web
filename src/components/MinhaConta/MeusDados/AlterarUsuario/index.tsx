import axios from 'axios'
import { useEffect, useState } from 'react'
import * as css from '../styles'
import { NotificationManager } from 'react-notifications'

export default function AlterarUsuario({ usuario, focus }) {
  const [contador, setContador] = useState(0)
  const [usr, setUsr] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (contador === 0)
      focus(false)
    else
      focus(true)
  }, [contador])

  function normalizador_de_dogtag(arg: string) {
    let tt = /[a-z0-9]/
    let tt2 = /[a-z0-9_]/
    if (!tt.test(arg[0])) {
      setMsg('O nome de usuário não pode começar com caractéres especiais')
    }
    if (!tt2.test(arg[arg.length - 1])) {
      setMsg('O nome de usuário não pode terminar com ponto (.)')
    }
    if (tt.test(arg[0]) && tt2.test(arg[arg.length - 1])) {
      setMsg('')
    }
    if (arg.length < 3) {
      setContador(0)
      setMsg('Nome de usuario precisa ser maior do que 3 caracteres')
    } else {
      setContador(1)
    }
  }

  //CRIA UM FISCAL PARA VALIDAR O NOME DE USUARIO APOS 1 SEG DE PAUSA DE ESCRITA
  useEffect(() => {
    let input = document.getElementById('alterar-usuario') as HTMLInputElement
    let timeout = null;

    input.addEventListener('keyup', function (e) {
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        normalizador_de_dogtag(input.value);
      }, 1000);
    })

    return () => input.removeEventListener('keyup', function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        normalizador_de_dogtag(input.value);
      }, 1000);
    })
  }, [usr])

  function lidar_com_input(e) {
    let entrada = e.target.value.toLowerCase() as string
    let filtro = /[a-z0-9._]*/g.exec(entrada).toString()
    setUsr(filtro)
  }

  return (
    <css.AlterarTextInputContainer>
      <input type="username" id='alterar-usuario' placeholder={usuario}
        onChange={lidar_com_input} />
      {msg}
    </css.AlterarTextInputContainer>
  )
}