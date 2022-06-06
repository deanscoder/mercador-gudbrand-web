import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.caixa};
  color: ${props => props.theme.colors.inputText};

  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4%;
    section {
      display: flex;
      align-items: center;
      svg {
        font-size: 2.8em;
        margin-right: 10px;
        transition: color 400ms ease-in-out;
      }
      :hover {
        svg {
          color: #DD2A7B;
        }
      }
    }
    h2 {
      font-size: 2em;
    }
    button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      max-width: 280px;
      width: 100%;
      border: 0;
      background-color: ${props => props.theme.colors.accent};
      color: #181818;
      padding: 15px 0px;
      font-size: 16px;
      border-radius: 3px;
      cursor: pointer;
      transition: all 300ms ease-in-out;
      :hover {
        background-color: ${props => props.theme.colors.secundary};
      }
    }
  }
`
