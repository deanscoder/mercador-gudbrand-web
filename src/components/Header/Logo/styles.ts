import styled from 'styled-components';

export const Base = styled.div`
    position: relative;
    width: 120px;
`;

export const Singular = styled.div`
    width: 100%;
    color: #f5f5f5;
    font-family: 'Righteous';
    font-size: 1.6em;
    span {
        color: ${props => props.theme.colors.accent};
    }
    @media (max-width: 800px) {
        display: none;
    }
`;

export const Shorter = styled.img`
    display: none;

    @media (max-width: 800px) {
        width: 42px;
        padding: 5px 0;
        object-fit: cover;
        display: block;
    }
`;

export const Micro = styled.h1`
    display: none;
    font-family: 'Righteous';
    color: ${props => props.theme.colors.accent};
    font-weight: 600;
    @media (max-width: 800px) {
        display: block;
    }
`