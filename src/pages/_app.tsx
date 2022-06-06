import React from 'react'
import ProvedorTema from '../contexts/theme'
import GlobalStyles from '../styles/global'
import HeaderBar from '../components/Header'
import { ProvedorZoe } from '../components/Zoe/Contextos/ZOE'
import 'react-notifications/lib/notifications.css'

import Footer from '../components/Footer'

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_pt from "../translations/pt/common.json";
import common_en from "../translations/en/common.json";


i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'pt',
  resources: {
    pt: {
      common: common_pt
    },
    en: {
      common: common_en
    }
  }
});

const MyApp = ({ Component, pageProps }) => {

  return (
    <ProvedorTema>
      <I18nextProvider i18n={i18next}>
        <ProvedorZoe>
          <HeaderBar />
          <Component {...pageProps} />
          <GlobalStyles />
          <Footer />
        </ProvedorZoe>
      </I18nextProvider>
    </ProvedorTema>
  )
}

export default MyApp
