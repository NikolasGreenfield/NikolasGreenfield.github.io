import React from 'react';
import { Link } from "react-router-dom";

import './MainPage.scss';

function MainPage() {
    return (
        <div>
            <h1>MainPage</h1>
            <Link to={'portfolio'}>To Portfolio</Link>
        </div>
    );
}

export default MainPage;