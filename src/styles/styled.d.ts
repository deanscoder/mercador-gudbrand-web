import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      primary: string
      secundary: string
      background: string
      accent: string
      text: string
      inputText: string
      headText: string
      link_footer: string
      caixa: string
    }
  }
}
