import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  width: 100%;
`

export const Imagem = styled.div<{src: string}>`
  background: url("${props => props.src}");
  background-position: 25% 50%;
  background-size: cover;
  width: 100%;
  height: 350px;
`