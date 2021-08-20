import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import config from "../../config";

export default function ExchangeHistoryReportTypes(props) {
  const { t } = useTranslation();
  const name = "exchangeHistoryReportType";

  return (
    <RadioGroup
      row
      aria-label={t("exchange_history.exchange_history_report_types")}
      name={name}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
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
        className="capitalize mr-0"
      />
    </RadioGroup>
  );
}
