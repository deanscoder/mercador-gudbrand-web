import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 0;
  #trocar-enderecos {
    color: ${props => props.theme.colors.accent};
    font-size: 12px;
    cursor: pointer;
  }
  form {
    input {
      border: 0;
      border-radius: 3px;
      line-height: 40px;
      font-size: 16px;
    }
  }
  div {
    margin: 8px 0 5px 0;
    span {
      font-size: 12px;
      color: ${props => props.theme.colors.text};
      opacity: 0.8;
    }
    p {
      font-weight: 500;
    }
  }
  a {
    color: ${props => props.theme.colors.accent};
  }
  form {
    display: flex;
    flex-wrap: wrap;
    input {
      line-height: normal;
      padding: 5px 10px;
      max-width: 263px;
      width: 100%;
    }
    button {
      border: 0;
      margin: 0 10px;
      font-weight: 600;
      cursor: pointer;
      color: ${props => props.theme.colors.secundary};
      background: transparent;
    }
  }
  font-size: 16px;
  h4 {
    font-size: 1.2em;
  }
  p {
    font-size: 16px;
    span {
      font-size: 12px;
    }
  }
`;

export const Frete = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
`

export const Msg = styled.p`
  font-size: 12px !important;
`