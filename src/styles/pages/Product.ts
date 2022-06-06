import styled from 'styled-components'
import 'react-awesome-slider/dist/styles.css';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: hidden !important;
`

export const Tela_de_carregamento = styled.div`
  position: sticky;
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
  
`

export const Banners = styled.div`
  width: 100%;
`

export const SecaoEsquerda = styled.div`
  display: flex;
  width: 45%;
  min-width: 300px;
  height: 85vh;
  margin-bottom: 25px;
  img
  {
    width: 100%;
  }
  @media (max-width: 800px){width: 100%; height: 400px;}
`
export const DivItem = styled.div`
  @media (max-width: 800px)
  {
    height: 350px;
    width: 350px;
    object-fit: cover;
    background: transparent;
  }
`

export const SecaoDireita = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 2%;

  @media (max-width: 800px)
  {
    padding: 4% 4%;
    width: 100%;  
  }

`

export const Flag = styled.div`
  display: flex;
  text-transform: uppercase;
  font-size: 0.8em;
`

export const Titulo = styled.h1`
  font-size: 2.4em;
`

export const Meta = styled.div`
  display: flex;
  font-size: 0.8em;

  span
  {
    margin: 0 10px 0 0;
    padding: 2px 4px 2px 0;
  }

`

export const SecaoPagamento = styled.div`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  width: 100%;

  .btn-comprar-diretamente {

    background-color: ${props => props.theme.colors.accent};
    width: 30%;
  }

  @media (max-width: 800px)
  {

  }
`

export const Preco = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2em;
  width: 60%;
`

export const Parcelamento = styled.span`
  font-size: 0.6em;
  i {
    text-decoration: line-through;
    opacity: 0.6;
  }
`

export const Comprar = styled.button`
  width: 70%;
  height: 50px;
  background: ${props => props.theme.colors.secundary};
  border-radius: 2px;
  border: none;
  color: #010101;
  font-size: 1.3em;
  margin: 0 1px;
  cursor: pointer;

  :disabled {
    background: #242424;
    opacity: 0.6;
    cursor: not-allowed;

  }

  @media (max-width: 800px)
  {
    padding: 5px 15px;
    margin: 4% 1px;
    width: 70%;
  }

`

export const btnParcelas = styled.button`
  border: none;
  background: none;
  color: ${props => props.theme.colors.secundary};
  margin: 0 6px;
  font-size: 1em;
  cursor: pointer;
`
export const CampoCores = styled.div`
  display: flex;
  max-width: 380px;
  width: 100%;
  justify-content: flex-start;
  position: relative;

`
export const CampoTamanhos = styled.div`
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
`
export const btnCor = styled.button<{ hex: string }>`
  font-size: 1em;
  font-weight: 500;
  padding: 5px 10px;
  margin-top: 5px;
  margin-right: 8px;
  color: ${props => props.theme.colors.accent};
  border: 1.5px solid;
  border-radius: 50%;
  border-color: #fff;
  background: ${props => props.hex};
  height: 45px;
  width: 45px;
  transition: 500ms all ease-in-out;
  box-shadow: 0 0 0 0 ${props => props.hex};

  :hover {
    background-color: ${props => props.hex};
    color: ${props => props.theme.colors.background};
  }
  &[ativo=sim] {
    font-weight: 600;
    background: ${props => props.hex};
    color: ${props => props.hex};
    transform: scale(1.1);
    animation: pulse 1s;
    border-color: ${props => props.theme.colors.secundary};

  }
  :focus { outline: none }

  @keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 10px 5px ${props => props.hex};
    border-color: ${props => props.hex};
  }
  100% {
    transform: scale(1.1);
    box-shadow: 0 0 0 0 ${props => props.theme.colors.background};
  }
}
`

export const btnTam = styled.button`
  padding: 2px;
  font-weight: 800;
  font-size: 1.2em;
  margin-right: 8px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 1.5px solid;
  border-color: ${props => props.theme.colors.accent};
  background: transparent;
  color: ${props => props.theme.colors.accent};

  box-shadow: 0 0 0 0 ${props => props.theme.colors.accent};

  transition: 100ms all ease;
  transition-delay: 100ms;
  :disabled {
    opacity: 0.4;
    color: red;
    cursor: not-allowed;
    border-color: red;
    border: 2px solid;
    :hover {background-color: transparent; color: red;}
  }
  :hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
  }
  :focus {
    outline: none;
  }
  &[ativo=sim] {
    animation: pulse 700ms;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
    transform: scale(1.1);
  }

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 10px 5px ${props => props.theme.colors.accent};
  }
  100% {
    transform: scale(1.1);
    box-shadow: 0 0 0 0 ${props => props.theme.colors.accent};
  }
}

`
export const CorNome = styled.div`
  padding: 10px 0;
  margin: 5px 0;
`

export const Variantes = styled.div``

export const Input = styled.input`
  font-size: 1.2em;
  width: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  border: none;
  margin: 5px 0;
  background: ${props => props.theme.colors.caixa};
  color: ${props => props.theme.colors.inputText};
`

export const QuantidadeArea = styled.div`
  margin: 2% 0;
  display: flex;
  flex-direction: column;
  align-content: center;

  a {
    color: ${props => props.theme.colors.accent};
  }

  #quantidade-field {
  line-height: 25px;
  font-size: 1.4em;
  margin: 0 10px;
  }
`

export const QtdContainer = styled.span`
  button {
    width: 30px;
    height: 30px;
    font-size: 2em;
    background: ${props => props.theme.colors.secundary};
    color: ${props => props.theme.colors.primary};
    border: none;
    margin: 0 2px;
    transition: all 300ms ease-in-out;

    :hover {
      transform: scale(1.2);
    }
    :focus {
      outline: none;
    }
  }
`
export const Dimensoes = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  padding: 4% 6%;
  margin-top: -25px;
`

export const SegundaParte = styled.div`
  padding: 4% 5%;
  
  .images-of-stock{
    h2 {
      margin: 24px 0 12px 0;
    }
    img {
      max-width: 600px;
      width: 100%;
    }
  }
  div {
    section {
      font-size: 16px;
      margin-top: 1%;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 1% 0 2% 0;
      
      div {
        display: flex;
        flex-direction: column;
        p{
           font-weight: 600;
           font-size: 16px;
        }
        span {
          font-size: 18px;
        }
      }
    }
  }
`

export const Recomendados = styled.h3`
  text-align: center;
  opacity: 0.8;
  font-size: 1.3em;
  font-family: 'Fira Sans';
  margin: 20px 0;
  width: 100%;
`