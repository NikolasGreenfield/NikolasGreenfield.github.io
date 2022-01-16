import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Header from '../header/Header';
import './Page.scss';

function Page({color, setColor}:any): JSX.Element {
    return(
        <>
            {/*
            The main Routing structure. Each link changes the path, and a
            switch decides what component is displayed based on the altered
            path.
            */}
            <BrowserRouter>
                <Header color="red" setColor={setColor}></Header>

                <Switch>
                <Route path={"/home"}>
                    <h1>Home Page</h1>
                </Route>
                <Route path={"/about-me"}>
                    <h1>About Me</h1>
                </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Page;