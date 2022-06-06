import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  h4 {
    text-align: center;
    font-size: 1.5em;
    margin: 5px 0;
  }

  .informacoes_de_codigo {
    text-align: center;
    max-width: 500px;
  }

  #DIV_REENVIO {
    border: 0;
    background: transparent;
    color: ${props => props.theme.colors.accent};
    cursor: pointer;

  }
`

export const Formulario = styled.form`
  display: flex;
  justify-content: center;
  padding: 2% 0;
  margin-bottom: 15px;
  
  input {
    width: 40px;
    margin: 0 3px;
    border: none;
    text-align: center;
  }
`