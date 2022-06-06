import styled from 'styled-components'

export const Container = styled.div` 
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  `

export const WideBox = styled.div`
  border-radius: 24px;
  margin: 10px 4%;
  img {
    width: 100%;
    border-radius: 24px;
    cursor: pointer;
  }
`

export const Box = styled.div`
  border-radius: 4px;
  background-color: ${props => props.theme.colors.caixa};
  max-width: 584px;
  width: 100%;
  height: 165px;
  margin: 10px 8px;
  img {
    width: 100%;
    position: relative;
    border-radius: 4px;
  }
`

export const BoxImagem = styled.div`
  border-radius: 4px 4px 0 0;
  width: 100%
`