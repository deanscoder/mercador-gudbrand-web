import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 20px 0;

  .ver-mais-li {
    color: #000;
  }
`;

export const Titulo = styled.h2`
  font-size: 1.8em;
  font-family: 'Fira Sans';
  margin-bottom: 20px;
`

export const Story = styled.div<{ bg: string }>`
  background-color: ${props => props.bg};
  border-radius: 15px;
  width: 240px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: grab;

  @media (max-width: 720px) {
    width: 180px;
    height: 100px;
  }

  a {
    pointer-events: none;
    user-select: none;
  }

  img {
    width: 65%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
    cursor: pointer;
    }
  
`