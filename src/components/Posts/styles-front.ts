import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2%;
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
  div {
    margin-bottom: 6px;
    h2 {
      font-weight: 600;
      text-align: center;
      font-size: 18px;
      max-width: 236px;
      width: 100%;
    }
    h4 {
      font-size: 18px;
      max-width: 236px;
      width: 100%;
      text-align: center;
    }
    p {
      text-align: center;
      color: ${props => props.theme.colors.accent};
    }
    @media (max-width: 800px) {
      font-size: 18px;
      text-align: center;
    }
  }
  img {
    border-radius: 12px;
    margin: 15px 10px;
    transition: all 300ms;
    object-fit: cover;
    @media (max-width: 800px) {
      width: 100%;
      height: 90vh;
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