import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header({color, setColor}:any): JSX.Element {
    return (
        <div className={color}>
            <h1>Nikolas Greenfield</h1>

                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about-me">About Me</Link>
                    </li>
                </ul>
        </div>
    );
}

export default Header;
