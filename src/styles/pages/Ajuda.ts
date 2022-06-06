import styled from 'styled-components'

export const Container = styled.div`
  padding: 2% 5%;

  font-size: 1.2em;
  text-align: justify;

  p {
      margin: 20px 0;
      font-size: 16px;
    }

  @media (max-width: 700px) {
    p {
      margin: 20px 0;
      font-size: 14px;
    }
    ul li {
      font-size: 14px;
    }
    ol li {
      font-size: 14px;

    }
  }

  ol {
    margin: 5px 30px;
    li {
      text-align: justify;
      margin: 5px 0;
      padding: 2px 15px;
    }
  }

  a {
    color: ${props => props.theme.colors.accent};
  }

  h1 {
    font-size: 1.8em;
    margin: 2% 0;
    @media (max-width: 700px) {
      font-size: 1.5em;
    }
  }
  h2 {
    font-size: 1.6em;
    margin: 2% 0;
    @media (max-width: 700px) {
      font-size: 1.4em;
    }
  }
  h3 {
    font-size: 1.4em;
    margin: 2% 0;
    @media (max-width: 700px) {
      font-size: 1.2em;
    }
  }

  ul {
    margin: 5px 30px;
    li {
      text-align: justify;
      margin: 5px 0;
      padding: 2px 15px;
    }
  }
`

export const Box = styled.div`
  margin-top: 30px;
  width: 100%;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    button {
      max-width: 350px;
      width: 100%;
      height: 30px;
      font-size: 16px;
      background-color: ${props => props.theme.colors.accent};
      color: #f6f6f6;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
    }

    input {
      width: 350px;
      line-height: 30px;
      font-size: 16px;
      @media (max-width: 400px) {
       width: 300px 
      }
    }

    textarea {
      width: 350px;
      min-height: 250px;
      padding: 5px;
      background-color: ${props => props.theme.colors.caixa};
      color: ${props => props.theme.colors.inputText};
      @media (max-width: 400px) {
       width: 300px 
      }
    }
  }

  h4 {
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin-top: 30px;
    flex-wrap: wrap;
    li {
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100px;
      text-align: center;
      cursor: pointer;
      transition: all 500ms ease-in-out;
      svg {
        font-size: 25px;
        transition: all 500ms ease-in-out;
      }
      :hover {
        background-color: ${props => props.theme.colors.caixa};
        svg {
          color: ${props => props.theme.colors.accent};
        }
      }
    }
  }
`