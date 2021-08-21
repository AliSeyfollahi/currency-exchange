import { Container } from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ConversionHistory from "../components/ConversionHistory/ConversionHistory";
import CurrencyConverter from "../components/CurrencyConverter/CurrencyConverter";
import Header from "../components/Header/Header";

export default function Pages() {
  return (
    <Router>
      <Header />
      <div className=" bg-gray-100 p-4 pb-20">
        <Container>
          <Switch>
            <Route path="/ConversionHistory">
              <ConversionHistory />
            </Route>

            <Route path={["/CurrencyConverter/:amount/:from/:to", "/"]}>
              <CurrencyConverter />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
