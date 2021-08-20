import { Tabs, Tab, Container } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FindReplace } from "@material-ui/icons";

import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";

import "./Home.css";

export default function Home() {
  const { t } = useTranslation();

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="border-b-2">
        <Container className="flex items-center">
          <Tabs
            aria-label="main tabs"
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label={
                <label className="flex items-center pb-1">
                  <FindReplace color="primary" className="mr-1" />
                  <h1 className="text-xl">
                    <span className="capitalize inline-block">
                      {t("main.title_p1")}
                    </span>
                    <span className="capitalize inline-block font-semibold">
                      {t("main.title_p2")}
                    </span>
                  </h1>
                </label>
              }
              className="pointer-events-none pl-0 mr-3"
            />
            <Tab label={<h2>{t("home.currency_converter")}</h2>} />
            <Tab label={<h2>{t("home.view_conversion_history")}</h2>} />
          </Tabs>
        </Container>
      </div>

      <div className="tabl-panel bg-gray-100 p-4">
        <Container>
          <div hidden={value !== 1}>
            <CurrencyConverter />
          </div>
        </Container>
      </div>
    </>
  );
}
