import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './AboutPage.scss';

function AboutPage(): JSX.Element {
    return(
        <>
            <Header title="About Me" className="Other" />
            <h1>About Page</h1>
            <Footer />
        </>
    );
}

export default AboutPage;