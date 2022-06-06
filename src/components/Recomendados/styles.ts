import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Titulo = styled.h2`
  text-align: center;
`

export const ListaDeProdutos = styled.div`
  .infinite-scroll-recomendados {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
    width: 100%;
    justify-content: center;
  }
`

export const Produto = styled.div`
  margin: 5px 10px;
  max-width: 241px;
  width: 100%;
  @media (max-width: 650px) {
    max-width: 171px;
    margin: 5px 5px;

  }
`

export const ProdutoIMG = styled.div<{src: string}>`
  width: 100%;
  height: 295px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: url(${props => props.src});
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 4px;
  @media (max-width: 650px) {
    height: 200px;
  }
`

export const Meta = styled.div`
  width: 100%;
  height: 80px;
  padding: 5px;
  font-size: 1.1em;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0 0 4px 4px;
  h3 {
    font-size: 16px;
    text-align: left;
  }
  @media (max-width: 650px) {
    h3 {
      font-weight: 400;
      font-size: 14px;
      text-align: left;
      margin-bottom: 5px;
    }
    p {
      font-size: 16px;
      font-weight: 600px;
    }
  }
`
