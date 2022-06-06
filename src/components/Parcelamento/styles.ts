import styled from 'styled-components'

export const Container = styled.div`
  .toggle-li-para-parcelamento {
    div {
      color: ${props => props.theme.colors.link_footer};
      svg {
        color: ${props => props.theme.colors.accent};
        font-size: 16px;
        margin: 0 5px;
      }
    }
  }

  width: 100%;


  ul {
    list-style: none;
    width: 100%;
    background-color: ${props => props.theme.colors.caixa};
    margin: 10px 0;
    padding: 5px;
    cursor: pointer;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 5px 0;
      height: 25px;
    }
  }
`