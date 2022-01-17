import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Header.scss';

function Header({title, headerType}:any): JSX.Element {
    return (
        <div className={headerType}>
            <h1 className="Title">{title}</h1>
            
            <div className="Links">
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