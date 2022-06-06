import styled from 'styled-components'

export const Container = styled.div`
  padding: 4% 5%;
  #editar-dados-pessoais {
    font-size: 16px;
    color: ${props => props.theme.colors.accent};
    cursor: pointer;
  }
  #quero-excluir {
    font-size: 16px;
    color: red;
    cursor: pointer;
  }
  ul li{
    display: flex;
    align-items: center;
    padding: 10px 0;
    div {
      padding: 5px 10px;
    }
  }
  a {
    color: ${props => props.theme.colors.accent};
  }
`

export const Ficha = styled.div`
  font-size: 1.1em;
  button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${props => props.theme.colors.accent};
  border: 0;
  margin: 10px 4px 0 0;
  }
  h1 {
    font-size: 2.2em;
  }
  h3 {
    margin: 10px 0;
    text-transform: uppercase;
    svg {
      font-size: 1.5em;
      margin: 0 10px 0 0;
      color: ${props => props.theme.colors.secundary};
    }
  }
  span {
    line-height: 30px;
    margin: 0 10px;
  }
  
`
export const Label = styled.label`
`
export const Loading = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: baseline;
  h3 {
    margin-left: 10px;
    text-transform: none;
    font-size: 16px;
  }
`