import "./App.css";
import Home from "./pages/Home/Home";

import "./locale/index.js";

import {  ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App pt-4">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
