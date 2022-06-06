import styled from 'styled-components'

export const Placeholder = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
.toggle-btn {
  margin-right: 25px;
  display: flex;
  align-items: center;
  color: #fefefe;
  @media(max-width: 720px) {
    display: none;
  }
  :hover {
    color: #fefefe;
  }
  :focus {
    color: #fefefe;
  }
}
#menu-mobile-burger { display: none; }
#finalizar-compra-side {
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  span {
    text-align: center;
    display: inline-block;
    margin-top: 5px;
    padding: 5px 0;
    width: 100%;
    font-size: 16px;
    background: ${props => props.theme.colors.accent};

  }
  :hover {
    color: ${props => props.theme.colors.background};
  }
}
svg
{
  font-size: 1.8em;
}

#basket-main {
  margin: 0 10px;
}

@media (max-width: 800px) {
  #menu-mobile-burger {
    display: block;
  }
}

`

export const CartQtd = styled.div`

`

export const ListaLogar = styled.ul`
width: 160px;
list-style: none;
position: absolute;
top: -12px;
right: 65px;
transform: translate(50%, 50%);
background: ${props => props.theme.colors.primary};
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
padding: 4px 0;
a
{
  color: ${props => props.theme.colors.headText};
  text-decoration: none;
}
`

export const ItemLogar = styled.li`
padding: 8px 5px;
width: 160px;
text-align: right;
transition: background-color 300ms;
display: flex;
justify-content: flex-end;
align-items: center;
:hover
{
  background: ${props => props.theme.colors.secundary};
}

svg
{
  font-size: 1.5em;
  margin: 0 4px 0 8px;
}
`

export const BtnLogarTitle = styled.span`
text-transform: uppercase;
font-size: 1em;
margin: 0 8px;
`

export const ContainerMobile = styled.div`
position: fixed;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
right: 0;
top: 0;
left: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.7);
backdrop-filter: blur(7px);
z-index: 9999;
`

export const Nav = styled.nav`
display: flex;
flex-direction: column;
justify-items: center;
ul {
  list-style: none;
  font-size: 1.6em;
  li {
    padding: 10px 20px;
    a {
      color: #fefefe;
    }
  }
}

button {
  border: none;
  background: none;
  font-size: 2em;
  color: #fefefe;
  margin-top: 50px;
}

span {
  text-align: center;
  opacity:0.7;
}
`

export const LabelMobile = styled.div`
  display: none;
@media (max-width: 800px) {
  display: block;
}
`

export const SideHeadMenu = styled.ul`
  list-style: none;
  display: flex;
  #basketflag {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.accent};
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    right: 0;
    z-index: 7000;
  }
  li {
    padding: 0 5px;
    cursor: pointer;
    :hover {
      svg {
        color: ${props => props.theme.colors.accent};
      }
    }
  }
`

export const BasketContainer = styled.div`
  position: absolute;
  right: 0;
  width: 400px;
  background-color: ${props => props.theme.colors.primary};
  padding: 10px 5px;
  z-index: 7000;
  border-radius: 0 0 5px 5px;

  max-height: 600px;
  overflow-y: auto;

  h2 {
    margin: 5px 0;
  }

  @media (max-width: 800px) {
    width: 340px;
  }
`

export const Foto = styled.div<{ url: string }>`
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 5px;
  min-width: 100px;
  min-height: 100px;
  cursor: pointer;
  margin-bottom: 5px;
  
  @media (max-width: 800px)
  {
    margin: 0 15px 0 0;
  }
`

export const Trash = styled.div`
  cursor: pointer;
  margin: 0 10px;
  opacity: 0.6;
  transition: 500ms all ease-in-out;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
  font-size: 0.5em;
  color: #fefefe;
  }
  svg {
    margin: 5px 0;
    font-size: 2em !important;
    color: ${props => props.theme.colors.secundary};
  }
  :hover {
    opacity: 1;
  }
`

export const LogMe = styled.div`
  position: absolute;
  right: 0;
  width: 250px;
  background-color: ${props => props.theme.colors.primary};
  z-index: 7000;
  #menu-logado-especial {
    li {
      :hover {
        background-color: ${props => props.theme.colors.accent};
      }
    }
  }
  #greetings-user {
    margin: 0 15px;
  }
  ul {
    list-style: none;
    li {
      z-index: 9999;
      .span-login {
        text-align: center;
        display: inline-block;
        margin-top: -10px;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      padding: 10px 15px;
      cursor: pointer;
      button {
        font-size: 16px;
        background-color: ${props => props.theme.colors.accent};
        padding: 10px 15px;
        color: #fefefe;
        border: none;
        border-radius: 3px;
        margin: 0 3px;
        cursor: pointer;
      }
      input {
        line-height: 35px;
        background: ${props => props.theme.colors.caixa};
        color: ${props => props.theme.colors.inputText};
        border: 0;
        width: 100%;
        font-size: 14px;
        margin: 0;
        :focus {
          border-bottom: 1px solid ${props => props.theme.colors.accent};
        }
      }
    }
  }
`