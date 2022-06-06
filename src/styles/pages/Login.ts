import styled from 'styled-components'

export const Container = styled.div<{ bg: string }>`
  background: url(${props => props.bg});
  background-position: 50% 70%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  @media (max-width: 800px){
    background-position: right;
  }
`
export const Box = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 3px;
  padding: 2%;
  max-width: 300px;
  width: 100%;
  h1 {
    font-family: 'Fira Sans';
    font-weight: 500;
    text-align: center;
    margin-bottom: 5px;
  }

  ul {
    list-style: none;
    li {
        margin: 5px 0;
      input {
        border: 0;
        width: 100%;
        border-radius: 2px;
        font-size: 14px;
        line-height: 40px;
      }
      #non-register {
        color: ${props => props.theme.colors.accent};
        text-align: center;
        width: 100%;
        cursor: pointer;
      }
      button {
        background-color: ${props => props.theme.colors.accent};
        padding: 10px 20px;
        font-size: 16px;
        border: 0;
        margin-top: 20px;
        width: 100%;
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