import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  color: #fefefe;
  padding: 4% 0 0 0;
  h1 {
    color: ${props => props.theme.colors.secundary};
    font-size: 2.4em;
  }
 
  @media (max-width: 800px) {
    flex-direction: column-reverse;
    width: 100%;
  }

`

export const Meta = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 9995;

  section {
    margin: 40px 0;
    div {
      width: 400px;
      font-size: 1.4em;
      span {
        font-size: 1em;
      }
    }

  }

  @media (max-width: 800px) {
    section { display: none; }
    p { display: none; }
    h1 { font-size: 1.2em !important; }
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #222222;
    padding: 10px 10px;
  }
`
export const Data = styled.div`
  flex-grow: 2;
  padding: 0 2%;
  max-height: 500px;
  overflow-y: scroll;
  span {
    user-select: none;
    color: ${props => props.theme.colors.secundary};
  }
  h2 {
    font-size: 1.4em;
    @media (max-width: 800px)
    {
      font-size: 1.1em;
      user-select: none;
    }
  }
  p {
    font-size: 1.2em;
    font-weight: 600;
    @media (max-width: 800px)
    {
      font-size: 0.9em;
      user-select: none;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1% 0;
    transform: scale(0.9);
    transition: 300ms all ease-in-out;
    opacity: 0.8;
    :hover {
      opacity: 1;
      transform: scale(1);
    }
    @media (max-width: 800px) {
      transform: scale(1);
      transition: none;
  }
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`


export const Foto = styled.div<{url:string}>`
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 5px;
  min-width: 100px;
  min-height: 100px;
  cursor: pointer;
  
  @media (max-width: 800px)
  {
    margin: 0 15px 0 0;
  }
`

export const Valor = styled.div`
  margin: 4% 0;
  font-size: 2em;

  @media (max-width: 800px) {
    font-size: 1.4em;
  }
`

export const Psiu = styled.div`
  margin: 5px 0;
  font-size: 1em !important;
  font-weight: 600;
  span {
    font-size: 0.6em;
    font-weight: 400;

  }
`

export const Finalizar = styled.div`
  color: ${props => props.theme.colors.secundary};
  margin: 20px 0;
  font-size: 1.6em;
  font-weight: 600;
  cursor: pointer;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 3px solid;
    color: #fefefe;
    border-color: ${props => props.theme.colors.secundary};
    padding: 15px 10px 5px 10px;
    transition: all 300ms ease-in-out;

    svg {
      margin: 3px 0;
      
    }

    :hover {
      border-color: ${props => props.theme.colors.accent};
      svg { color: ${props => props.theme.colors.accent}; }
    }
    @media (max-width: 800px) {
      padding: 0;
      border: none;
      flex-direction: row;
      svg {margin: 0 5px;}
    }
  }

  @media (max-width: 800px) {
    text-align: right;
    margin: 0 0;
    font-size: 1em;
  }
`

export const Trash = styled.div`
  cursor: pointer;
  margin: 0 10px;
  opacity: 0.6;
  transition: 500ms all ease-in-out;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
  font-size: 0.5em;
  color: #fefefe;
  }
  svg {
    margin: 5px 0;
    font-size: 1.2em !important;
    color: ${props => props.theme.colors.secundary};
  }
  :hover {
    opacity: 1;
  }
`