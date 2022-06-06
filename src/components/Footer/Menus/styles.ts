import styled from 'styled-components'

export const Container = styled.div`
  padding: 2% 5%;
`

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 700px) {
    display: none;
  }
  li {cursor: pointer;}
  h2
  {
    margin: 5px 0 10px 0;
  }

  ul
  {
    margin: 0 4% 0 0;
    list-style: none;
  
    @media (max-width: 800px)
    {
      text-align: center;
      width: 100%;
      margin: 4% 0;
    }
  }

  li
  {
    margin: 5px 0;
  }

  #procon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  #footer_logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
    @media (max-width: 480px) { width: 480px; }
    
  }
`
