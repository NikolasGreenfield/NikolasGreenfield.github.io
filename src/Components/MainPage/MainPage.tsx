import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./MainPage.scss";
import { Footer } from "../Footer/Footer";
import ProfPhoto from "./CapAndGownPhoto.png";

/**
 * Data Types
 */
type BioSectionData = {
    XStart: number;
    XEnd: number;
    YStart: number;
    YEnd: number;
    Width: number;
    Height: number;
    DriftSpeed: number; // The rate, in pixels per second, the BioDescriptors will move
}

/**
 * Represents the text bubbles in the bio section which 
 * drift naturally and can be moved by the player.
*/
class BioDescriptor {
    Text: string;
    // Descriptor Text positions in pixels.
    XPos: number;
    Ypos: number;
    // Descriptor velocities in pixels per second.
    XVel: number;
    YVel: number;
    // Direction, in degrees, that the BioDescriptor will move in naturally
    DriftDirection: number;

    constructor(text: string, sectionData: BioSectionData) {
        this.Text = text;
        this.XPos = Math.floor(Math.random() * 360);;
        this.Ypos =Math.floor(Math.random() * 360);;
        this.DriftDirection = Math.floor(Math.random() * 360);;

        this.XVel = 0;
        this.YVel = 0;
    }
}

/**
 * 
 * @returns The Main Page JSX Element
 */
function MainPage() {
    const [bioData, setBioData] = useState<BioSectionData>({
        XStart: 0,
        XEnd: 0,
        YStart: 0,
        YEnd: 0,
        Width: 0,
        Height: 0,
        DriftSpeed: 1,
    });
    const [bioDescriptors, setBioDescriptor] = useState<BioDescriptor[]>([
        new BioDescriptor("", bioData),
        new BioDescriptor("", bioData),
        new BioDescriptor("", bioData),
    ]);

    function CheckCollisions() {

    }

    useEffect(() => {
        console.log("Started");
    }, []);

    const navigate = useNavigate();

    return (
        <div id="MainPage">
            <div id="Header">
                <img id="ProfPhoto" src={ProfPhoto}/>
                <div id="LinksSection">
                    <h1 className="TitleText">Hi, I'm Nik</h1>
                    <Button className="RoutingButton"
                        variant="outlined"
                        onClick={() => {navigate('portfolio')}}>
                        <PermMediaIcon sx={{ mr: "1em" }}/>
                        Check Out My Portfolio
                    </Button>
                    <Button className="RoutingButton"
                        variant="outlined"
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
            </div>
            <hr/>
            <div id="BioDiagram">
                <h1 style={{}}>body</h1>
                <h2 className="FloatingText">Software Engineer</h2>
                <h2 className="FloatingText">Virginia Tech Alumnus</h2>
                <h2 className="FloatingText">Professional Dotnet Framework Developer</h2>
                <h2 className="FloatingText">React Experience</h2>
                <h2 className="FloatingText">Gamer</h2>
            </div>
            <Footer/>
        </div>
    );
}

export default MainPage;
