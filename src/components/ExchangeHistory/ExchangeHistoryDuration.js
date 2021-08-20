import { MenuItem, Select } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import config from "../../config";

export default function ExchangeHistoryDuration(props) {
  const { t } = useTranslation();
  const name = "exchangeHistoryReportDuration";

  return (
    <Select
      name={name}
      onChange={props.onChange}
      fullWidth
      defaultValue={props.defaultValue}
    >
      {config.EXCHANGE_HISTORY_DURATIONS.map((item) => (
        <MenuItem value={item} key={`item-${item}`}>
          {item} {t("main.days")}
        </MenuItem>
      ))}
    </Select>
  );
}
