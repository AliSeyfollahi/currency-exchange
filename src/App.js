import { Container } from "@material-ui/core";
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
      <Container className="App pt-4">
        <Home />
      </Container>
    </ThemeProvider>
  );
}

export default App;
