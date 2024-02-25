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
    Width: number;
    Height: number;

    constructor(refreshInterval: number, defaultSpeed: number) {
        this.RefreshInterval = refreshInterval;
        this.DefaultSpeed = defaultSpeed;
        this.Descriptors = [];
        this.Width = 0;
        this.Height = 0;
    }

    /**
     * Adds a new descriptor to the graph with a random position and initial direction.
     * @param text The new text to display in the graph.
     */
    AddDescriptor(text: string, width: number, height: number) {
        this.Descriptors.push(new BioDescriptor(text, width, height, this.DefaultSpeed));
    }

    /**
     * Move all bioDescriptors by their curr velocities at the set drift speed.
     */
    MoveDescriptors(): void {
        this.Descriptors.forEach((value) => {
            if (value.XPos < 0) {
                value.XPos = 0;
                value.XVel = -value.XVel;
            } else if (value.XPos + value.Width > this.Width) {
                value.XPos = this.Width - value.Width;
                value.XVel = -value.XVel;
            }
            if (value.YPos < 0) {
                value.YPos = 0;
                value.YVel = -value.YVel;
            } else if (value.YPos + value.Height > this.Height) {
                value.YPos = this.Height - value.Height;
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
                    Math.abs(this.Descriptors[i].XPos - this.Descriptors[j].XPos) <=
                        Math.max(this.Descriptors[i].Width, this.Descriptors[j].Width) &&
                    Math.abs(this.Descriptors[i].YPos - this.Descriptors[j].YPos) <=
                        Math.max(this.Descriptors[i].Height, this.Descriptors[j].Height)
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
     * Draws the descriptors onto the given canvas at their set width and height.
     * @param canvas The Canvas rendering context to draw the elements onto.
     */
    Draw(canvas: CanvasRenderingContext2D): void {
        canvas.clearRect(0, 0, this.Width, this.Height);

        for (let i = 0; i < this.Descriptors.length; i++) {
            let curr: BioDescriptor = this.Descriptors[i];

            // Line to the center;
            canvas.moveTo(this.Width / 2, this.Height / 2);
            canvas.lineTo(curr.XPos, curr.YPos);
            canvas.stroke();

            // Draw rectangle around text.
            canvas.beginPath();
            canvas.arc(curr.XPos, curr.YPos, curr.Width / 2, 0, 2 * Math.PI);
            canvas.stroke();

            // Draw descriptor text
            canvas.font = "30px Arial";
            canvas.fillText(
                curr.Text,
                curr.XPos - curr.Width / 2,
                curr.YPos + curr.Height / 2
            );
        }
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
    constructor(text: string, width: number, height: number, defaultSpeed: number) {
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
    const GraphContainer: React.RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);

    // Initialize descriptors in the graph.
    useEffect(() => {
        if (GraphContainer != null && GraphContainer.current != null) {
            var graphContainer = GraphContainer.current.getBoundingClientRect();
            descriptorGraph.Width = graphContainer.width;
            descriptorGraph.Height = graphContainer.height;
        }

        descriptorGraph.ClearDescriptors();
        descriptorGraph.AddDescriptor("test1", 80, 40);
        descriptorGraph.AddDescriptor("test2", 80, 40);
        descriptorGraph.AddDescriptor("test3", 80, 40);
        descriptorGraph.AddDescriptor("test4", 80, 40);
        descriptorGraph.AddDescriptor("test5", 80, 40);
    }, []);

    // Draw the Descriptor Graph.
    useEffect(() => {
        const canvas = GraphContainer?.current?.getContext("2d");
        if (!canvas) {
            return;
        }

        descriptorGraph.Draw(canvas);
    });

    // Rerender the component every Refresh Interval to do animations.
    setTimeout(() => {
        descriptorGraph.MoveDescriptors();
        setReRender(!reRender);
    }, descriptorGraph.RefreshInterval);

    return (
        <div id="MainPage">
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
            {/*
            <div id="BioGraphContainer" ref={GraphContainer}>
                {descriptorGraph.GenerateJSXElements()}
            </div>
             */}
            <canvas
                id="BioGraphContainer"
                ref={GraphContainer}
                width="1000"
                height="1000"
            />
            <Footer />
        </div>
    );
}

export default MainPage;
