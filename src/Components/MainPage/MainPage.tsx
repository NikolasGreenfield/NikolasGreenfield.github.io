import React from 'react';
import { Link } from "react-router-dom";

import './MainPage.scss';
import ProfPhoto from './ProfPhoto.jpg'

function MainPage() {
    return (
        <div id="MainPage" >
            <div id="TitleCard">
                <h1 className='TitleText' id='TitleHiText'> Hi </h1>
                <img id='ProfPhoto' src={ProfPhoto} alt="Me at graduation."/>
                <h1 className='TitleText' id='TitleImText'> I'm Nik </h1>
            </div>

            <Link to={'portfolio'}>To Portfolio</Link>
        </div>
    );
}

export default MainPage;