import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.scss';
import MainPage from './Components/MainPage/MainPage';

// Defines the paths for routing between pages
const router = createBrowserRouter([
  {path: "/", element: <MainPage/>},
  {path: "/portfolio", element: <div>Portfolio!</div>},
]);

/**
 * Main component of the application which routes between pages.
 */
function App() {
  return (
    <React.StrictMode>
      <div className="App">
          <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}

export default App;
