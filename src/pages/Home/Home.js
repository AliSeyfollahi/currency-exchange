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
    <Paper id="main-tab">
      <Tabs
        
        aria-label="main tabs"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          className="title-tab"
          label={
            <>
              <FindReplace color="primary" />
              <h1>
                <span>{t("main.title_p1")}</span>
                <span>{t("main.title_p2")}</span>
              </h1>
            </>
          }
          disabled
        />
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Paper>
  );
}
