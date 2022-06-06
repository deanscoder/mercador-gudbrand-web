import styled from 'styled-components';

export const CategoryContainer = styled.div`
    position: absolute;
    background: ${props => props.theme.colors.primary};
    width: 235px;
    min-height: 520px;
    left: 0;
    z-index: 9999;

    @media(max-width: 800px){
        display: none;
    }
`;

export const CategoryList = styled.ul`
    list-style: none;
    text-align: center;
    color: ${props => props.theme.colors.text};
    border-radius: 8px 0 0 8px;
    padding: 22px 0;
`;

export const CategoryItem = styled.li`
    width: 235px;
    padding: 0 26px 0 36px;
    background: none;
    font-size: 1.2em;
    line-height: 36px;
    text-align: left;
    transition: all 320ms;
    a {
        color: #fefefe;
        text-decoration: none;
        font-size: 16px;
    }
    svg {
        text-align: right !important;
        color: #f55455;
        transition: all 320ms;
    }
    :hover {
        background: ${props => props.theme.colors.secundary};
        svg {
            color: #111111;
        }
    }
`;

export const CategoryFather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CategoryBox = styled.div`
    color: ${props => props.theme.colors.text} !important;
    
    a {
        color: ${props => props.theme.colors.text} !important;
    }
    h2 {
        color: ${props => props.theme.colors.text};
    }
    padding: 36px 36px;
    background: ${props => props.theme.colors.caixa};
    border-radius: 0;
    display: none;
    position: absolute;
    right:0;
    top: 0;
    transform: translate(100%, 0);
    width: 745px;
    height: 520px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    h1{
        width: 100%;
        flex-grow: 1;
        height: 40px;
    }

    ${CategoryItem}:hover &{
        display: flex;
    }
    article {
        margin: 10px;
    }

    transition: all 300ms ease-in-out;

    @media(max-width: 830px){
        width: 400px;
        height: 585px;
        overflow-y: scroll;

    }

    `;

export const CategoryBoxTitle = styled.h2`
    display: block;
    width: 100%;
    padding: 0 0 12px 0;
    margin: 0 0 12px 0;
    font-size: 1.8em;
    border-bottom: 1px solid;
    border-color: ${props => props.theme.colors.accent};
`;

export const BrandsPlaceholder = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
`;

export const BrandsContainer = styled.section`
    width: 227px;
    position: absolute;
    height: 585px;
    max-height: 585px;
    top: 0;
    right: 0;
    margin: 0 !important;
    transform: translate(calc(100% + 36px), -36px);
    background: #fff;
    padding: 36px 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important;
`;

export const BrandsHeader = styled.h2`
    color: #000;
    font-weight: 650;
    font-size: 1.2em;
    width: 100%; 
    border-bottom: 1px solid;
    padding-bottom: 12px;
    text-align: center;
`;

export const BrandsList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-top: 22px;
`;

export const BrandItem = styled.li`
    width: 95px;
    height: 48px;
    padding: 2px;
    color: #000;
    display: flex;
    justify-content: center;
    align-content: center;
`;

export const Departament = styled.section`
    background: none;
    display: flex;
    flex-direction: column;
`;

export const DepartamentHeader = styled.h2`
    color: #fff;
    font-weight: 650;
    font-size: 1em;
    width: 100%;
    text-align: left;
`;

export const DepartamentContentList = styled.ul`
    list-style: none;
    text-align: left;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    width: 194px;
`;

export const DepartamentContentItem = styled.li`
    padding: 0 0;
    color: #fff;
    flex-grow: 1;
    line-height: 22px;
    a{
        font-size: 14px;
    }
`;