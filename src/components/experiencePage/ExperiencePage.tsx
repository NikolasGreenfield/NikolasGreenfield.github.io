import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ExperiencePage.scss';

function ExperiencePage(): JSX.Element {
    return (
        <>
            <Header title="Experience" className="Other" />
            <h1>Experience Page</h1>
            <Footer />
        </>
    );
}

export default ExperiencePage;