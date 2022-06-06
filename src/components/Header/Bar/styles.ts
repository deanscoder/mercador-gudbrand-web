import styled from 'styled-components'

export const Container = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  .desktop-menu-bar {
    @media(max-width: 700px) {
      display: none;
    }
  }

  .mobile-menu-bar {
    display: none;
    @media(max-width: 700px) {
      display: block;
    }
  }
  div {
    display: flex;
    justify-content: space-around;
    div {
      margin: 0 10px;
      cursor: pointer;
      opacity: 0.9;
    }
    span {
      color: ${props => props.theme.colors.accent};
    }
  }

`

export const Contato = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin: 0 5px;
  }
`
