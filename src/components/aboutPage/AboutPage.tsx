import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './AboutPage.scss';

function AboutPage(): JSX.Element {
    return(
        <>
            <Header title="About Me" className="Other" />
            <p>
            I am a current Virginia Tech computer science undergrad,
            in the class of 2023. After 8 years of leading a Vex Robotics
            team and since going to Virginia Tech, I have had a lot of
            experience and am excited to continue my journey in a field that
            I find so interesting.
            </p>
            <p>
            As my older brothers were software engineers, I started programing
            early and have had a great deal of interest in coding and software
            development. There will always be new opportunities for me to learn
            and make incredible things and I am eager to discover them.
            </p>
            <Footer />
        </>
    );
}

export default AboutPage;