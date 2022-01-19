import React from 'react'

import './Footer.scss'

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <div className="Contacts">
                <h4>Contact Me At:</h4>
                <ul className="List">
                    <li>Email: NikolasGreenfield@gmail.com</li>
                    <li>Phone: (540)270-2267</li>
                </ul>
            </div>
            <div className="Links">
                <h4>Find Me At:</h4>
                <div className="List">
                    <a href="https://www.github.com/NikolasGreenfield"
                    rel="noreferrer" target="_blank">
                    <button>Github</button></a>
                    <a href="https://www.linkedin.com/in/nikolas-greenfield"
                    rel="noreferrer" target="_blank">
                    <button>Linkedin</button></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;