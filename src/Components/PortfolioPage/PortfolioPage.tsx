import React, { useState, useEffect} from 'react';
import './PortfolioPage.scss';
import { NavigationButtons } from '../NavigationButtons/NavigationButtons';
import { Pages } from '../../Globals'

// Project pages
import NikolasGreenfield from '../ProjectPages/NikolasGreenfield/NikolasGreenfield';

function PortfolioPage() {
    const ProjectPages: JSX.Element[] = [NikolasGreenfield(), NikolasGreenfield(), NikolasGreenfield(), NikolasGreenfield(), NikolasGreenfield(), NikolasGreenfield(), NikolasGreenfield()];
    const [SelectedInd, SetSelectedInd] = 
        useState(Math.floor(ProjectPages.length > 0 ? ProjectPages.length / 2 : 0));
    const [ProjectPage, SetProjectPage] = useState(ProjectPages[SelectedInd]);

    // Variables used for relative positioning of elements, representing vw and vh.
    const GalleryWidth = 100;
    const GalleryHeight = 16;
    const CardBaseWidth = 15;
    const CardBaseHeight = 15;
    const CardGap = 0.5;
    const WidthChange = 1;
    const HeightChange = 1;
    const NumShownEachSide = 2;

    /**
     * Creates a JSX element using existing project pages.
     * When a project displayed in the gallery is selected, it will change the selected
     * project index and display that project page. 
     */
    function CreateGallery(): JSX.Element[] {
        let relativeIndex: number, numAway: number, x: number, y: number, width: number, height: number;
        let GalleryCards: JSX.Element[] = [];
        for(let i = Math.max(SelectedInd - NumShownEachSide, 0); i <= Math.min(SelectedInd + NumShownEachSide, ProjectPages.length - 1); i++) {
            relativeIndex = i - SelectedInd;
            numAway = Math.abs(relativeIndex);
            width = CardBaseWidth - (numAway * WidthChange);
            x = (GalleryWidth / 2) + (relativeIndex * CardBaseWidth) + (relativeIndex * CardGap)
                - (relativeIndex * ((numAway - 1) / 2) * WidthChange) - (width / 2);
            
            height = CardBaseHeight - (numAway * HeightChange);
            y = (GalleryHeight / 2) - (height / 2) + (numAway * HeightChange / 2);

            GalleryCards.push(
                    <div style={{position: "absolute", marginLeft: x + "vw", marginTop: y + "vh", 
                        width: width + "vw", height: height + "vh", backgroundColor:"red"}}
                        onClick={() => {SetSelectedInd(i); SetProjectPage(ProjectPages[i]);}}>
                        <p>{`i: ${i}, x: ${x}, y: ${y}, w: ${width}, h: ${height}`}</p>
                    </div>
            );
        }
        
        return GalleryCards;
    }

    return (
        <div id="PortfolioPage">
            <NavigationButtons currentPage={Pages.Portfolio}/>

            <div id="ProjectGallery">
                {CreateGallery()}
            </div>

            <div id="ProjectPage">
                {ProjectPage}
            </div>
        </div>
    )
}

export default PortfolioPage;