import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyFormContext } from "../../context/CurrencyFormContext";
import ExchangeHistoryDuration from "./ExchangeHistoryDuration";
import ExchangeHistoryReport from "./ExchangeHistoryReport";
import ExchangeHistoryReportTypes from "./ExchangeHistoryReportTypes";

export default function ExchangeHistory() {
  const { t } = useTranslation();
  const { exchangeRateValues } = useContext(CurrencyFormContext);

  useEffect(() => {}, [exchangeRateValues]);

  return (
    <>
      <h4 className="section-title">
        {t("exchange_history.exchange_history")}
      </h4>

      <Grid container spacing={3} className="mb-2">
        <Grid item xs={12} lg={6}>
          <div className="flex justify-between">
            <div className="w-4/12 flex justify-between align-middle">
              <ExchangeHistoryDuration />
            </div>

            <ExchangeHistoryReportTypes/>
          </div>

        </Grid>
      </Grid>

      <ExchangeHistoryReport/>

    </>
  );
}
