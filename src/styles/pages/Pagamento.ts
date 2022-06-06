import styled from 'styled-components'

export const Box = styled.div`
  width: 800px;
  background-color: ${props => props.theme.colors.caixa};
  border-radius: 8px;
  padding: 4% 2%;
  margin: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 10px;
  }
  #inputCoupon {
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 0;
    border-color: #121212;
  }
  #dados-confirmados {
    font-size: 1.6em;
    margin: 12px 0;
  }

  button {
    width: 100%;
    line-height: 45px;
    font-size: 16px;
    color: #f4f4f4;
    background-color: ${props => props.theme.colors.accent};
    border: none;
    transition: color 300ms ease-in;

  }

  #voltar {
    width: 300px;
    line-height: 45px;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.caixa};
    border: none;
    :hover {
      color: ${props => props.theme.colors.accent};
    }
  }

  @media (max-width: 800px) {
    width: 100vw;
    padding: 0 2%;
  }
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 100%;

`;

export const AreaDoCupom = styled.div`
  margin: 6% 0;
  text-align: center;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 4% 8%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  h2 {
    text-transform: uppercase;
    font-size: 1.1em;
  }

  #titulo-finalizar {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    svg {
      font-size: 2.6em;
      margin: 0 10px 10px 0;
    }
    div {
      
    }
  }
  #checkout-placeholder {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a {
      text-align: center;
    }
  }
  #checkout-button {
    font-size: 1.4em;
    background: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.background};
    padding: 10px 80px;
    border-radius: 5px;

    transition: all 300ms ease-in-out;

    :focus {outline: none;}
    :hover {
      background: ${props => props.theme.colors.accent};
    }
  }
`

export const Logistica = styled.div`
  margin: 2% 0;
  h2 {
    margin: 4% 0;
    font-size: 1.8em;
    text-transform: none;

    @media (max-width: 800px) {
      display: none;
    }
  }

  @media (max-width: 800px) {
  margin: 12% 0 0 0;
  }
`

export const Detalhes = styled.div``

export const MeiosDePagamento = styled.div`
  h2 {
    font-size: 1.4em;
  }
`

export const Resumo = styled.div`
  margin: 2% 0;
  width: 100%;

  @media (max-width: 800px) {
    padding: 0 4%;
    width: 100%;
    h1 {
      font-size: 1.4em !important;
    }
    span {
      font-size: 0.8em !important;
    }
    h2 {
      font-size: 0.9em !important;
    }
  }

  h1 {
    font-size: 1.6em;
    margin: 2% 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
    #divisor {
      border-top: 1px dotted;
      color: #fff;
      width: 100%;
      margin: 5px 0;
    }
    div {
      h2 {
        font-size: 1em;
      }
      span {
        font-size: 1.2em;
      }
    }
  }
`

export const Formulario = styled.div`

  position: static;
  max-width: 500px;
  width: 100%;
  div {
    width: 100% !important;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10% 0 0 0;
  }

  h2 {
    padding: 0 4%;
    margin-bottom: 4%;
    text-align: center;
  }

input {
    border-radius: 0;
    border: none;
    background: ${props => props.theme.colors.caixa};
    color: ${props => props.theme.colors.inputText};
    margin: 5px 5px;
    line-height: 40px;
    font-size: 16px;
    :focus {
      border-bottom: 1px solid ${props => props.theme.colors.accent};
    }
    @media (max-width: 800px) {
      width: 300px;
    }
  }

  ul {
    font-size: 1.4em;
    width: 100%;
    @media (max-width: 800px) {
    font-size: 16px;
      width: 100%;
    }
    list-style: none;
    li {
      display: flex;
      div{
        margin: 5px 0;
        font-weight: 600;
        font-size: 16px;
        p {
          font-size: 18px;
          font-weight: 400;
        }
      }
    }

  }
`

export const Ask = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  font-size: 0.8em;
  align-items: center;
  margin: 10px 0;
  p {
    margin: 0 10px;
  }
`

export const Fields = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    border: 0;
    font-size: 20px;
    line-height: 40px;
    color: #f4f4f4;
    background: ${props => props.theme.colors.accent};
    margin-top: 15px;
  }
`