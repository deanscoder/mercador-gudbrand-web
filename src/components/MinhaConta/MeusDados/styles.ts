import styled from 'styled-components'

export const Container = styled.div`
    max-width: 600px;
    width: 95%;
    margin-left: 2%;
    .carregando-painel {
      height: 5px;
      margin-bottom: -20px;
    }
    .divisor-de-inputs-painel {
      padding: 5px 0;
      margin: 30px 0 5px 0;
    }
    @media (max-width: 700px) {
      margin: 80px 5px 5px 5px;
    }
    #alterar-usuario {
      text-transform: lowercase;
    }
    ul {
    width: 100%;
    background-color: ${props => props.theme.colors.background};

    @media (max-width: 700px) {
    margin-top: -20px;
    }
    li {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: ${props => props.theme.colors.background};
      width: 100%;
      height: 40px;
      
      :hover {
        background-color: ${props => props.theme.colors.caixa};
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 85%;
      }
    }
  }
`

export const ClickSpan = styled.span`
  color: ${props => props.theme.colors.accent};
  cursor: pointer;
`

export const AlterarTextInputContainer = styled.div`
  input {
    border: 0;
    height: 40px;
    border-radius: 3px;
    margin-right: 5px;
    background-color: transparent;
    font-size: 14px;
    width: 70%;
  }
`

export const Capa = styled.div`
  background: url("https://blogr.gudbrand.com.br/images/autor/capa.jpg");
  height: 350px;
  background-position: 50% 50%;
  position: relative;
  @media (max-width: 800px) {
    height: 250px;
  }
`
export const FotoPerfil = styled.div`
  background: ${props => props.theme.colors.caixa};
  h2 {
    font-size: 3em;
    text-transform: uppercase;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 130px;
  width: 130px;
  background-position: 50% 50%;
  background-size: cover;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid;

  
`
