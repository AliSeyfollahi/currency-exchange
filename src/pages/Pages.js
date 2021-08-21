import React, { Suspense } from "react";
import { Container } from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CurrencyConverter from "../components/CurrencyConverter/CurrencyConverter";
import Header from "../components/Header/Header";
import Loading from "../components/common/Loading/Loading";

const ConversionHistory = React.lazy(() =>
  import("../components/ConversionHistory/ConversionHistory")
);

export default function Pages() {
  return (
    <Router>
      <Header />
      <div className=" bg-gray-100 p-4 pb-20">
        <Container>
          <Switch>
            <Route path="/ConversionHistory">
              <Suspense fallback={<Loading />}>
                <ConversionHistory />
              </Suspense>
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
