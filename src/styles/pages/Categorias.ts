import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  height: 250vh;
  #zona-titulo-para-smarthphones {
    display: none;
    @media(max-width: 720px) {
      display: block;
    }
  }
  @media(max-width: 720px) {
    height: auto;
  }
`

export const Right = styled.div<{bg: string}>`
  max-width: 180px;
  position: sticky;
  top:0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: url("${props => props.bg}");
  background-position: 50% 50%;
  margin-left: 55px;
  @media(max-width: 800px) {
    display: none;
  }
  .flutuante {
    h1 {
      font-weight: 500;
      text-align: center;
    }
    h5 {
      font-weight: 200;
      margin-top: 30px;
    }
    padding: 0 15px;
    position: absolute;
    top: 40%;
    right: -65px;
    width: 260px;
    height: 160px;
    background: ${props => props.theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 15px 25px;
    @media(max-width: 800px) {
      display: none;
    }
  }

`

export const Left = styled.div`
  max-width: 100%;
  width: 100%;
  
  h3 {
    text-align: center;
    margin-top: 4%;
  }

`

export const Area = styled.div`
  padding: 2% 4%;
  display: block;
`

export const AreaTop = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  a {
    color: ${props => props.theme.colors.accent};
  }
`

export const AreaBody = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media(max-width: 430px) {
    flex-direction: column;
  }
`

export const AreaDivisor = styled.div`
  display: flex;
  max-width: 643px;
  width: 100%;
  flex-wrap: wrap;
  @media(max-width: 600px) {
    max-width: 100%;
  }
`

export const Item = styled.div`
  margin: 15px 12px;
  max-width: 175px;
  max-height: 280px;
  @media(max-width: 430px) {
    max-width: 100%;
  }

  `

export const ItemImagem = styled.div<{src: string}>`
  background: url("${props => props.src}");
  background-position: 50% 50%;
  background-size: cover;
  width: 100%;
  height: 200px;
  cursor: pointer;
  margin-bottom: 5px;
  :hover {
    transform: scale(1.1);
  }
`

export const ItemMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  max-height: 70px;
  height: 100%;

  .nome-item-categoria {

  }

  .preco-item-categoria {
    font-weight: 400;
    font-size: 16px;
  }
  `

