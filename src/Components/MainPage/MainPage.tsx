import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
//import ContrastIcon from '@mui/icons-material/Contrast';
import PermMediaIcon from '@mui/icons-material/PermMedia';
//import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';

import './MainPage.scss';
import ProfPhoto from './CapAndGownPhoto.png'

function MainPage() {
    const [titleCardClass, setTitleCardClass] = useState<string>("");
    const [floatingButtonStyle, setFloatingButtonStyle] = useState<React.CSSProperties>({});
    const [titleTextStyle, setTitleTextStyle] = useState<React.CSSProperties>({});
    const [titleTextStyle2, setTitleTextStyle2] = useState<React.CSSProperties>({});
    const [BioTextStyle, setBioTextStyle] = useState<React.CSSProperties>({});
    const [pageContentStyle, setPageContentStyle] = useState<React.CSSProperties>({});

    const navigate = useNavigate();

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
            {/*
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
            */}

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
                        <p style={{textAlign: "center"}}>
                            Fresh graduate of Virginia Tech | Software Engineer | Gamer
                        </p>
                        <p style={{textIndent: "1em"}}>
                            I graduated at the age of 17 with my associates
                            degree and got my bachelors in computer science at 20.
                        </p>
                        <p style={{textIndent: "1em"}}>
                            Both of my older brothers are software engineers, so they
                            stareted me on programming early, and it has captivated me ever since. The majority of my experience is in full
                            stack we development, but application development andn robotics are big interests of mine.
                        </p>
                    </div>
                </div>
            </div>
            <div id="ResumeContentBlock" style={pageContentStyle}>
                <div id="PortfolioLinkSection">
                    <Button className="RoutingButton"
                        variant="contained"
                        onClick={() => {navigate('portfolio')}}>
                        <PermMediaIcon sx={{ mr: "1em" }}/>
                        Check Out My Portfolio
                    </Button>
                    <Button className="RoutingButton"
                        variant="contained"
                        onClick={() => {
                            window.open(
                                "https://github.com/NikolasGreenfield/NikolasGreenfield.github.io/"
                                ,
                                "_blank")}
                        }>
                        <GitHubIcon sx={{ mr: "1em" }}/>
                        Look at the code for this site on my Github!
                    </Button>
                </div>

                <div  id="EducationSection" className="SectionBlock">
                    <h1 className="SectionHeader" style={{textAlign: "center"}}>My Education</h1>
                    <div className="ResumeItemHeader ShortenedWidth">
                        <h3 className="NoMP">Virginia Tech</h3>
                        <h3 className="NoMP">Graduated: May 2023</h3>
                    </div>
                    <div className="ResumeItemHeader ShortenedWidth">
                        <h3 className="NoMP">Bachelor of Science in Computer Science</h3>
                        <h3 className="NoMP">GPA: 3.66</h3>
                    </div>
                    <div className="ResumeItemHeader ShortenedWidth">
                        <h3 className="NoMP" style={{fontSize: "0.9em", paddingLeft: "1em"}}>Beyond Boundaries Scholarship (2020-2023)</h3>
                    </div>
                    <div className="ResumeItemHeader ShortenedWidth">
                        <h3 className="NoMP" style={{marginTop: "2em"}}>Germanna Scholars Student</h3>
                        <h3 className="NoMP" style={{marginTop: "2em"}}>Graduated: May 2020</h3>
                    </div>
                    <div className="ResumeItemHeader ShortenedWidth">
                        <h3 className="NoMP">General Studies associate degree</h3>
                        <h3 className="NoMP">GPA: 4.0</h3>
                    </div>
                    <div className="ResumeItemHeader ShortenedWidth">
                        <h3 className="NoMP" style={{fontSize: "0.9em", paddingLeft: "1em"}}>President's List (2018-2020)</h3>
                    </div>
                </div>

                <div id="ExperienceSection" className="SectionBlock">
                    <h1 className="SectionHeader">My Experience</h1>
                    <div className="ResumeItemHeader">
                        <h3>Software Engineering Internship - Parsons Corporation</h3>
                        <h3>May 2023 - Aug 2023</h3>
                    </div>
                    <ul className="BulletList">
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
                    <div className="ResumeItemHeader">
                        <h3>Capstone React Native Mobile App (Group Project)</h3>
                        <h3>Spring 2023</h3>
                    </div>
                    <ul className="BulletList">
                        <li>
                            Developed a cross-platform React Native mobile application applying Google’s Maps and Trail APIs for an interactive map-oriented game which will educate children about nature while exploring through a scavenger hunt system with game scoring mechanics.                        </li>
                        <li>
                            Utilized Amazon Web Services (AWS) to create a RESTful API using Lambda Functions and the AWS Amplify library to interact with a DynamoDB No-SQL database to authenticate users and securely store user account and app information.
                        </li>
                        <li>
                            Followed Agile methodologies such as sprints, standups, and sprint planning meetings to complete user stories managed with a Trello board and coordinated code version control using Git and GitHub.
                        </li>
                    </ul>
                    <div className="ResumeItemHeader">
                        <h3>Machine Learning Course</h3>
                        <h3>Spring 2023</h3>
                    </div>
                    <ul className="BulletList">
                        <li>
                            Learned major deep learning algorithms such as CNN and DNN, linear regression algorithms such as logistic regression and support vector machines, and decision trees, K-Nearest-Neighbors, and Naïve Bayes algorithms.                        </li>
                        <li>
                            Implemented multi-layer perceptron and CNN algorithms to identify handwritten digits in a final group project utilizing the Pytorch, NumPy, and Matplotlib python libraries.
                        </li>
                    </ul>
                    <div className="ResumeItemHeader">
                        <h3>Vex Robotics Team Leader</h3>
                        <h3>2012-2020</h3>
                    </div>
                    <ul className="BulletList">
                        <li>
                            As team leader, I lead teammates in designing, building, and programming robots and directed team responsibilities and time-management to compete in competition.
                        </li>
                        <li>
                            Competed in the Vex Robotics 2018 & 2019 State Championships.
                        </li>
                        <li>
                            Learned how to code effectively in the C-based “Robot C” programming language.
                        </li>
                    </ul>
                    <div className="ResumeItemHeader">
                        <h3>Other Skills</h3>
                    </div>
                    <ul className="BulletList">
                        <li>
                            JavaScript, Typescript, C, C++, Python, and Arduino programming languages
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MainPage;