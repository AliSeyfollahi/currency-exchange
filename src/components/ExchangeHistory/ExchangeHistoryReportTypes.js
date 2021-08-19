import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { CurrencyFormContext } from "../../context/CurrencyFormContext";

export default function ExchangeHistoryReportTypes() {
  const { t } = useTranslation();
  const name = "exchangeHistoryReportType"
  const { exchangeRateValues, setExchangeRateValues } = useContext(CurrencyFormContext);
  const handleChange = (e, item) => {
    setExchangeRateValues({...exchangeRateValues, ...{[name]: item}})
  };

  return (
    <RadioGroup
      row
      aria-label={t("exchange_history.exchange_history_report_types")}
      name={name}
      onChange={handleChange}
      defaultValue={config.EXCHANGE_HISTORY_REPORT_TYPE_DEFAULT}
    >
      <FormControlLabel
        value="table"
        control={<Radio color="primary" />}
        label={t("main.table")}
        className="capitalize"
      />
      <FormControlLabel
        value="chart"
        control={<Radio color="primary" />}
        label={t("main.chart")}
        className="capitalize"
      />
    </RadioGroup>
  );
}
