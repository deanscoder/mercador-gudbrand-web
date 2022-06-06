import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 2%;
  padding: 10px 0;
  #back-button {
    cursor: pointer;
  }
  div {
    svg {
      font-size: 30px;
      color: ${props => props.theme.colors.accent};
      margin-right: 20px;
    }
  }
`