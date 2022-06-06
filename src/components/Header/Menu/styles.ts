import styled from 'styled-components'

export const ListaMenu = styled.ul`
    list-style: none;
    display: flex;
    a
    {
        color: ${props => props.theme.colors.headText};
        text-decoration: none;
    }
    @media (max-width: 800px)
    {
        display: none;
    }
`

export const ItemMenu = styled.li`
    position: relative;
    padding: 5px 10px 5px 0;
    transition: all 300ms ease-in-out;
    a
    {
        color: ${props => props.theme.colors.headText};
        text-decoration: none;
    }

    :hover {
        color: ${props => props.theme.colors.accent};
    }
`