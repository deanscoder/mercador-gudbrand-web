import styled from 'styled-components'

export const Container = styled.div`
  margin: 2% 5%;
  
  .divisor-de-lojas {
    margin: 25px 0;
  }

  .resumo-final {
    margin-top: 30px;
  }
`


export const Tela_de_carregamento = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #010101;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5000;
`

export const Faturamento = styled.section``

export const Resumo = styled.ul`
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    max-width: 650px;
    width: 100%;
    background-color: ${props => props.theme.colors.caixa};
    border-radius: 4px;
    padding-right: 5px;

    div {
      margin: 0 5px;
      h2 {
        font-size: 1.2em;
      }
      @media (max-width: 800px) {
        h2 {
          font-size: 1em;
        }
      }
    }

  }

  .sub-total-li {
    padding: 12px 5px;
  }
`

export const SubTitulo = styled.h2`
  max-width: 650px;
  width: 100%;
  margin: 20px 0 15px 0;
`

export const Imagem = styled.div<{ img: string }>`
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 3px;
  background: url(${props => props.img});
  background-size: cover;
  background-position: 50 50;
`

export const Entrega = styled.div`
  ul {
    border: 1px solid #6E25B8;
    border-radius: 3px;
    max-width: 650px;
    width: 100%;
    padding: 15px 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    div {

    }
  }

  .btn-de-novo-endereco {
    color: ${props => props.theme.colors.accent};
    cursor: pointer;
  }
`

export const Pagamento = styled.div`
  button {
    max-width: 650px;
    width: 100%;
    border: 0;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.accent};
    color: #f4f4f4;
    font-size: 14px;
    padding: 12px 0;
    cursor: pointer;
  }
  div {
    max-width: 650px;
    width: 100%;
    input {
      border: 0;
      line-height: 40px;
      font-size: 14px;
      width: 100%;
    }
  }
`
