import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, setRef } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./MainPage.scss";
import { Footer } from "../Footer/Footer";
import ProfPhoto from "./CapAndGownPhoto.png";

/**
 * Class encompassing a graph of moving text.
 * The text bubbles move naturally, and can be moved manually, giving them velocity.
 */
class FloatingTextGraph {
    private static TextColor: string = "black";
    private static DescriptorColors: string[] = ["grey", "blue"];
    private Descriptors: BioDescriptor[];
    private DefaultSpeed: number = 80 / (1000 / 10);
    public RefreshInterval: number = 10;
    public Width: number;
    public Height: number;

    constructor(refreshInterval: number = 0, defaultSpeed: number) {
        this.RefreshInterval = refreshInterval;
        this.DefaultSpeed = defaultSpeed;
        this.Descriptors = new Array<BioDescriptor>();
        this.Width = 0;
        this.Height = 0;
    }

    /**
     * Adds a new descriptor to the graph with a random position and initial direction.
     * @param text The new text to display in the graph.
     */
    AddDescriptor(text: string, width: number, height: number) {
        this.Descriptors.push(
            new BioDescriptor(
                text,
                width,
                height,
                this.DefaultSpeed,
                FloatingTextGraph.getRandomColor()
            )
        );
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
        for (let i = 0; i < this.Descriptors.length; i++) {
            for (let j = i + 1; j < this.Descriptors.length; j++) {
                let desc1 = this.Descriptors[i];
                let desc2 = this.Descriptors[j];
                if (
                    Math.abs(desc1.XPos - desc2.XPos) <=
                        Math.max(desc1.Width, desc2.Width) &&
                    Math.abs(desc1.YPos - desc2.YPos) <=
                        Math.max(desc1.Height, desc2.Height)
                ) {
                    desc1.XVel = -desc1.XVel;
                    desc1.YVel = -desc1.YVel;
                    desc2.XVel = -desc2.XVel;
                    desc2.YVel = -desc2.YVel;
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
     * Gets a random descriptor color from the DescriptorColors array.
     * @returns A random descriptor color.
     */
    static getRandomColor(): string {
        let randInd = Math.floor(
            Math.random() * FloatingTextGraph.DescriptorColors.length
        );
        return FloatingTextGraph.DescriptorColors[randInd];
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
            canvas.lineTo(curr.XPos + curr.Width / 2, curr.YPos + curr.Height / 2);
            canvas.stroke();

            // Draw rectangle around text.
            canvas.beginPath();
            canvas.fillStyle = curr.Color;
            canvas.fillRect(curr.XPos, curr.YPos, curr.Width, curr.Height);
            canvas.stroke();

            // Draw descriptor text
            canvas.font = "30px Arial";
            canvas.fillStyle = FloatingTextGraph.TextColor;
            canvas.fillText(curr.Text, curr.XPos, curr.YPos + (curr.Height * 3) / 4);
        }
    }
}

/**
 * Represents the text bubbles in the bio section which
 * drift naturally and can be moved by the player.
 */
class BioDescriptor {
    Text: string;
    Color: string;
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
        defaultSpeed: number,
        color: string
    ) {
        this.Text = text;
        this.Color = color;
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
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth * 0.8);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight * 0.8);
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
        if (
            screenWidth !== window.innerWidth * 0.8 ||
            screenHeight !== window.innerHeight * 0.8
        ) {
            setScreenWidth(window.innerWidth * 0.8);
            setScreenHeight(window.innerHeight * 0.8);
            console.log(screenWidth, window.screen.width);
        }
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
            <div id="BioGraphContainer">
                <canvas
                    id="BioGraphCanvas"
                    ref={GraphContainer}
                    width={screenWidth}
                    height={screenHeight}
                />
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
