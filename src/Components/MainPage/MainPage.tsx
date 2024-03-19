import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./MainPage.scss";
import { Footer } from "../Footer/Footer";
import ProfPhoto from "./CapAndGownPhoto.png";
import FloatingTextGraph from "../FloatingTextGraph/FloatingTextGraph";

/**
 *
 * @returns The Main Page JSX Element
 */
function MainPage() {
    const navigate = useNavigate();
    const [BioDescriptors, setBioDescriptors] = useState<string[]>([
        "Virginia Tech Alumnus",
        "Bachelor of Computer Science",
        ".Net Framework Developer",
        "Edge360 Software Developer",
        "React Dev",
        "Gamer",
        "Leet Coder",
        "Amateur Cook",
        "Agile Developer",
        "Good Documenter",
        "Mobile-Compatible Web Mindset",
        "Rest API-er",
        "Multi-Threader",
        "Large Language Model Trainer",
        "2 Year Development Veteran",
        "21 Year Old Innovator",
        "A Team Player",
        "Code Reviewer",
        "Open Source Contributor",
    ]);

    return (
        <div id="MainPage">
            <div id="Body">
                <div id="Header">
                    <img
                        id="ProfPhoto"
                        src={ProfPhoto}
                        alt="Me Graduating from Virginia Tech in 2023."
                    />
                    <div id="LinksSection">
                        <h1 className="TitleText">Hi, I'm Nik</h1>
                        <Button
                            className="RoutingButton"
                            variant="outlined"
                            onClick={() => {
                                navigate("portfolio");
                            }}
                        >
                            <PermMediaIcon sx={{ mr: "1em" }} />
                            Check Out My Portfolio
                        </Button>
                        <Button
                            className="RoutingButton"
                            variant="outlined"
                            onClick={() => {
                                window.open(
                                    "https://github.com/NikolasGreenfield/NikolasGreenfield.github.io/",
                                    "_blank"
                                );
                            }}
                        >
                            <GitHubIcon sx={{ mr: "1em" }} />
                            Look at the code for this site on my Github!
                        </Button>
                    </div>
                </div>
                <hr />

                <div id="DescriptorGraph">
                    <FloatingTextGraph
                        Title="Who am I?"
                        Texts={BioDescriptors}
                        WidthFactor={1}
                        HeightFactor={0.7}
                    />
                </div>
                <hr />
            </div>

            <Footer />
        </div>
    );
}

export default MainPage;
