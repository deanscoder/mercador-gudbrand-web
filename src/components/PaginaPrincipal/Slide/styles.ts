import styled from 'styled-components'

export const Container = styled.div` 
  width: 100%;
  height: 250px;
  margin: 0;
  `

export const Imagem = styled.div<{src: string}>`
  background: url(${props => props.src});
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  height: 250px;
  margin: 0;
`