import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 5%;
  @media (max-width: 650px) {
    margin: 0;
  }
`

export const Lista = styled.ul`
    width: 100%;
    list-style: none;
  li {
    max-width: 580px;
    width: 100%;
    margin: 10px 0;
    padding: 10px 20px;
    border-radius: 12px;
    background-color: ${props => props.theme.colors.caixa};
    @media (max-width: 650px) {
      padding: 10px;
      margin: 15px 0;
    }
    .primeiro-div-de-pedido {
      margin: 8px 0;
    }

    .div-lateral {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    div {

    }
  }
`