import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  top: 0;
  z-index: 9700;
  width: 100%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 8px 5%;
  transition: all 350ms;
  @media (max-width: 800px) {
    position: sticky;
  }
  #sair-main {
    background: none;
    border: none;
    color: #fefefe;
    font-size: 0.8em;
    :focus {
      outline: none;
    }
  }
  .MobileIcon {
    display: none;
    background: none;
    border: none;
    font-size: 2.5em;
    padding: 0 10px;
    color: #fff;
    .svg {
    }

    @media (max-width: 800px) {
      display: flex;
    }
  }

`
export const Sup = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  nav {
    margin-left: 150px;
    @media(max-width: 800px){
      margin-left: 0;
    }
  }
`

export const Inf = styled.section`
  display: flex;
  justify-content: space-between;
`

export const Esquerda = styled.div`
  display: flex;
`
export const Direita = styled.div`
  display: flex;
  align-items: center;
  #guerreiro-id { 
    display: block;
    margin-right: 5px; 
    @media(max-width: 600px) {
      display: none;
    }
    }
`
export const ContextMenu = styled.div`
  display: none;
  position: absolute;
  background: ${props => props.theme.colors.background};
  width: 180px;
  border-radius: 2px;
  box-shadow: 6px 5px 5px 2px ${props => props.theme.colors.accent};
  transition: 300ms all ease-in-out;
  cursor: pointer;
  z-index: 9999;
  ul { list-style: none;}

  li {
    height: 35px;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    :hover{
      background: ${props => props.theme.colors.accent};
    }
  }
`