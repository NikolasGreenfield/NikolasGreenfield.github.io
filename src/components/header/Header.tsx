import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Header.scss';

interface IProps{ 
    title: string;
    className: string;
}

function Header({title, className}: IProps): JSX.Element {
    return (
        <div className={className}>
            <h1 className="position-absolute top-50 start-50 translate-middle">
            {title}
            </h1>

            <div className="position-absolute bottom-0 end-0 Links">
                <Link to="/home"><Button><div className="Link">
                Home
                </div></Button></Link>

                <Link to="/about"><Button><div className="Link">
                About Me
                </div></Button></Link>

                <Link to="/experience"><Button><div className="Link">
                Experience
                </div></Button></Link>
            </div>
        </div>
    );
}

export default Header;