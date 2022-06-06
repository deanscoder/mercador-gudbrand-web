import styled from 'styled-components'

export const Container = styled.div<{ bg: string }>`
  background-color: ${props => props.theme.colors.background};
  background: url(${props => props.bg});
  background-position: 50% 70%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 90vh;
  @media (max-width: 800px){
    align-items: center;
    background-position: right;
    margin: 0;
  }
`
export const Box = styled.div`
  background-color: ${props => props.theme.colors.caixa};
  border-radius: 2px;
  padding: 2%;
  margin-top: -2%;
  margin-right: 12%;
  max-width: 400px;
  width: 100%;
  min-height: 420px;
  .carregamento-wrapper {

    margin-left: -25px;

  }
  @media (max-width: 800px){
    margin: 0;
    padding: 2%;
  }

  @media (max-width: 500px){
    margin: 0 10px !important;
    max-width: 300px;
    padding: 2%;

    h1 {
      font-size: 1.8em;
      font-weight: 500;
    }
  }
  span {
    margin-left: 15px;
    margin-top: 5px;
    display: inline-block;
  }
  
  input {
    width: 100%;
    height: 36px;
    font-size:14px;
    border-radius: 2px;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    padding-left: 14px;
    border: 0;
  }
  
  h1 {
    font-family: 'Fira Sans';
    font-weight: 400;
    margin-bottom: 30px;
    margin-top: 10px;
    text-align: center;
  }

  ul {
    list-style: none;
    li {
        margin: 5px 0;
      #non-register {
        color: ${props => props.theme.colors.accent};
        text-align: center;
        width: 100%;
        cursor: pointer;
      }
      button {
        background-color: ${props => props.theme.colors.accent};
        padding: 10px 20px;
        font-size: 16px;
        border: 0;
        margin-top: 5px;
        width: 100%;
      }
    }
  }
`

export const Botao = styled.button`
  width: 100%;
  padding: 2%;
  color: ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.accent};
  text-align: center;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
  border: 0;

  :disabled {
    cursor: not-allowed;
  }
`

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
`