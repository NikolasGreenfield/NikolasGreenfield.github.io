import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Fab } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import HomeIcon from '@mui/icons-material/Home';

import './MainPage.scss';
import ProfPhoto from './CapAndGownPhoto.png'

function MainPage() {
    const [titleCardClass, setTitleCardClass] = useState<string>("");
    const [floatingButtonStyle, setFloatingButtonStyle] = useState<React.CSSProperties>({});
    const [titleTextStyle, setTitleTextStyle] = useState<React.CSSProperties>({});
    const [titleTextStyle2, setTitleTextStyle2] = useState<React.CSSProperties>({});
    const [BioTextStyle, setBioTextStyle] = useState<React.CSSProperties>({});
    const [pageContentStyle, setPageContentStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        setBioTextStyle({opacity: "0"});
        setPageContentStyle({opacity: "0"});
        setFloatingButtonStyle({opacity: "0"});
        setTimeout(() => {
            setTitleTextStyle({visibility: "visible"});
        }, 1000);
        setTimeout(() => {
            setTitleTextStyle2({visibility: "visible"});
        }, 2000);
        setTimeout(() => {
            setTitleCardClass("ShrinkTitleCardAnimation");
            setBioTextStyle({transition: "opacity 1s linear"});
            setPageContentStyle({transition: "opacity 1s linear"});
            setFloatingButtonStyle({transition: "opacity 1s linear"});
        }, 4000);
    }, []);

    return (
        <div id="MainPage" >
            <Fab className="FloatingButton" id="ThemeFloatingButton"
                style={floatingButtonStyle}>
                <ContrastIcon/>
            </Fab>
            <div id="NavigationButtons">
                <Fab variant="extended" className="FloatingButton" id="PortfolioFloatingButton"
                    style={floatingButtonStyle}>
                    <PermMediaIcon sx={{ mr: 1 }}/>
                    <h3>Portfolio</h3>
                </Fab>
                <Fab variant="extended" className="FloatingButton" id="HomeFloatingButton"
                    style={floatingButtonStyle}>
                    <HomeIcon sx={{ mr: 1 }}/>
                    <h3>Home</h3>
                </Fab>
            </div>

            <div id="TitleCard" className={titleCardClass}>
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
                    <div id="BioText" style={BioTextStyle}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua. Bibendum neque egestas congue quisque. 
                            Id porta nibh venenatis cras sed felis eget. Parturient montes nascetur 
                            ridiculus mus mauris. Quis commodo odio aenean sed adipiscing diam donec. 
                            Vel eros donec ac odio. Gravida arcu ac tortor dignissim convallis aenean 
                            et. Leo in vitae turpis massa sed elementum. Urna neque viverra justo nec. 
                            Sit amet nisl purus in. Consequat id porta nibh venenatis.
                        </p>
                    </div>
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
                    <div className="ResumeItems">
                        <h3>Software Engineering Internship - Parsons Corporation</h3>
                        <h3 style={{marginLeft: "5vw"}}>May 2023 - Aug 2023</h3>
                    </div>
                    <ul style={{listStyleType: "square"}}>
                        <li>
                            Developed data visualization dashboards, SharePoint list storage solutions, and pdf generators to provide creation, completion, and final storage of user applications utilizing Power Apps, Power Automate, OneDrive, and SharePoint.
                        </li>
                        <li>
                            Actively participated in daily standups, client meetings, sprint retrospective and planning meetings in a remote agile environment.
                        </li>
                        <li>
                            Relied on cooperative development technologies including Jira iteration boards, Azure Dev-Ops, Slack communication, and Confluence documentation to ensure communication within and outside of the team.
                        </li>
                    </ul>
                </div>
                <div  id="EducationSection" className="SectionBlock">
                    <h2 style={{textAlign: "right"}}>My Education</h2>
                    <table>
                        <tr>
                            <td style={{width: "60%"}}>
                                <h3>Virginia Tech</h3>
                                <h3>Bachelor of Science in Computer Science</h3>
                            </td>
                            <td style={{width: "40%", border: "1px solid red"}}>
                                <h3>Graduated: May 2023</h3>
                                <h3>GPA: 3.66</h3>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: "60%"}}>
                                <h3>Germanna Scholars Student</h3>
                            </td>
                            <td style={{width: "40%"}}>
                                <h3>Graduated: May 2020</h3>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: "60%"}}>
                                <h3>General Studies associate degree</h3>
                            </td>
                            <td style={{width: "40%"}}>
                                <h3>GPA: 4.0</h3>
                            </td>
                        </tr>
                    </table>
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
            </div>
        </div>
    );
}

export default MainPage;