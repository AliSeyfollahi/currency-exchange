import { Container, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { FindReplace } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);
  const location = useLocation();
  const mediumViewport = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    let value = [null, "", "ConversionHistory"].indexOf(
      location.pathname.split("/")[1]
    );
    setValue(value > 0 ? value : 1);
  }, [location]);

  return (
    <div className="border-b-2">
      <Container className="flex items-center">
        <Tabs
          aria-label="main tabs"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          orientation={mediumViewport ? "horizontal" : "vertical"}
          style={{ width: "100%" }}
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
            className="pointer-events-none pl-0 mr-3 max-w-full w-full md:w-auto"
          />
          <Link
            to="/"
            className="max-w-full"
            component={Tab}
            label={<h2>{t("home.currency_converter")}</h2>}
          />
          <Link
            to="/ConversionHistory"
            className="max-w-full"
            component={Tab}
            label={<h2>{t("home.view_conversion_history")}</h2>}
          />
        </Tabs>
      </Container>
    </div>
  );
}
