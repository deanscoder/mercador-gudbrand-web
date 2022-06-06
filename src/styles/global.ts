import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .carregamento-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .p-link {
        cursor: pointer;
        color: ${props => props.theme.colors.accent};
        font-size: 14px;
    }
    .imagenizer{
        div{
            img{
                object-fit: fill;
            }
        }
    }

    .carregando-pagina-pesquisa {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 10px 0;
    }

    .infinite-scroll-component__outerdiv {
        width: 100% !important;
    }

    .rec-arrow {
        background-color: ${props => props.theme.colors.text};
        color: ${props => props.theme.colors.background} !important;
        transform: scale(0.6);
        :hover {
            background-color: ${props => props.theme.colors.background} !important;
            color: ${props => props.theme.colors.text} !important;
        }
    }

    .rec-arrow-right {
        position: absolute;
        z-index: 6000;
        right: 45px;
        background-color: ${props => props.theme.colors.text} !important;
        color: ${props => props.theme.colors.background} !important;
        @media(max-width: 650px) {
            right: 35px;
        }
        :hover {
            background-color: ${props => props.theme.colors.background} !important;
            color: ${props => props.theme.colors.text} !important;
        }
    }

    .rec-arrow-left {
        position: absolute;
        z-index: 6000;
        left: 30px;
        background-color: ${props => props.theme.colors.text} !important;
        color: ${props => props.theme.colors.background} !important;
        @media(max-width: 650px) {
            left: 25px;
        }
        :hover {
            background-color: ${props => props.theme.colors.background} !important;
            color: ${props => props.theme.colors.text} !important;
        }
    }

    .rec-item-wrapper {
    }

    .rec-pagination {
    margin: 8px 0 !important;
  }
  .rec-dot {
    width: 12px !important;
    height: 3px !important;
    border-radius: 15px !important;
    margin-right: 2px !important;
    border: ${props => props.theme.colors.text} !important;
    :hover {
      box-shadow: 0 0 1px 3px ${props => props.theme.colors.text} !important;
    }
  }
  .rec-dot_active {
    background-color: ${props => props.theme.colors.text} !important;
    width: 24px !important;
    box-shadow: 0 0 1px 3px ${props => props.theme.colors.text} !important;
  }
    .text-laranja {
        color: ${props => props.theme.colors.secundary};
    }
    .text-verde {
        color: #39ff14;
    }
    .awssld__bullets--active {
        scale: 1.2 !important;
            @media (max-width: 720px) {
                scale: 1.1 !important;
            }
    }
    .awssld__bullets {
        button {
            width: 14px !important;
            height: 14px !important;
            @media (max-width: 720px) {
                width: 8px !important;
                height: 8px !important;
            }
        }
    }

    @font-face {
        font-family: 'Panton-Black';
        src: url('/fonts/panton/Panton-BlackCaps.otf');
    }

    @font-face {
        font-family: 'Panton-Light';
        src: url('/fonts/panton/Panton-LightCaps.otf');
    }

    @font-face {
        font-family: 'Panton-BlackItalic';
        src: url('/fonts/panton/Panton-BlackitalicCaps.otf');
    }
    

    body {
        background: ${props => props.theme.colors.background};
        font-size: 14px;
        color: ${props => props.theme.colors.text};
        font-family: 'Roboto', sans-serif;
    }

    #root {
        width: 100%;
    }
    a
    {
        text-decoration: none;
        color: ${props => props.theme.colors.text};
    }

    button {
        :focus {
            outline: none;
        }
    }

    input {
        color: ${props => props.theme.colors.inputText};
        padding: 0 10px;
        font-size: 1.2em;
        line-height: 45px;
        background: ${props => props.theme.colors.caixa};
        border-radius: 5px;
        border: 0.8px solid;
        border-color: ${props => props.theme.colors.accent};
        margin: 5px 0;

        :focus {
          border-color: ${props => props.theme.colors.accent};
          outline: none;
        }
      }

    .awssld__container {
        background-color: transparent !important;
    }
`
