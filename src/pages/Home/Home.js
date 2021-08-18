import { Paper, Tabs, Tab } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function () {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        aria-label="main tabs"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Disabled" disabled />
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Paper>
  );
}
