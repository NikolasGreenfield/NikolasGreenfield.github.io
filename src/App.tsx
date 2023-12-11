import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import './App.scss';
import MainPage from './Components/MainPage/MainPage';
import PortfolioPage from "./Components/PortfolioPage/PortfolioPage";
import {red} from '@mui/material/colors';

// Defines the paths for routing between pages
const router = createBrowserRouter([
  {path: "/", element: <MainPage/>},
  {path: "/portfolio", element: <PortfolioPage/>},
]);

// Defines the theme used for mui components.
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: red,
  }
});

/**
 * Main component of the application which routes between pages.
 */
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
