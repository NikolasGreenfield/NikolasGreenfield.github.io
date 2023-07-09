import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Fab } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import HomeIcon from '@mui/icons-material/Home';

import './MainPage.scss';
import ProfPhoto from './CapAndGownPhoto.png'

function MainPage() {
    const [titleCardStyle, setTitleCardStyle] = useState({});
    const [titleTextStyle, setTitleTextStyle] = useState({});
    const [titleTextStyle2, setTitleTextStyle2] = useState({});
    const [pageContentStyle, setPageContentStyle] = useState({});

    useEffect(() => {
        setPageContentStyle({visibility: "hidden"});
        setTimeout(() => {
            setTitleTextStyle({fontSize: "4em"});
        }, 1000);
        setTimeout(() => {
            setTitleTextStyle2({fontSize: "4em"});
        }, 2000);
        setTimeout(() => {
            setTitleCardStyle({animation: "TitleCardMoveToStart 3s forwards"});
            setPageContentStyle({visibility: "visible", animation: "fadeIn 4s"});
        }, 4000);
    }, []);

    return (
        <div id="MainPage" >
            <div id="TitleCard" style={titleCardStyle}>
                <h1 className="TitleText TitleCardElement" id='TitleHiText' style={titleTextStyle}>
                    Hi
                </h1>
                <img id="ProfPhoto" 
                    className="TitleCardElement"
                    src={ProfPhoto} 
                    alt="Me at graduation."
                />
                <h1 className="TitleText TitleCardElement" id='TitleImText' style={titleTextStyle2}>
                    I'm Nik
                </h1>
            </div>
            <div style={pageContentStyle}>
                <div id="PortfolioLinkSection">
                    <h1><Link to={'portfolio'} className="Link">
                        Check Out My Portfolio
                    </Link></h1>
                </div>

                <div id="ExperienceSection" className="SectionBlock">
                    <h2>My Work Experience</h2>
                    <p></p>
                </div>
                <div  id="EducationSection" className="SectionBlock">
                    <h2>My Education</h2>
                    <p></p>
                </div>
                <div  id="SkillsSection" className="SectionBlock">
                    <h2>My Skills</h2>
                    <p></p>
                </div>


                <Fab variant="extended" className="FloatingButton">
                    <PermMediaIcon sx={{ mr: 1 }}/>
                    <h3>Portfolio</h3>
                </Fab>
                <Fab variant="extended" className="FloatingButton">
                    <HomeIcon sx={{ mr: 1 }}/>
                    <h3>Home</h3>
                </Fab>
                <Fab className="FloatingButton">
                    <ContrastIcon/>
                </Fab>
            </div>
        </div>
    );
}

export default MainPage;