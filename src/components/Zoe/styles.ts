import styled, {keyframes} from 'styled-components'

const esmurecer = keyframes`
0% {
  opacity: 0;
  visibility: visible;
}
50% {
  opacity: 0.8;
}
100% {
  opacity: 0;
  visibility: hidden;
}
`


export const Container = styled.div``

export const btnCentral = styled.button`
  position: fixed;
  bottom: 30px;
  right: 25px;
  background: transparent;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: 500ms all ease-in-out;
  box-shadow: 0 0 0 0 ${props => props.theme.colors.accent};
  opacity: 1;
  z-index: 9999;

  :focus { outline: none }

  svg {
    color: ${props => props.theme.colors.accent};
    font-size: 2.4em;
    opacity: 1;
    transition: 600ms all ease-in-out;
  }

  &[ativo=sim]{
    animation: pulseUI 2s;
    transform: scale(1.2);
    svg { 
      animation: desaparecer 2s; 
      color: ${props => props.theme.colors.secundary};
      }
    span { transform: scale(1) }
  }


  @keyframes desaparecer {
    0% {
      opacity: 0.1;
    }
    70% {
      opacity: 1;
    }
  }

  @keyframes pulseUI {
    0% {
      opacity: 0.1;
      transform: scale(1);
    }
    70% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 20px 10px ${props => props.theme.colors.accent};
    }
    100% {
      transform: scale(1.2);
      box-shadow: 0 0 0 0 ${props => props.theme.colors.accent};
    }
  }

  #RVL__ZOE {
    position: absolute;
    color: ${props => props.theme.colors.text};
    top: -8px;
    left: 50%;
    transform: translate(-50%);
    opacity: 0.8;
    transition: 7s all ease-in-out;
    display: none;
 }
  #RVL__ZOE_MENU {
    font-size: 0.8em;
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translate(-50%);
    color: ${props => props.theme.colors.text};
    transition: 5s all ease-in-out;
    animation: 30s ${esmurecer} infinite;
    animation-delay: 10s;
    opacity: 0.8;

  }

`

export const CartQtd = styled.div`
  position: absolute;
  top: 0;
  font-size: 1.1em;
  color: #fefefe;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`