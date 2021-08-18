import { Paper, Tabs, Tab } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FindReplace } from "@material-ui/icons";

import "./Home.css";

export default function Home() {
  const { t } = useTranslation();

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="shadow-none border-b-2">
      <Tabs
        aria-label="main tabs"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label={
            <label className="flex items-center">
              <FindReplace color="primary" className="mr-1"/>
              <h1 className="text-lg">
                <span className="capitalize inline-block">{t("main.title_p1")}</span>
                <span className="capitalize inline-block font-semibold">{t("main.title_p2")}</span>
              </h1>
            </label>
          }
          className="pointer-events-none"
        />
        <Tab label={t("home.currency_converter")} />
        <Tab label={t("home.view_conversion_history")} />
      </Tabs>
    </Paper>
  );
}
