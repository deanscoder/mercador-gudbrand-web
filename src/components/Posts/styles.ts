import styled from 'styled-components';

export const Container = styled.div`
  padding: 4% 2% 0 6%;
  .infinite-scroll-pesquisar {
    overflow: hidden !important;
  }
  @media(max-width: 720px) { 
    padding: 4% 1% 4% 1%;
  }
  .mobile-post-vision {
    display: none;
    @media (max-width: 800px) {
      display: block;
      img {
        margin: 10px 0;
      }
      h4, h2 {
        max-width: none;
        width: 100%
      }
    }
  }
  .carousel-gudbrand-posts {
    @media (max-width: 800px) {
      display: none;
    }
  }
  
   
`;

export const Single = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px 2%;
  background: ${props => props.theme.colors.background};
  opacity: 0.8;
`;

export const Produto = styled.a`
  margin: 20px 10px;
  display: inline-block;
  max-width: 241px;
  width: 100%;
  text-align: left !important;
  background-color: ${props => props.theme.colors.background};
  :hover {
    transform: scale(1.1);
  }
  @media(max-width:720px) {
    margin: 4% 5px;
    :hover { 
      transform: none;
    }
  }
  @media(max-width:500px) {
    transform: scale(0.9)
  }
`
export const ProdutoHead = styled.div<{ mobileHeight: number }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  img {
    width: 100%;
    height: 320px;
    border-radius: 4px 4px 0 0;
    @media(max-width: 600px) {
      object-fit: cover;
      height: ${props => props.mobileHeight}px;
    }
  }
`
export const ProdutoBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  padding: 4px 8px 8px 8px;
  background: ${props => props.theme.colors.caixa};
  border-radius: 0 0 4px 4px;
  h3{
    font-size: 14px;
    font-weight: 400;
    text-align: left !important;

  }
  h2 {
    font-size: 16px;
  }
`