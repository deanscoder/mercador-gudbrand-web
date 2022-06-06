import styled from 'styled-components'

interface ItemData {
  key: string
  categoria?: string
  manufatura?: string
  currency?: string
  valor?: string
}

export const HeadImage = styled.div<{img: string}>`
  display: flex;
  background: url(${props => props.img});
  box-shadow:inset 0 0 0 2000px rgba(29, 27, 89, 0.3);
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 100vh;
  align-items: center;

  @media (max-width: 800px) {
    height: 250px;
  }
`

export const EventoPrincipal = styled.div`
  background: rgba(0, 0, 0, 0.0);
  height: 250px;
  width: 420px;
  margin: 0 0 0 80px;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;

  @media (max-width: 800px) {
    display: none;
  }
`

export const TituloPrincipal = styled.h1`
  font-size: 4em;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Panton-BlackItalic', sans-serif;
  clip-path: polygon(8% 0%, 100% 0%, 93% 100%, 0% 100%);
  background-color: ${props => props.theme.colors.accent};
  padding: 5px 35px;
  font-style: normal;
  margin: 0 0;
`
export const SubTituloPrincipal = styled.h2`
  font-family: 'Panton-Light', sans-serif;
  font-size: 2em;
`
export const OFF = styled.h2`
  font-family: 'Panton-BlackItalic', sans-serif;
  text-shadow: 3px 3px 4px #181818;
  background-color: #181818;
  padding: 0 15px;
  clip-path: polygon(8% 0%, 100% 0%, 93% 100%, 0% 100%);
  font-size: 2.8em;
  color: ${props => props.theme.colors.accent};
`

export const MobilePrincipal = styled.div`
  background: ${props => props.theme.colors.primary};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  padding: 6% 0;

  @media (min-width: 800px) {
    display: none;
  }

  ${TituloPrincipal} {
    font-size: 1.8em;
    background: transparent;
    padding: 0 15px;
  }
  ${SubTituloPrincipal} {
    text-transform: uppercase;
    font-size: 1em;
  }
  ${OFF} {
    font-size: 2.8em;
    color: ${props => props.theme.colors.primary};
    text-shadow: none;
    background-color: ${props => props.theme.colors.accent};
  }
`

export const Container = styled.div`
  padding: 2% 5%;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: hidden;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const TitlesArea = styled.div`
  margin: 2% 4%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  div {
    h2{
      font-size: 1.6em;
    }
  }
  svg {
    font-size: 2.6em;
    margin: 0 8px;
  }
`;

export const Overlay = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  h1 {
    margin: 2% 0;
    font-size: 1.2em;
  }

  @media (max-width: 800px) {
    position: relative;
    visibility: visible;
    opacity: 1;
  }
`

export const Item = styled.div<ItemData>`
  width: 270px;
  position: relative;
  margin: 2% 1%;
  
  img {
    width: 100%;
    height: 270px;
    object-fit: cover;
  @media (max-width: 800px) {
    height: 350px;
  }

  }
  @media (max-width: 800px) {
    margin: 2% 0;
    width: 350px;
    height: auto;
  }
`
export const Title = styled.h1`
  font-size: 2em;

  @media (max-width: 800px) {
    font-size: 1.8em;
  }
`
export const Brand = styled.h2`
  font-size: 1.2em;
  text-transform: lowercase;
  ::before {
    content: '@';
  }
  @media (max-width: 800px) {
    font-size: 1em;
  }
`
export const Price = styled.h4`
  font-size: 1.2em;
  margin: 4% 0;
  @media (max-width: 800px) {
    font-size: 1em;
  }
`
export const Category = styled.h2`
  font-size: 1.2em;
  @media (max-width: 800px) {
    font-size: 1em;
  }
`
