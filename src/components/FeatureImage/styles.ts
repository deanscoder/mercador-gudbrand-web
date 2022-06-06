import styled from 'styled-components';

export const Container = styled.div<{bg: string}>`
  background: url(${props => props.bg});
  background-size: cover;
  background-position: 50% 50%;
  height: 100vh;
  box-shadow:inset 0 0 0 2000px rgba(37, 37, 37, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
  h4 {
    text-align: center;
    font-weight: 400;
  }
  h1 {
    font-size: 7em;
    @media (max-width: 800px) {
      font-size: 2.8em;
    }
  }
  h3 {
    font-size: 2em;
    @media (max-width: 800px) {
      font-size: 1.5em;
      text-align: center;
    }
  }
  div {
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    #baixe-btn {
        background: ${props => props.theme.colors.accent};
        color: #f4f4f4;
        transition: all 300ms;
        border: 1px solid ${props => props.theme.colors.accent};
        :hover {
          border-color: ${props => props.theme.colors.primary};
          border: 1px solid;
        }
      }
    #criar-btn {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        transition: all 300ms;
        border: 1px solid ${props => props.theme.colors.background};
        :hover {
          border-color: ${props => props.theme.colors.text};
          border: 1px solid;
        }
      }
    button {
      font-size: 17px;
      font-weight: 500;
      line-height: 45px;
      width: 200px;
      border: none;
      cursor: pointer;
      transition: all 300ms;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 25px;
        margin: 0 5px;
      }
      :hover {
        background: ${props => props.theme.colors.secundary};
      }
      
    }
    #videoshare {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg {
        path {
          cursor: pointer !important;
        }
        font-size: 40px;
      }
    }
  }
`

export const VideoFrame = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9600;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    iframe {
      @media (max-width: 800px) {
        width: 100% !important;
      }
    }
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #f5f5f5 !important;
      svg {
        margin: 40px 0 15px 0;
        font-size: 35px;
        path {
          color: #f5f5f5;

        }
      }
    }
  }
`;