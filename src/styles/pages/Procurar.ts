import styled from 'styled-components';

export const Container = styled.div`
  
`

export const Sessao = styled.section`
  margin: 2% 3%;
`;
export const NaoEncontrado = styled.div`
  text-align: center;
  width: 100%;
  font-size: 1.5em;
  font-weight: 500;
  padding: 15px 0;
`

export const Produtos = styled.div``;
export const Categorias = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    border-radius: 10px;
    background: ${props => props.theme.colors.caixa};
    padding: 20px;
    display: flex;
    max-width: 300px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    p {
      margin-top: 5px;
      font-size: 11px;
      color: ${props => props.theme.colors.accent};
    }
    h4 {
      font-weight: 200;
      text-transform: uppercase;
      font-size: 12px;
    }
  }
`;
export const Tags = styled.div``;
