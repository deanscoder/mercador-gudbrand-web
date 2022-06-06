import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    text-align: center;
    font-size: 1.5em;
    margin: 5px 0;
  }

  .informacoes_de_codigo {
    text-align: center;
    max-width: 500px;
  }
`

export const Sucesso = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.primary};
  color: #fefefe;
  padding: 2% 0;
  @media (max-width: 800px) {
    padding-top: 100px;
    h1 {
      width: 80%;
      font-size: 26px;
      text-align: center;
      margin: 10px 0;
    }
    h3 {
      margin: 10px 0;
    }
    button {
      margin-bottom: 100px;
      font-size: 20px;
    }
    input {
      :focus {
        transform: scale(1.4);
        margin: 10px 0;
      }
    }
  }
  h1 {
    padding: 2% 0;
  }

  a {
    margin: 20px 0 10px 0;
    border: 1px solid;
    border-radius: 3px;
    border-color: #fefefe;
    padding: 10px 20px;
    font-size: 1.4em;
    transition: all 300ms ease-in-out;

    :hover {
      background: #fefefe;
      color: ${props => props.theme.colors.accent};
    }
  }
  h3 {
    text-align: center;
  }
  button {
    border: 0;
    background: none;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.accent};
    margin-top: 15px;
    cursor: pointer;
    :disabled {
      color: #990000;
      cursor: not-allowed;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      text-align: center;
    border: 0;
    background: none;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.accent};
    margin-top: 15px;
    cursor: pointer;
    :disabled {
      color: #990000;
      cursor: not-allowed;
    }
  }
  }

  input {
    background: none;
    margin-top: 15px;
    text-align: center;
    border: 0;
    border-radius: 0;
    color: #fefefe;
  }
`

export const Formulario = styled.form`
  display: flex;
  justify-content: center;
  padding: 2% 0;
  
  input {
    width: 40px;
    margin: 0 3px;
    border: none;
    text-align: center;
  }
`