import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.colors.caixa};
  padding: 2%;
`
  

export const Secao = styled.div`
  margin: 0 5%;
  padding: 2% 0 0 0;
  border-top: 1px solid;
  border-color: ${props => props.theme.colors.accent};

  @media (max-width: 800px) { display: none; }
`

export const Menus = styled.nav``