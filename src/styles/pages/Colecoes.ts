import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 2% 4%;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`

export const Breadcrumb = styled.div``

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 800px) {
    h1 { max-width: 100vw; }
    margin-bottom: 20px;
  }
`

export const CorNome = styled.div`
  padding: 10px 0;
  margin: 5px 0;
  display: flex;
  align-items: center;

  svg {
    margin: 0 5px;
    font-size: 18px;
    :hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`


export const btnCor = styled.button<{hex: string}>`
  font-size: 1em;
  font-weight: 500;
  padding: 5px 10px;
  margin-top: 5px;
  margin-right: 8px;
  color: ${props => props.theme.colors.accent};
  border: 2px solid;
  border-radius: 50%;
  border-color: #fefefe;
  background: ${props => props.hex};
  height: 35px;
  width: 35px;
  transition: 500ms all ease-in-out;
  box-shadow: 0 0 0 0 ${props => props.hex};
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  :hover {
    background-color: ${props => props.hex};
    color: ${props => props.theme.colors.background};
  }
  &[ativo=sim] {
    font-weight: 600;
    background: ${props => props.hex};
    color: ${props => props.hex};
    transform: scale(1.1);
    animation: pulse 1s;
    border-color: ${props => props.theme.colors.secundary};

  }
  :focus { outline: none }

  @keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 10px 5px ${props => props.hex};
    border-color: ${props => props.hex};
  }
  100% {
    transform: scale(1.1);
    box-shadow: 0 0 0 0 ${props => props.theme.colors.background};
  }
}
`

