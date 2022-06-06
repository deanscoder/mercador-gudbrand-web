import * as css from './styles'
import { RiWhatsappFill } from 'react-icons/ri'
import Router from 'next/router'
import { useTranslation } from 'react-i18next';

export default function Bar() {
  const { t, i18n } = useTranslation('common');

  return (
    <css.Container>
      <div className="mobile-menu-bar">
        <div onClick={() => Router.push('/conta/acesse')}>
          Já é um cliente? Entrar
        </div>
      </div>
      <div className="desktop-menu-bar">
        <div onClick={() => Router.push('mailto:atendimento@gudbrand.com.br')}>
          Já é um cliente? Entrar
        </div>
      </div>
      <css.Contato onClick={() => Router.push('https://api.whatsapp.com/send?phone=5579991457802&text=Hey%20Gud!')}>
        <RiWhatsappFill size={22} color="#25d366" />
        {t('barContact')}
      </css.Contato>
    </css.Container>
  )
}