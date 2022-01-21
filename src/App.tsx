import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/header/Header';
import MainPage from './components/mainPage/MainPage';
import AboutPage from './components/aboutPage/AboutPage';
import ExperiencePage from './components/experiencePage/ExperiencePage';
import Footer from './components/footer/Footer';

import './App.scss';

function App() {
  return (
    <div className="App">
      {/*
      The main Routing structure. Each link changes the path, and a
      switch decides what component is displayed based on the altered
      path. If an unknown path, redirect back to home /.
      */}
      <BrowserRouter>
          <Switch>
              <Route exact path={"/"}>
                  <MainPage />
              </Route>

              <Route path={"/about"}>
                  <Header title="About Me" headerType="Other" />
                  <AboutPage />
                  <Footer />
              </Route>

              <Route path={"/experience"}>
                  <Header title="Experience" headerType="Other" />
                  <ExperiencePage />
                  <Footer />
              </Route>

              <Route>
                  <Redirect to="/" />
              </Route>
          </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
