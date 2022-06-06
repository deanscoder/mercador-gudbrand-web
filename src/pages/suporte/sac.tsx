import Navegacao from '../../components/Header/Navegacao'
import * as css from '../../styles/pages/Ajuda'
import {
  BsEnvelopeOpen,
  BsChatRightText,
  BsHeadphones,
  BsMessenger,
  BsBugFill
} from 'react-icons/bs'
import {
  FaTelegramPlane
} from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function SAC() {
  const Router = useRouter()

  const info = [
    {
      id: 1,
      nome: 'por E-mail',
      icone: <BsEnvelopeOpen />,
      url: 'mailto://vendas@gudbrand.com.br'
    },
    {
      id: 2,
      nome: 'via Telegram',
      icone: <FaTelegramPlane />,
      url: 'https://t.me/grupogud'
    },
    {
      id: 3,
      nome: 'por Mensagem',
      icone: <BsChatRightText />,
      url: 'sms:+5579991457802'
    },
    {
      id: 4,
      nome: 'Ligue-nos',
      icone: <BsHeadphones />,
      url: 'tel:+5579991457802'
    },
    {
      id: 5,
      nome: 'por Direct',
      icone: <BsMessenger />,
      url: 'https://instagram.com/grupogud'
    },
    {
      id: 6,
      nome: 'Reportar Bug',
      icone: <BsBugFill />,
      url: '/suporte/reportar-bug'
    },
  ]

  return (<>
    <Navegacao nome="Sistema de Atendimento ao Cliente" />
    <css.Container>
      <p>Olá, se você precisa de alguma coisa, seja uma dúvida, crítica ou qualquer informação
      basta falar conosco agora mesmo. Escolha um dos terminais de atendimento disponíveis abaixo,
      e te responderemos o mais breve possível.
      </p>
      <css.Box>
        <h4>Canais de atendimento</h4>
        <ul>
          {info && info.map(o => <li
            key={o.id + '_' + o.nome}
            onClick={() => Router.push(o.url)}
          >
            {o.icone}
            <p>{o.nome}</p>
          </li>)}
        </ul>
      </css.Box>
    </css.Container>
  </>
  )
}