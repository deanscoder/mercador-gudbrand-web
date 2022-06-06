import styled from 'styled-components'


export const Container = styled.div`
  width: 100%;
  display: flex;
  @media(max-width: 720px) {
    flex-direction: column;
  }
`
export const Direito = styled.div`
  background: url("/images/gifs/404.gif");
  background-position: 50% 50%;
  background-size: cover;
  height: 100vh;
  width: 450px;
  @media(max-width: 720px) {
    width: 100%;
    height: 60vh;
  }
`
export const Esquerdo = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 3em;
  }
  h2 {
    font-size: 2em;
  }
  @media(max-width: 720px) {
    margin: 40px 0;
  }
`