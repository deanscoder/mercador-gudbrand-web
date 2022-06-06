import styled from 'styled-components'

export const Search = styled.div<{ focus: string }>`
position: relative;
max-width: 620px;
width: 100%;
flex-grow: 1;
height: 34px;
background-color: ${props => props.focus === 'false' ?
    'rgba(255, 255, 255, 0.3)' : '#fff'};
border-radius: 3px;
display: flex;
align-items: center;
transition: 200ms ease;

svg {
  fill: ${props => props.focus === 'true' ?
    '#000' : 'rgba(255, 255, 255, 0.6)'};
  margin-left: 12px;
}

form {
  width: 100%;
}

input {
  max-width: 620px;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 5px;
  line-height: 1.5em;
  font-size: 1rem;
  color: ${props => props.focus === 'false' ?
    'rgba(255, 255, 255, 0.6)' : '#222'};
  outline: none;

  ::placeholder {
    color: ${props => props.focus === 'false' ?
    'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
  }

}

.search-list {
  position: absolute;
  bottom: 0;
  transform: translateY(104%);
  background-color: #fff;
  width: 100%;
  max-height: 70vh;
  overflow-y: scroll;
  border-radius: 3px;

  section {
    background-color: #EDEDED;
    max-width: 100%;
    width: 100%;
    padding: 0 10px;
    font-size: 14px;
    height: 35px;
    display: flex;
    align-items: center;
    color: #000000A6;

    h3 {
      font-size: .875rem;
      font-weight: 400;
    }

  }

  li {
    display: flex;
    align-items: center;
    color: #222;
    display: flex;
    width: 100%;
    height: 52px;
    padding: 8px;
    font-size: 16px;
    z-index: 4000;
    cursor: pointer;
    :hover {
      background-color:#EDEDED;
    }

  }

}

@media (max-width: 980px) {
  max-width: 100%;
  border-radius: 85px;
  padding: 0 10px;
  margin: 0 10px;
  position: unset;
  svg {
    display: none;
  }

  input {
    max-width: 90%;
  }

  .search-list {
    transform: translateY(0);
    top: 55px;
    max-height: 100vh;
    bottom: unset;
    left: 0;
    right: 0;
  }

}

.gradient-border {
  --border-width: 1.2px;
  width: 100%;
  position: relative;
  height: 50px;
  background:${props => props.theme.colors.primary};
 

  border-radius: 1px;
  @media(max-width: 600px) {
      border-radius: 20px;
    }

  &::after {
    position: absolute;
    content: "";
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      45deg,
      #042326,
      #0066ff,
      #0F5959,
      #0066ff,
      #2A8C82,
      #0066ff
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: 2px;
    @media(max-width: 600px) {
      border-radius: 20px;
    }
    animation: moveGradient 4s alternate infinite;
  }
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}
`

export const Search_Thumbnail = styled.div<{ image: string }>`
width: 36px;
height: 36px;
background-color: #EDEDED;
margin-right: 8px;
border-radius: 3px;
`
