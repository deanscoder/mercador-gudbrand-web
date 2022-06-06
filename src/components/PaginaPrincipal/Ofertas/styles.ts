import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px) {
    padding: 20px 0 20px 20px;
  }
`

export const Imagem = styled.div<{src: string}>`
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
  height: 40px;
  padding: 5px;
  font-size: 1.1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #f4f4f4;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 4px 4px;
`

export const Div = styled.div`
    margin-right: 20px;
    max-width: 217px;
    width: 100%;
    transition: all 300ms ease-in-out;

  @media (max-width: 650px) {
    max-width: 181px;
  }
`

export const DivVerMais = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  max-width: 217px;
  width: 100%;
  height: 295px;
  transition: all 300ms ease-in-out;
`

export const Mais = styled.p`
  font-size: 1.5em;
  cursor: pointer;
`

export const Oferta = styled.h2`
  font-size: 1.5em;
  font-family: 'Fira Sans';
  margin-bottom: 20px;
`