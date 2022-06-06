import React, { createContext, useState, useEffect } from 'react'
import ion from '../../../config/ion_api_base'

 /* 

    CONFIGURAÇÃO DO CONTEXTO DE PUBLICIDADE (INEXISTENTE ATÉ ENTÃO)
    EZEQUIEL GUDBRAND, kinesislake.com - 2022
    @servosalt

  */

export interface PUBLICIDADE_INTERFACE {
  registrar_interesse(args: { tipo: string, valor: string, dispositivo?: string }):
   Promise<void>
}

export const ContextoPubli = createContext<PUBLICIDADE_INTERFACE>({} as PUBLICIDADE_INTERFACE)

export default function ProvedorPubli ({children}) {

  function registrar_interesse(args: 
    { tipo: string, valor: string, dispositivo?: string }
    ): Promise<void> {

    return new Promise(async (res, rej) => {
      if (args.tipo && args.valor) {
        try {

          const { data: resposta } = await ion({
            method: 'post',
            url: '/publi/registrar_interesse',
            data: { amostra: args }
          })
          
        } catch (err) { rej('Serviço instável') }
      }
    })

  }

  return (
    <ContextoPubli.Provider value={
      { registrar_interesse }
      }>
      {children}
    </ContextoPubli.Provider>
  )
}
