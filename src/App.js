import "./App.css";

import "./locale/index.js";

import {  ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";
import Pages from "./pages/Pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App pt-4">
        <Pages/>
      </div>
    </ThemeProvider>
  );
}

export default App;
