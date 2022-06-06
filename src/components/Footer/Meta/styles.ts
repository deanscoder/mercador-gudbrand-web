import styled from 'styled-components'

export const Container = styled.div`
  margin: 1% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 0.8em;
  color: ${props => props.theme.colors.link_footer};
  p {
    max-width: 600px;

    @media (max-width: 800px)
    {
      padding: 0 20px;
    }
  }
`

export const Usuario = styled.h2`
  color: #fff;
  font-size: 1.2em;
`

export const pequeno_menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0;
  padding: 0 22px;
  max-width: 400px;

  li {
    a {
      color: ${props => props.theme.colors.link_footer};
    }
  }
`