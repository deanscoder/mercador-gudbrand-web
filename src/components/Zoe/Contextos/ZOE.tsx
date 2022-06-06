import React, { useState, useEffect, useContext, createContext } from 'react'
import ProvedorAut, { ContextoAut } from './auth'
import ProvedorPubli, { ContextoPubli } from './publi'
import Provedor_de_Carrinho, { CONTEXTO_DO_CARRINHO_DE_COMPRAS } from './carrinho'

/* 

   CONFIGURAÇÃO DO CONTEXTO DA ZOE, MINHA GESTORA
   EZEQUIEL GUDBRAND, kinesislake.com - 2022
   @servosalt

 */

interface ZOE_INTERFACE {
  UIs: {
    zoe: boolean
    criar: boolean
    logar: boolean
    historico: boolean
    sacola: boolean
    operando: boolean
    esqueci: boolean
  }
  confUI(prop: string, atr: boolean): void
  useKeypress(key: string, action: Function): void
}
const ContextoZoe = createContext<ZOE_INTERFACE>({} as ZOE_INTERFACE)

export const ProvedorZoe: React.FC = ({ children }) => {
  const [UIs, __UIs] = useState({
    zoe: false,
    criar: false,
    logar: true,
    historico: false,
    sacola: false,
    operando: false,
    esqueci: false
  })

  function useKeypress(key, action) {
    useEffect(() => {
      function onKeyup(e) {
        if (e.key === key) action()
      }
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
    }, []);
  }

  useEffect(() => {
    if (UIs.zoe === false) {
      __UIs({
        zoe: false,
        criar: false,
        logar: true,
        historico: false,
        sacola: false,
        operando: false,
        esqueci: false
      })
    }
  }, [UIs.zoe])

  function confUI(prop: string, atr: boolean) {
    let chave = prop.toLowerCase()
    switch (chave) {
      case 'zoe': { __UIs(prev => ({ ...prev, zoe: atr })); break }
      case 'criar': { __UIs(prev => ({ ...prev, criar: atr })); break }
      case 'logar': { __UIs(prev => ({ ...prev, logar: atr })); break }
      case 'historico': { __UIs(prev => ({ ...prev, historico: atr })); break }
      case 'sacola': { __UIs(prev => ({ ...prev, sacola: atr })); break }
      case 'operando': { __UIs(prev => ({ ...prev, operando: atr })); break }
      case 'esqueci': { __UIs(prev => ({ ...prev, esqueci: atr })); break }
    }
  }

  return (
    <ContextoZoe.Provider value={{
      UIs,
      confUI,
      useKeypress
    }}>
      <ProvedorAut>
        <Provedor_de_Carrinho>
          <ProvedorPubli>
            {children}
          </ProvedorPubli>
        </Provedor_de_Carrinho>
      </ProvedorAut>
    </ContextoZoe.Provider>
  )
}

export function useZoe() {
  const autenticacao = useContext(ContextoAut)
  const publi = useContext(ContextoPubli)
  const zoeUI = useContext(ContextoZoe)
  const carrinho = useContext(CONTEXTO_DO_CARRINHO_DE_COMPRAS)
  return ({ autenticacao, zoeUI, carrinho, publi })
}
