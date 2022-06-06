import styled from 'styled-components';

export const Container = styled.div`
  color: ${props => props.theme.colors.primary};
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  transition: all 300ms;
  background: ${props => props.theme.colors.secundary};
  #autoatendimento-title {
    @media (max-width: 500px) { display: none; }
  }
  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 22vw;
    width: 100%;
    span {
      text-align: center;
      font-weight: 600;
      font-size: 1em;
    }
    h4 {
      margin-left: 12px;
      font-size: 1.4em;
      text-transform: uppercase;
    }
    h2 {
      margin-right: 12px;
      font-size: 4em;
    }
    p {
      font-size: 1.6em;
    }
    
    @media (max-width: 1000px) {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      h4 {
        margin-left: 12px;
        font-size: 0.9em;
        text-transform: uppercase;
      }
      h2 {
        font-size: 2em;
      }
      p {
        font-size: 1em;
      }
      span {
        font-size: 0.8em;
      }
    }
  }
  button {
    display: none;
    width: 130px;
    padding: 6px 5px;
    margin-top: 6px;
    border: 0;
    font-size: 16px;
    background-color: ${props => props.theme.colors.accent};
    color: #181818;
    text-align: center;
    transition: all 300ms ease;
    :hover {
      background-color: transparent;
      border: 1px solid ${props => props.theme.colors.accent};
    }
    @media(max-width: 720px) {
      display: block;
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