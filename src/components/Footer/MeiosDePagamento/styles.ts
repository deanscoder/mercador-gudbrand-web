import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  span {
    font-size: 0.7em;
    color: ${props => props.theme.colors.text};
    opacity: 0.8;
    width: 120px;

    @media (max-width: 800px)
    {
      width: auto;
      margin: 0 0 4% 0;
    }
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 800px)
    {
      transform: scale(0.8);
      margin: 2% 0;
    }
  }

  li {
    margin: 0 5px;
  }
`