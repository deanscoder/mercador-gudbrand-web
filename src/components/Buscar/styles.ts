import styled from 'styled-components'

export const Container = styled.form`
  position: relative;
  max-width: 600px;
  width: 100%;
  margin-left: -10px;
  margin-right: 10px;

  .gradient-border {
  --border-width: 1.2px;
  width: 100%;
  position: relative;
  height: 39px;
  background:${props => props.theme.colors.primary};
 

  border-radius: 1px;
  @media(max-width: 600px) {
      border-radius: 20px;
    }

  &::after {
    position: absolute;
    content: "";
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      45deg,
      #042326,
      #0066ff,
      #0F5959,
      #0066ff,
      #2A8C82,
      #0066ff
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: 2px;
    @media(max-width: 600px) {
      border-radius: 20px;
    }
    animation: moveGradient 4s alternate infinite;
  }
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}




  #sugestoes-de-pesquisa {
    width: 400px;
  }
  div {
    display: flex;
    button {
      height: 39px;
      background: transparent;
      color:${props => props.theme.colors.accent};
      width: 50px;
      border: none;
      margin-left: -65px;
      margin-top: 2px;
      cursor: pointer;
      @media(max-width: 600px) {
        margin-left: -60px;
      }
      svg {
        font-size: 18px;
      }
    }
  }
  input {
    background: ${props => props.theme.colors.caixa};
    color: ${props => props.theme.colors.inputText};
    max-width: 100%;
    width: 100%;
    height: 39px;
    padding-left: 10px;
    border-radius: 1px;
    border: 0;
    margin-top: -0.005px;
    @media(max-width: 600px) {
      border-radius: 20px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    position: absolute;
    max-width: 600px;
    max-height: 600px;
    overflow: auto;
    width: 100%;
    top: 100%;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    
    a {
      display: inline-block;
      background-color: ${props => props.theme.colors.background};
      padding: 5px 10px;
      :hover {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.headText};
      }
    }
  }
`

/*  #012340,
    #025939,
    #027333,
    #03A63C,
    #04D939,
    #2A8C82 */