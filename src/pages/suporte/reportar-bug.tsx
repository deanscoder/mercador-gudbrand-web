import Navegacao from '../../components/Header/Navegacao'
import * as css from '../../styles/pages/Ajuda'

import { useRouter } from 'next/router'
import Formulario from '../../components/Formulario'
import ion from '../../config/ion_api_base'

export default function ReportarBug() {
  const Router = useRouter()

  async function solicitar(e) {
    e.preventDefault()

    const input = document.getElementById('relator') as HTMLInputElement
    const text = document.getElementById('relatorio') as HTMLTextAreaElement

    if (
      input.value && text.value
    ) {
      const { data: res } = await ion({
        method: 'post',
        url: '/crawler/reportar_bug',
        data: { autor: input.value, bug: text.value }
      })

      if (res) {
        if (res.status === 'REPORTADO') {
          alert('Obrigado pelo reporte!')

          input.value = ''
          text.value = ''
        }
      }
    } else {
      alert('Preencha todos os campos')
    }
  }

  return (<>
    <Navegacao nome="Reportar Bug" />
    <css.Container>
      <p>Por favor relate o bug encontrado com suas palavras e complete a solicitação que
      iremos resolve-lo o mais breve possível. Desde já muito obrigado pela
      ajuda, assim nós poderemos oferecer serviços ainda mais eficientes.
      </p>
      <Formulario>
        EM CONSTRUÇÃO
      </Formulario>
      <css.Box>
        <h4>Formulário de Solicitação</h4>

        <form onSubmit={solicitar}>

          <div>
            <input type="text" name="autor" id="relator" placeholder="Seu nome" />
          </div>

          <div>
            <textarea name="texto" id="relatorio" placeholder="Detalhe aqui o ocorrido com suas palavras..." />
          </div>

          <button type="submit">Solicitar</button>
        </form>
      </css.Box>
    </css.Container>
  </>
  )
}