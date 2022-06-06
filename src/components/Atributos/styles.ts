import styled from 'styled-components'

export const Container = styled.div`
  .atributo-selecionado {
    border: 2px solid ${props => props.theme.colors.accent};
  }
  display: flex;
  flex-direction: column;
  
`

export const ContainerSeletor = styled.div``

export const ContainerAtributo = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 5px 10px 0 0;
    padding: 10px 15px;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.caixa};
    color: ${props => props.theme.colors.text};
    cursor: pointer;
    &[selecionado = true] {
      color: ${props => props.theme.colors.caixa};
      background-color: ${props => props.theme.colors.text};
    }
    :hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`

export const Atributo = styled.div<{ hexa: string }>`
    margin: 5px 10px 0 0;
    padding: 10px 15px;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
`

export const NomeDoGrupo = styled.h2`
  font-size: 16px;
  margin-top: 10px;
`

export const GrupoDeOpcoes = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;
  margin-top: 10px;

  li {
    margin-right: 10px;
  }
`

export const NomeDoAtributo = styled.h4``

export const BolhaDeCor = styled.div<{ hexa: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${props => props.hexa};
`

