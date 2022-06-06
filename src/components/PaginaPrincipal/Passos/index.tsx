import React, { useEffect } from "react";
import * as css from './styles';

export default function PASSO_A_PASSO() {
    return (
    <css.Container>
      <div id="autoatendimento-title">
        <h4>veja como é fácil:</h4>
        </div>
      <div>
        <h2>1º</h2>
        <p>Pesquise<br/><span>o seu produto</span></p>
      </div>
      <div>
        <h2>2º</h2>
        <p>Selecione<br/><span>pondo na sacola</span></p>
      </div>
      <div>
        <h2>3º</h2>
        <p>Finalize<br/><span>com seus dados</span></p>
      </div>
    </css.Container>
  )
}