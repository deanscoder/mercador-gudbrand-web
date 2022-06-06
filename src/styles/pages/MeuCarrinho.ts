import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 2% 5%;
  justify-content: space-between;
  flex-wrap: wrap;
  .ul-li-div-titulo {
    cursor: pointer;
  }
`
export const Painel = styled.div`
  max-width: 300px;
  width: 100%;
  button {
    border: 0;
    border-radius: 3px;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    display: none;
  }
`
export const Lista = styled.ul`
  max-width: 800px;
  width: 100%;
  list-style: none;
  .mobile-balanco {
    display: none;
    @media (max-width: 800px) {
      display: block;
    }
  }
  li {
    display: flex;
    min-height: 80px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    h2 {
      font-size: 1em;
    }
    #url-compartilhamento {
      opacity: 0.6;
      font-size: 12px;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    #compartilhar-carrinho {
      background-color: ${props => props.theme.colors.text};
      color: ${props => props.theme.colors.background};
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-width: 200px;
      width: 100%;
      padding: 5px 10px;
      transition: all 300ms ease-in-out;
      cursor: pointer;
      :hover {
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        svg {
          color: ${props => props.theme.colors.accent};
        }
      }
      svg {
        color: ${props => props.theme.colors.background};
        font-size: 20px;
      }
    }
    button {
      border: 0;
      background: transparent;
      svg {
        font-size: 22px;
        opacity: 0.8;
        color: ${props => props.theme.colors.text};
        :hover {
          opacity: 1;
        }
      }
    }
    h1 {
      margin: 10px 0;
    }
    div {
      margin: 0 20px 0 0;
      .carrinho-quantidade {
        text-align: center;
      }
    }
}
`

export const FotoDoProduto = styled.div<{url: string}>`
  width: 80px;
  height: 80px;
  border-radius: 3px;
  background: url(${props => props.url});
  background-position: 50 50;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`

export const BotaoDeCheckout = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.accent} !important;
  font-size: 20px;
  border-radius: 3px;
  padding: 10px 0;
  cursor: pointer;
`