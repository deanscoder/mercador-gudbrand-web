import React from 'react';
import Link from 'next/link';
import {
    Base,
    Singular,
    Shorter,
    Micro
} from './styles';

const logoImage = '/gudbrand.svg'
const retractImage = '/gud.png'


const Logo = () => {
    return (
        <Base>
            <a href='/#' title="Gudbrand Vestuários">
                <Singular>
                    <p><span>Gud</span>brand</p>
                </Singular>
                <Shorter src={retractImage} />
                {/* <Micro>Gud</Micro> */}
            </a>
        </Base>
    );
}

export default Logo;