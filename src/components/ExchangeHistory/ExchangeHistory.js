import { Divider, Grid } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { useExchangeRateFormContext } from "../../context/CurrencyFormContext";
import ExchangeHistoryDuration from "./ExchangeHistoryDuration";
import ExchangeHistoryReport from "./ExchangeHistoryReport";
import ExchangeHistoryReportTypes from "./ExchangeHistoryReportTypes";

export default function ExchangeHistory() {
  const { t } = useTranslation();
  const { exchangeRateFormValues } = useExchangeRateFormContext();

  const defaultReportType = config.EXCHANGE_HISTORY_REPORT_TYPE_DEFAULT;
  const defaultDuration = config.EXCHANGE_HISTORY_DURATIONS_DEFAULT;

  const [reportType, setReportType] = useState(defaultReportType);
  const [duration, setDuration] = useState(defaultDuration);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  return (
    <>
      {exchangeRateFormValues?.amount && (
        <>
          <Divider className="my-8" />

          <h4 className="section-title">
            {t("exchange_history.exchange_history")}
          </h4>

          <Grid container spacing={3} className="mb-2">
            <Grid item xs={12} lg={6}>
              <div className="flex justify-between">
                <div className="w-4/12 flex justify-between align-middle">
                  <ExchangeHistoryDuration
                    onChange={handleDurationChange}
                    defaultValue={defaultDuration}
                  />
                </div>

                <ExchangeHistoryReportTypes
                  onChange={handleReportTypeChange}
                  defaultValue={defaultReportType}
                />
              </div>
            </Grid>
          </Grid>

          <ExchangeHistoryReport duration={duration} reportType={reportType} />
        </>
      )}
    </>
  );
}
