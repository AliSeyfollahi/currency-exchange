import { Container } from "@material-ui/core";
import "./App.css";
import Home from "./pages/Home/Home";

import "./locale/index.js";

function App() {
  return (
    <Container className="App">
      <Home />
    </Container>
  );
}

export default App;
