import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Headshot from '../../assets/Headshot.jpg';
import './MainPage.scss';
import { getAPODURL } from 'APIClients/FetchAPOD';

/**
 * The main page that is displayed by default, giving an introduction and linking to other
 * informational pages.
 * Uses the NASA APOD API to get NASA's daily astronomy picture and uses this iamge as the page
 * background image.
 */
function MainPage(): JSX.Element {
    /*
     * Creates the APODURL string and sets its value using the getAPODURL function.
    */
    const [APODURL, setAPODURL] = useState<string>("");
    useEffect(() => {
        getAPODURL().then((response)=>setAPODURL(response));
    }, []);

    
    /**
     * Returns the tsx div that will be displayed when the component is included.
     */
    return(
        <div className="MainPage" style={{backgroundImage: `url(${APODURL})`}}>
            <Header title="Welcome to the Website" className="Main" />

            <div className="IntroSection">
                <div className="Intro">
                    <h2>I'm Nikolas Greenfield</h2>
                </div>
                <img className="Image" src={Headshot} 
                alt="Very Professional Headshot" />
            </div>

            <div className="VTSection">
                <h2 className="VTSentence">
                I am a Computer Science student at Virginia Tech</h2>
            </div>

            <div className="LinkSection">
                <div className="About">
                    <h2>Continue into the site to learn a little more about me</h2>
                    <Link to="/about"><Button><div className="Link">
                    About
                    </div></Button></Link>
                </div>
                <div className="Experience">
                    <h2>Continue into the site to learn a little more about me</h2>
                    <Link to="/experience"><Button><div className="Link">
                    Experience
                    </div></Button></Link>
                </div>
            </div>
            
            <div className="ExtraLinks">
                <div className="Github">
                    <h2>You can view the source for this site, 
                    and my other projects are my github: </h2>
                    <a href="https://www.github.com/NikolasGreenfield"
                    rel="noreferrer" target="_blank">
                    GitHub<GitHubIcon /></a>
                </div>
                <div className="LinkedIn">
                    <h2>Or you can view my LinkedIn!</h2>
                    <a href="https://www.linkedin.com/in/nikolas-greenfield"
                    rel="noreferrer" target="_blank">
                    LinkedIn<LinkedInIcon /></a>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MainPage;