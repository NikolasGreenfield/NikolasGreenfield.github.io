import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';

import MainPage from './components/mainPage/MainPage';
import AboutPage from './components/aboutPage/AboutPage';
import ExperiencePage from './components/experiencePage/ExperiencePage';

import './App.scss';

/**
  The main functional component that the entire app resides in.
  Composed of a single browser router to route to each page based on current
  url subdirectory.
*/
function App() {
  return (
    <div className="App">
      {/*
      The main Routing structure. Each link changes the path, and a
      switch decides what component is displayed based on the altered
      path.
      The default path routes back to "/".
      */}
      <BrowserRouter>
          <Switch>
              <Route exact path={"/"}>
                  <MainPage />
              </Route>

              <Route path={"/about"}>
                  <AboutPage />
              </Route>

              <Route path={"/experience"}>
                  <ExperiencePage />
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