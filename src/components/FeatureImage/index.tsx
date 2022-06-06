import React, { useEffect } from "react";
import Router from "next/router";
import { useState } from "react";
import * as css from './styles';
import { FiAward, FiTag } from "react-icons/fi";
import { GiFire, GiCrown } from 'react-icons/gi'

import { useTranslation } from "react-i18next";

export default function FeatureImage () {
  const {t, i18n} = useTranslation('common');

  const images = [
    "/images/header/melhor-dupla.jpg",
    "/images/header/jovem-garota-cheia-de-vigor.jpg"
  ]

  const [img, setImg] = useState("")

  function handleBackground(): string {
    let x = Math.floor(Math.random() * (images.length))
    return images[x];
  }

  useEffect(() => {
    setImg(handleBackground())
  }, [])

  return (
    <css.Container bg={img}>
      <h1>Moda Desaparece</h1>
      <h3>Confie no que você veste! Você é incrível.</h3>
        <div>
        <button 
          id="baixe-btn"
          onClick={() => Router.push("https://blogr.gudbrand.com.br/")}
          >
            {t('buttons.verLook')}<GiFire />
        </button>
        <button
          id="criar-btn"
          onClick={() => Router.push("/#colecaovalkiria")}
          >
            {t('buttons.createNow')}<GiCrown />
        </button>
      </div>
    </css.Container>
  )
}