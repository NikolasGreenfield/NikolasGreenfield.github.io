import React, { useState, useEffect} from 'react';
import { Fab } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import HomeIcon from '@mui/icons-material/Home';
import { Pages } from '../../Globals';

import './NavigationButtons.scss';

/**
 * The navigation buttons that route to each page of the site, 
 * not including the page the user is currently on.
 * 
 * @param currentPage The current page displaying the navigation buttons.
 * @returns Navigation button component not including the button to the current page.
 */
export function NavigationButtons({currentPage} : {currentPage: Pages}) {
    // Define the page buttons
    const portfolioButton : JSX.Element = (
        <Fab variant="extended" className="NavigationButton" id="PortfolioFloatingButton" 
        href='/portfolio'>
            <PermMediaIcon sx={{ mr: 1 }}/>
            <h3>Portfolio</h3>
        </Fab>
    );
    const homeButton : JSX.Element = (
        <Fab variant="extended" className="NavigationButton" id="HomeFloatingButton" href='/'>
            <HomeIcon sx={{ mr: 1 }}/>
            <h3>Home</h3>
        </Fab>
    );
    const themeButton : JSX.Element = (
        <Fab className="NavigationButton" id="ThemeFloatingButton">
            <ContrastIcon/>
        </Fab>
    );

    // Build list of navigation buttons that do not contain the current page.
    let navigationButtons: JSX.Element[] = [];
    if (currentPage !== Pages.Home)
        navigationButtons.push(homeButton)
    if (currentPage !== Pages.Portfolio)
        navigationButtons.push(portfolioButton)
    navigationButtons.push(themeButton);

    // Return the page buttons
    return (
        <div id="NavigationButtons">
            {navigationButtons}
        </div>
    )
}