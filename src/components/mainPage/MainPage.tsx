import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './MainPage.scss';
import Headshot from '../../assets/Headshot.jpg';

function MainPage(): JSX.Element {
    return(
        <div className="MainPage">
            <div className="WelcomeSection">
                <h1>Welcome To My Site!</h1>
            </div>

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
        </div>
    );
}

export default MainPage;