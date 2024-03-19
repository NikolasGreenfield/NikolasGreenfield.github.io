import React, { useState, useEffect, useRef } from "react";
import "./FloatingTextGraph.scss";

/**
 * Class encompassing a graph of moving text.
 * The text bubbles move naturally, and can be moved manually, giving them velocity.
 */
class TextGraph {
    private static TitleFont: string = "70px Arial";
    private static TextFont: string = "30px Arial";
    private static TitleColor: string = "white";
    private static TextColor: string = "black";
    private static BlockColors: string[] = ["darkgrey", "blue", "red"];
    private Blocks: TextBlock[];
    private DefaultSpeed: number;
    private HasLines: boolean;

    public readonly RefreshInterval: number = 10;
    public Width: number;
    public Height: number;
    public Canvas: CanvasRenderingContext2D | null = null;

    public constructor(defaultSpeed: number, hasLines: boolean) {
        this.DefaultSpeed = defaultSpeed / (1000 / this.RefreshInterval);
        this.Width = 0;
        this.Height = 0;
        this.HasLines = hasLines;

        this.Blocks = new Array<TextBlock>();
    }

    /**
     * Ensures that the dimensions of the Text Graph are the given width and height.
     * @param newWidth The intended width of the graph.
     * @param newHeight The intended height of the graph.
     */
    public SetDimensions(
        newWidth: number,
        newHeight: number,
        canvas: CanvasRenderingContext2D
    ): void {
        if (this.Width === newWidth && this.Height === newHeight) {
            return;
        }

        // Set Graph dimensions.
        this.Width = newWidth;
        this.Height = newHeight;
        this.Canvas = canvas;

        // Reposition the title block.
        if (this.Blocks.length > 0) {
            this.AddTitleBlock(this.Blocks[0].Text);
        }
    }

    /**
     * Repositions all blocks to ensure that they are not overlapping.
     */
    private EnsureNotColliding(block: TextBlock): void {
        let Colliding: boolean;
        do {
            Colliding = false;

            for (let i = 0; i < this.Blocks.length; i++) {
                let other: TextBlock = this.Blocks[i];
                if (other === block) {
                    continue;
                }

                if (
                    block.XPos + block.Width >= other.XPos &&
                    block.XPos <= other.XPos + other.Width &&
                    block.YPos + block.Height >= other.YPos &&
                    block.XPos < other.XPos + other.Width
                ) {
                    Colliding = true;
                }
            }

            if (Colliding) {
                block.XPos = Math.floor(Math.random() * this.Width);
                block.YPos = Math.floor(Math.random() * this.Height);
            }
        } while (Colliding);
    }

    /**
     * Adds a new Text Block to the graph with a random position and initial direction.
     * @param text The new text to display in the graph.
     */
    public AddBlock(text: string): void {
        if (this.Canvas == null) {
            return;
        }
        for (let i = 0; i < this.Blocks.length; i++) {
            if (this.Blocks[i].Text === text) {
                return;
            }
        }

        this.Canvas.font = TextGraph.TextFont;
        this.Canvas.textAlign = "center";
        let metrics = this.Canvas.measureText(text);
        let newWidth = metrics.width * 1.1;
        let newHeight = metrics.fontBoundingBoxAscent * 1.8;

        let Colliding: boolean;
        do {
            Colliding = false;
            let newXPos = Math.floor(Math.random() * (this.Width - newWidth));
            let newYPos = Math.floor(Math.random() * (this.Height - newHeight));

            for (const value of this.Blocks) {
                if (
                    newXPos + newWidth >= value.XPos &&
                    newXPos <= value.XPos + value.Width &&
                    newYPos + newHeight >= value.YPos &&
                    newYPos <= value.YPos + value.Height
                ) {
                    Colliding = true;
                }
            }

            if (!Colliding) {
                this.Blocks.push(
                    new TextBlock(
                        text,
                        newXPos,
                        newYPos,
                        newWidth,
                        newHeight,
                        this.DefaultSpeed,
                        TextGraph.GetRandomColor()
                    )
                );
            }
        } while (Colliding);
    }

    /**
     * Adds the given title
     * @param title The title of the graph to display in the center of the graph.
     */
    public AddTitleBlock(title: string): void {
        if (this.Canvas == null) {
            return;
        }

        this.Canvas.font = TextGraph.TitleFont;
        this.Canvas.textAlign = "center";
        let metrics = this.Canvas.measureText(title);
        let newWidth = metrics.width * 1.1;
        let newHeight = metrics.fontBoundingBoxAscent * 1.8;
        let newX = this.Width / 2 - newWidth / 2;
        let newY = this.Height / 2 - newHeight / 2;
        let newTitleBlock = new TextBlock(
            title,
            newX,
            newY,
            newWidth,
            newHeight,
            0,
            TextGraph.TitleColor
        );

        if (this.Blocks.length > 0) {
            this.Blocks[0] = newTitleBlock;
        } else {
            this.Blocks.push(newTitleBlock);
        }
    }

    private SetBlockWidths() {
        if (this.Canvas == null) {
            return;
        }

        for (let block of this.Blocks) {
            let metrics = this.Canvas.measureText(block.Text);
            block.Width = metrics.width * 1.1;
            block.Height = metrics.fontBoundingBoxAscent * 1.8;
        }
    }

    /**
     * Move all Text Blocks by their current velocities at the set drift speed.
     */
    public MoveBlocks(): void {
        this.Blocks.forEach((value) => {
            // Collision with bounding box
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

        this.HandleCollisions();
    }

    /**
     * Check all block positions. If two collide, change their directions only.
     */
    HandleCollisions(): void {
        for (let i = 0; i < this.Blocks.length; i++) {
            for (let j = i + 1; j < this.Blocks.length; j++) {
                let block1: TextBlock = this.Blocks[i];
                let block2: TextBlock = this.Blocks[j];
                if (
                    Math.abs(block1.XPos - block2.XPos) <=
                        Math.max(block1.Width, block2.Width) &&
                    Math.abs(block1.YPos - block2.YPos) <=
                        Math.max(block1.Height, block2.Height)
                ) {
                    if (i === 0) {
                        block2.XVel = -block2.XVel;
                        block2.YVel = -block2.YVel;
                        continue;
                    }

                    let temp: number = block1.XVel;
                    block1.XVel = block2.XVel;
                    block2.XVel = temp;

                    temp = block1.YVel;
                    block1.YVel = block2.YVel;
                    block2.YVel = temp;
                }
            }
        }
    }

    /**
     * Determines if the graph already has the given text within it.
     * @param text The text to check.
     * @returns True if the given text is already in the graph, false otherwise.
     */
    public HasText(text: string): boolean {
        this.Blocks.forEach((block) => {
            if (block.Text === text) {
                return true;
            }
        });

        return false;
    }

    /**
     * Removes all Text Blocks in the graph, excluding the title block.
     */
    public ClearBlocks(): void {
        this.Blocks = [this.Blocks[0]];
    }

    /**
     * Gets a random Block color from the BlockColors array.
     * @returns A random Text Block color.
     */
    static GetRandomColor(): string {
        let randInd = Math.floor(Math.random() * TextGraph.BlockColors.length);
        return TextGraph.BlockColors[randInd];
    }

    /**
     * Draws the Text Blocks onto the given canvas at their set width and height.
     * @param canvas The Canvas rendering context to draw the elements onto.
     */
    Draw(canvas: CanvasRenderingContext2D): void {
        canvas.clearRect(0, 0, this.Width, this.Height);

        // Draw their lines to the center first to avoid overlap.
        if (this.HasLines) {
            for (let i = 0; i < this.Blocks.length; i++) {
                let curr: TextBlock = this.Blocks[i];
                canvas.moveTo(this.Width / 2, this.Height / 2);
                canvas.lineTo(curr.XPos + curr.Width / 2, curr.YPos + curr.Height / 2);
                canvas.stroke();
            }
        }

        // Draw the text blocks.
        for (let i = 0; i < this.Blocks.length; i++) {
            let curr: TextBlock = this.Blocks[i];

            // Draw rectangle around Text.
            canvas.beginPath();
            canvas.fillStyle = curr.Color;
            canvas.fillRect(curr.XPos, curr.YPos, curr.Width, curr.Height);
            canvas.stroke();

            // Draw Text
            canvas.font = i === 0 ? TextGraph.TitleFont : TextGraph.TextFont;
            canvas.textAlign = "center";
            canvas.fillStyle = TextGraph.TextColor;
            canvas.fillText(
                curr.Text,
                curr.XPos + curr.Width / 2,
                curr.YPos + curr.Height * 0.8
            );
        }
    }
}

/**
 * Represents the text bubbles in the bio section which
 * drift naturally and can be moved by the player.
 */
class TextBlock {
    public Text: string;
    public Color: string;
    public Width: number;
    public Height: number;
    // Positions in pixels.
    public XPos: number;
    public YPos: number;
    // Velocities in pixels per second.
    public XVel: number;
    public YVel: number;
    // Direction, in degrees, that the TextBlock will move in naturally
    public DriftDirection: number;

    /**
     * Creates a new TextBlock with the given text, random position and random drive direction
     * @param text
     * @param sectionData
     */
    constructor(
        text: string,
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        defaultSpeed: number,
        color: string
    ) {
        this.Text = text;
        this.Color = color;

        this.XPos = xPos;
        this.YPos = yPos;
        this.Width = width;
        this.Height = height;

        this.DriftDirection = Math.floor(Math.random() * 360);

        this.XVel = defaultSpeed * Math.cos(this.DriftDirection);
        this.YVel = defaultSpeed * Math.sin(this.DriftDirection);
    }
}

/**
 * Creates a FloatingTextGraph with the given strings, which freely float the canvas.
 * @prop Texts The strings to display in the floating text graph.
 * @prop WidthFactor The fraction of the window's width to make the graph.
 * @prop HeightFactor The fraction of the window's height to make the graph.
 * @returns The new FloatingTextGraph component.
 */
function FloatingTextGraph({
    Title = "",
    Texts,
    WidthFactor,
    HeightFactor,
    Speed = 20,
    HasLines = false,
}: {
    Title: string;
    Texts: string[];
    WidthFactor: number;
    HeightFactor: number;
    HasLines?: boolean;
    Speed?: number;
}) {
    const GraphContainer: React.RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);
    const [textGraph] = useState<TextGraph>(new TextGraph(Speed, HasLines));
    const [reRender, setReRender] = useState<boolean>(false);

    // Add given texts to the graph on first render.
    useEffect(() => {
        const canvas = GraphContainer?.current?.getContext("2d");
        if (!canvas) {
            return;
        }
        textGraph.SetDimensions(
            window.innerWidth * WidthFactor,
            window.innerHeight * HeightFactor,
            canvas
        );

        textGraph.AddTitleBlock(Title);
        Texts.forEach((text: string) => {
            textGraph.AddBlock(text);
        });
    }, []);

    // Draw the Text Graph on each render.
    useEffect(() => {
        const canvas = GraphContainer?.current?.getContext("2d");
        if (!canvas) {
            return;
        }

        textGraph.SetDimensions(
            window.innerWidth * WidthFactor,
            window.innerHeight * HeightFactor,
            canvas
        );
        textGraph.Draw(canvas);
    });

    // Rerender the component every Refresh Interval to do animations.
    setTimeout(() => {
        textGraph.MoveBlocks();
        setReRender(!reRender);
    }, textGraph.RefreshInterval);

    return (
        <canvas
            id="TextGraphCanvas"
            ref={GraphContainer}
            width={window.innerWidth * WidthFactor}
            height={window.innerHeight * HeightFactor}
        />
    );
}

export default FloatingTextGraph;
