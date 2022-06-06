import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(7px);
  color: ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: 300ms all ease-in-out;
  z-index: 9998;
  overflow-y: scroll;
  max-height: 100%;
`

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 109px;

  svg {
    font-size: 3em;
    margin: 10px;
  }
`

export const Lista = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0 4%;
  display: flex;
  justify-content: space-between;

  a {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: 800px) {
    flex-wrap: wrap;
    ${Item} {
      padding: 0 0;
      margin: 0 0;
      width: 115px;
      background: transparent;
      
    }
  }

`

export const Caixa = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 300ms;

&[operando=sim]{
  flex: 0;

  ${Item}{
    opacity: 0.3;
    transform: scale(0.8);
    :hover {
    opacity: 1;
  }
    @media (max-width: 800px) {
      transform: scale(0.6);
      width: 60px;
      color: #fefefe;
      text-align: center;
      }
    &[ativo=sim]{
      opacity: 1;
      color: ${props => props.theme.colors.accent};
    }
  }
}

`


export const Conteudo = styled.section`
  visibility: hidden;
  opacity: 0;
  transition: 300ms all ease-in;
  transition-delay: 200ms;

  &[visivel=sim] {
    height: 100%;
    visibility: visible;
    opacity: 1;
    transition-delay: 0;
  }
`