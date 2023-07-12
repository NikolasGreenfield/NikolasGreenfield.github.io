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
    const [BioTextStyle, setBioTextStyle] = useState({});
    const [pageContentStyle, setPageContentStyle] = useState({});

    useEffect(() => {
        setPageContentStyle({visibility: "hidden"});
        setTimeout(() => {
            setTitleTextStyle({visibility: "visible"});
        }, 1000);
        setTimeout(() => {
            setTitleTextStyle2({visibility: "visible"});
        }, 2000);
        setTimeout(() => {
            setTitleCardStyle({animation: "TitleCardMoveToStart 3s forwards"});
            setTitleTextStyle({visibility: "visible",
                                animation: "TitleTextBecomeInline 3s forwards"});
            setTitleTextStyle2({visibility: "visible",
                                animation: "TitleTextBecomeInline 3s forwards"});
            setBioTextStyle({visibility: "visible",
                                animation: "ease-in 4s"});
            setPageContentStyle({visibility: "visible",
                                animation: "fadeIn 4s"});
        }, 4000);
    }, []);

    return (
        <div id="MainPage" >
            <div id="TitleCard" style={titleCardStyle}>
                <img id="ProfPhoto" 
                    className="TitleCardElement"
                    src={ProfPhoto} 
                    alt="Me at graduation."
                />
                <div id="BioSection">
                    <div id="BioTitle">
                        <h1 className="TitleText" style={titleTextStyle}>Hi</h1>
                        <h1 className="TitleText" style={titleTextStyle2}>, I'm Nik</h1>
                    </div>
                    <p id="BioText" style={BioTextStyle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Bibendum neque egestas congue quisque. 
                        Id porta nibh venenatis cras sed felis eget. Parturient montes nascetur 
                        ridiculus mus mauris. Quis commodo odio aenean sed adipiscing diam donec. 
                        Vel eros donec ac odio. Gravida arcu ac tortor dignissim convallis aenean 
                        et. Leo in vitae turpis massa sed elementum. Urna neque viverra justo nec. 
                        Sit amet nisl purus in. Consequat id porta nibh venenatis.
                        <br/>
                        Ac felis donec et odio pellentesque. Eget magna fermentum iaculis eu non. Commodo sed egestas 
                        egestas fringilla phasellus faucibus scelerisque eleifend. Quam id leo in vitae 
                        turpis massa. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. 
                        Arcu vitae elementum curabitur vitae nunc. Laoreet sit amet cursus sit amet. 
                        Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                    </p>
                </div>
            </div>
            <div style={pageContentStyle}>
                <div id="PortfolioLinkSection">
                    <h1><Link to={'portfolio'} className="Link">
                        Check Out My Portfolio
                    </Link></h1>
                </div>

                <div id="ExperienceSection" className="SectionBlock">
                    <h2>My Work Experience</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Bibendum neque egestas congue quisque. 
                        Id porta nibh venenatis cras sed felis eget. Parturient montes nascetur 
                        ridiculus mus mauris. Quis commodo odio aenean sed adipiscing diam donec. 
                        Vel eros donec ac odio. Gravida arcu ac tortor dignissim convallis aenean 
                        et. Leo in vitae turpis massa sed elementum. Urna neque viverra justo nec. 
                        Sit amet nisl purus in. Consequat id porta nibh venenatis.
                        <br/>
                        Ac felis donec et odio pellentesque. Eget magna fermentum iaculis eu non. Commodo sed egestas 
                        egestas fringilla phasellus faucibus scelerisque eleifend. Quam id leo in vitae 
                        turpis massa. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. 
                        Arcu vitae elementum curabitur vitae nunc. Laoreet sit amet cursus sit amet. 
                        Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                    </p>
                </div>
                <div  id="EducationSection" className="SectionBlock">
                    <h2>My Education</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Bibendum neque egestas congue quisque. 
                        Id porta nibh venenatis cras sed felis eget. Parturient montes nascetur 
                        ridiculus mus mauris. Quis commodo odio aenean sed adipiscing diam donec. 
                        Vel eros donec ac odio. Gravida arcu ac tortor dignissim convallis aenean 
                        et. Leo in vitae turpis massa sed elementum. Urna neque viverra justo nec. 
                        Sit amet nisl purus in. Consequat id porta nibh venenatis.
                        <br/>
                        Ac felis donec et odio pellentesque. Eget magna fermentum iaculis eu non. Commodo sed egestas 
                        egestas fringilla phasellus faucibus scelerisque eleifend. Quam id leo in vitae 
                        turpis massa. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. 
                        Arcu vitae elementum curabitur vitae nunc. Laoreet sit amet cursus sit amet. 
                        Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                    </p>
                </div>
                <div  id="SkillsSection" className="SectionBlock">
                    <h2>My Skills</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Bibendum neque egestas congue quisque. 
                        Id porta nibh venenatis cras sed felis eget. Parturient montes nascetur 
                        ridiculus mus mauris. Quis commodo odio aenean sed adipiscing diam donec. 
                        Vel eros donec ac odio. Gravida arcu ac tortor dignissim convallis aenean 
                        et. Leo in vitae turpis massa sed elementum. Urna neque viverra justo nec. 
                        Sit amet nisl purus in. Consequat id porta nibh venenatis.
                        <br/>
                        Ac felis donec et odio pellentesque. Eget magna fermentum iaculis eu non. Commodo sed egestas 
                        egestas fringilla phasellus faucibus scelerisque eleifend. Quam id leo in vitae 
                        turpis massa. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. 
                        Arcu vitae elementum curabitur vitae nunc. Laoreet sit amet cursus sit amet. 
                        Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                    </p>
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