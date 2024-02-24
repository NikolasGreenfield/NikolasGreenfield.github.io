import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, setRef } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./MainPage.scss";
import { Footer } from "../Footer/Footer";
import ProfPhoto from "./CapAndGownPhoto.png";

/**
 * Class encompassing the
 */
class FloatingTextGraph {
    Descriptors: BioDescriptor[];
    RefreshInterval: number;
    DefaultSpeed: number;
    XStart: number;
    Width: number;
    YStart: number;
    Height: number;

    constructor(refreshInterval: number, defaultSpeed: number) {
        this.RefreshInterval = refreshInterval;
        this.DefaultSpeed = defaultSpeed;
        this.Descriptors = [];
        this.XStart = 0;
        this.Width = 0;
        this.YStart = 0;
        this.Height = 0;
    }

    /**
     * Adds a new descriptor to the graph with a random position and initial direction.
     * @param text The new text to display in the graph.
     */
    AddDescriptor(text: string, width: number, height: number) {
        this.Descriptors.push(
            new BioDescriptor(text, width, height, this.DefaultSpeed)
        );
    }

    /**
     * Move all bioDescriptors by their curr velocities at the set drift speed.
     */
    MoveDescriptors(): void {
        this.Descriptors.forEach((value) => {
            if (value.XPos < this.XStart) {
                value.XPos = this.XStart;
                value.XVel = -value.XVel;
            } else if (value.XPos + value.Width > this.XStart + this.Width) {
                value.XPos = this.XStart + this.Width - value.Width;
                value.XVel = -value.XVel;
            }
            if (value.YPos < this.YStart) {
                value.YPos = this.YStart;
                value.YVel = -value.YVel;
            } else if (value.YPos + value.Height > this.YStart + this.Height) {
                value.YPos = this.YStart + this.Height - value.Height;
                value.YVel = -value.YVel;
            }

            value.XPos += value.XVel;
            value.YPos += value.YVel;
        });

        //this.HandleCollisions();
    }

    /**
     * Check all descriptor positions. If two collide, invert their velocities.
     */
    HandleCollisions(): void {
        for (var i = 0; i < this.Descriptors.length; i++) {
            for (var j = i + 1; j < this.Descriptors.length; j++) {
                if (
                    Math.abs(
                        this.Descriptors[i].XPos - this.Descriptors[j].XPos
                    ) <=
                        Math.max(
                            this.Descriptors[i].Width,
                            this.Descriptors[j].Width
                        ) &&
                    Math.abs(
                        this.Descriptors[i].YPos - this.Descriptors[j].YPos
                    ) <=
                        Math.max(
                            this.Descriptors[i].Height,
                            this.Descriptors[j].Height
                        )
                ) {
                    this.Descriptors[i].XVel = -this.Descriptors[i].XVel;
                    this.Descriptors[i].YVel = -this.Descriptors[i].YVel;
                    this.Descriptors[j].XVel = -this.Descriptors[j].XVel;
                    this.Descriptors[j].YVel = -this.Descriptors[j].YVel;
                }
            }
        }
    }

    /**
     * Removes all descriptors in the graph.
     */
    ClearDescriptors(): void {
        this.Descriptors = [];
    }

    /**
     * Converts the graph's descriptors to a jsx element array to display.
     * @returns A JSX Element array representation of the graph's descriptors.
     */
    GenerateJSXElements(): JSX.Element[] {
        let elements: JSX.Element[] = [];

        for (let i = 0; i < this.Descriptors.length; i++) {
            let curr: BioDescriptor = this.Descriptors[i];
            elements.push(
                <h1
                    className="FloatingText"
                    style={{
                        position: "absolute",
                        left: this.XStart + curr.XPos,
                        top: this.YStart + curr.YPos,
                        width: curr.Width,
                        height: curr.Height,
                        backgroundColor: "white",
                        textAlign: "center",
                    }}
                    key={i}
                >
                    {curr.YPos}
                </h1>
            );
        }

        return elements;
    }
}

/**
 * Represents the text bubbles in the bio section which
 * drift naturally and can be moved by the player.
 */
class BioDescriptor {
    Text: string;
    Width: number;
    Height: number;
    // Descriptor Text positions in pixels.
    XPos: number;
    YPos: number;
    // Descriptor velocities in pixels per second.
    XVel: number;
    YVel: number;
    // Direction, in degrees, that the BioDescriptor will move in naturally
    DriftDirection: number;

    /**
     * Creates a new BioDescriptor with the given text, random position and random drive direction
     * @param text
     * @param sectionData
     */
    constructor(
        text: string,
        width: number,
        height: number,
        defaultSpeed: number
    ) {
        this.Text = text;
        this.Width = width;
        this.Height = height;

        this.XPos = Math.floor(Math.random() * 360);
        this.YPos = Math.floor(Math.random() * 360);
        this.DriftDirection = Math.floor(Math.random() * 360);

        this.XVel = defaultSpeed * Math.cos(this.DriftDirection);
        this.YVel = defaultSpeed * Math.sin(this.DriftDirection);
    }
}

/**
 *
 * @returns The Main Page JSX Element
 */
function MainPage() {
    const navigate = useNavigate();
    const [descriptorGraph, setDescriptorGraph] = useState<FloatingTextGraph>(
        new FloatingTextGraph(10, 80 / (1000 / 10))
    );
    const [reRender, setReRender] = useState<boolean>(false);
    const GraphContainer: React.RefObject<HTMLDivElement> =
        useRef<HTMLDivElement>(null);

    // Initialize descriptors in the graph.
    useEffect(() => {
        if (GraphContainer != null && GraphContainer.current != null) {
            var graphContainer = GraphContainer.current.getBoundingClientRect();
            descriptorGraph.XStart = graphContainer.x;
            descriptorGraph.Width = graphContainer.width;
            descriptorGraph.YStart = graphContainer.y;
            descriptorGraph.Height = graphContainer.height;
            console.log(graphContainer.x, graphContainer.width);
            console.log(graphContainer.y, graphContainer.height);
        }

        descriptorGraph.ClearDescriptors();
        descriptorGraph.AddDescriptor("test1", 80, 40);
        descriptorGraph.AddDescriptor("2", 80, 40);
        descriptorGraph.AddDescriptor("test3", 80, 40);
        descriptorGraph.AddDescriptor("test4", 80, 40);
        descriptorGraph.AddDescriptor("test5", 80, 40);
    }, []);

    // Move graph descriptors
    setTimeout(() => {
        descriptorGraph.MoveDescriptors();
        setReRender(!reRender);
    }, descriptorGraph.RefreshInterval);

    return (
        <div id="MainPage">
            <div id="Header">
                <img id="ProfPhoto" src={ProfPhoto} />
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
            <div id="BioGraphContainer" ref={GraphContainer}>
                {descriptorGraph.GenerateJSXElements()}
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
