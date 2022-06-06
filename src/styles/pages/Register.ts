import styled from 'styled-components'

export const Container = styled.div`
  background: url('/images/header/casual-man-jeans-web.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  
`

export const Box = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 2%;
  width: 450px;

  @media (max-width: 800px){
    width: 80%;
    min-width: 340px;
    padding: 20px;
    h1 {
      margin-bottom: 20px;
    }
  }

  ul {
    list-style: none;
    width: 100%;
    li {
      display: flex;
      #phase-btn {
      transition: all 300ms ease-in-out;
      .disabled {
      color: #990000;
      cursor: not-allowed;
      }
     }
      button {
        width: 100%;
        background-color: ${props => props.theme.colors.accent};
        border: 0;
        padding: 12px 0;
        margin: 2.5px 0;
      }
      & div{
        margin: 0 5px 0 0;
      }
      input {
        width: 100%;
        border: 0;
        margin: 2px 2px;
        :focus {
          border-bottom: 1px solid ${props => props.theme.colors.accent};
        }
      }
    }
  }
`

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
`