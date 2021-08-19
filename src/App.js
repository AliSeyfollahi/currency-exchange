import "./App.css";
import Home from "./pages/Home/Home";

import "./locale/index.js";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
const theme = createTheme({
  palette: {
    primary: teal,
  },
});

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
