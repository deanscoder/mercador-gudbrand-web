import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  display: flex;
  justify-content: space-between;
  min-height: 90vh;
  ul {
    background: ${props => props.theme.colors.background};
    li {
      svg {
        font-size: 18px;
      }
        @media (max-width: 720px) {
            line-height: 35px;
            font-size: 14px;
            svg {
              font-size: 14px;
            }
          }
    }
  }
  .divisor-de-inputs-painel {
      padding-top: 30px;
      padding-left: 4%;
      padding-bottom: 10px;
      justify-content: flex-start;
      font-size: 16px;
      :hover {
        background: ${props => props.theme.colors.background};
      }
  }
  .sub-titulo-inputs {
        margin-left: 5px;
        opacity: 0.8;
      }

  @media (max-width: 800px){
    background-position: right;
  }
`

export const HeaderLine = styled.div`
  height: 5px;
  background-color: ${props => props.theme.colors.accent};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 25px;
`
export const Icone = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.accent};
`
export const MenuLista = styled.nav`
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-arround;
    height: 35px;
    font-size: 16px;
    :hover {
      background-color: ${props => props.theme.colors.accent};
    }
  }
`

export const MenuColuna = styled.nav``
export const Variavel = styled.div`
  width: 100%;
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

export const ContainerEnderecos = styled.div`
  margin: 4% 5%;
  ul {
    list-style: none;
    max-width: 600px;
    width: 100%;
    .divisor-de-inputs {
      margin-top: 30px;
    }
    li {
      width: 100%;
      .sub-titulo-inputs {
        margin-left: 5px;
        opacity: 0.8;
      }
      div {
        position: relative;
        #botao-de-limpar-cep {
          position: absolute;
          margin-left: -30px;
          margin-top: 18px;
          border: 0;
          background: transparent;
          font-size: 18px;
          color: ${props => props.theme.colors.accent};
          opacity: 0.8;
          cursor: pointer;
          @media (max-width: 720px) {
            margin-top: 12px;
          }
          :hover {
            opacity: 1;
          }
        }
        #input-rua {
          width: 75%;
        }
        #input-numero {
          width: 25%;
        }
        input {
          width: 100%;
          border: 0;
          border-radius: 3px;
          @media (max-width: 720px) {
            line-height: 35px;
            font-size: 14px;
          }
        }
      }
    }
  }
`

export const BlocoDeEndereco = styled.li`
  border-radius: 3px;
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.caixa};
  :hover {
    border: 1px solid ${props => props.theme.colors.accent};
  }
  button {
    background: transparent;
    border: 0;
    font-size: 14px;
    margin: 10px 0 12px 0;
    color: ${props => props.theme.colors.accent};
    cursor: pointer;
  }
`
export const BlocoDeEnderecoPadrao = styled.li`
  border: 1px solid ${props => props.theme.colors.secundary};
  border-radius: 3px;
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 35px;
`

export const LinkCriarEndereco = styled.div`
  color: ${props => props.theme.colors.accent};
  cursor: pointer;
  background-color: ${props => props.theme.colors.caixa};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  svg {
    color: ${props => props.theme.colors.accent};
    font-size: 40px;
  }
`
export const LinkConfirmarEndereco = styled.div`
  color: ${props => props.theme.colors.accent};
  background: ${props => props.theme.colors.caixa};
  cursor: pointer;
  max-width: 600px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 7px 0;
  margin-top: 35px;

`

export const LinkDeletarEndereco = styled.div`
  color: ${props => props.theme.colors.secundary};
  background: transparent;
  cursor: pointer;
  max-width: 600px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 7px 0;
  margin-top: 10px;

`

export const ContainerMudarSenha = styled.div`
  margin: 4% 5%;
  ul {
    list-style: none;
    max-width: 600px;
    width: 100%;
    li {
      width: 100%;
      input {
        width: 100%;
          border: 0;
          border-radius: 3px;
          @media (max-width: 720px) {
            line-height: 35px;
            font-size: 14px;
          }
      }
      div {
        position: relative;
      }
    }
  }
`