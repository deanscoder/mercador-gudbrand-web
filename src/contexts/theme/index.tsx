import React, { useContext, createContext, useEffect, useState } from 'react'
import { ThemeContext, ThemeProvider } from 'styled-components'
import GlobalStyle from '../../styles/global'

import light from '../../styles/themes/light'
import dark from '../../styles/themes/dark'

interface TemaContextData {
  changeTheme(arg: string): void
  toggleTheme(): void
  ThemeContext: any
  theme: typeof dark
}

const TemaContext = createContext<TemaContextData>({} as TemaContextData)

const ProvedorTema: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(light)

  /* useEffect(() => {
    console.log('tema atualizado')
    localStorage.setItem('GB7:TEMA', JSON.stringify(theme))
  }, [theme]) */

  function check() {
    
  }

  useEffect(() => {
      const mM = window.matchMedia('(prefers-color-scheme: dark)')
      mM.matches ? setTheme(dark) : setTheme(light)
      mM.addEventListener('change', e => {
        if(e.matches) {
          setTheme(dark)
        } else {
          setTheme(light)
        }
      })

    useTemaPersistente('GB7:TEMA', light)

    return () => window.matchMedia('(prefers-color-scheme: dark)')
    .removeEventListener('change', e => {})
  }, [])

  const toggleTheme = () => {
    localStorage.setItem('GB7:TEMA', JSON.stringify(theme.title === 'light' ? dark : light))
    setTheme(theme.title === 'light' ? dark : light)
  }

  const changeTheme = (arg: string) => {
    localStorage.setItem('GB7:TEMA', JSON.stringify(arg === 'light' ? light : dark))
    setTheme(arg === 'light' ? light : dark)
  }

  const useTemaPersistente = (key: string, initialState: any) => 
  {
      const local = localStorage.getItem(key)

      if (local)
      {
        setTheme(JSON.parse(local))
      } else {
        setTheme(initialState)
      }
  }

  return (
    <TemaContext.Provider value={{ toggleTheme, ThemeContext, changeTheme, theme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </TemaContext.Provider>
  )
}

export function useTema() {
  const { toggleTheme, ThemeContext, changeTheme, theme } = useContext(TemaContext)
  const { title, colors } = useContext(ThemeContext)
  const contexto = { toggleTheme, title, colors, changeTheme, theme }
  return contexto
}

export default ProvedorTema
