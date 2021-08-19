import { MenuItem, Select } from "@material-ui/core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { CurrencyFormContext } from "../../context/CurrencyFormContext";

export default function ExchangeHistoryDuration() {
  const { t } = useTranslation();
  const name = "exchangeHistoryReportDuration";
  const { exchangeRateValues, setExchangeRateValues } =
    useContext(CurrencyFormContext);

  const handleChange = (e) => {
    setExchangeRateValues({
      ...exchangeRateValues,
      ...{ [name]: e.target.value },
    });
  };

  return (
    <Select
      name={name}
      onChange={handleChange}
      fullWidth
      defaultValue={config.EXCHANGE_HISTORY_DURATIONS_DEFAULT}
    >
      {config.EXCHANGE_HISTORY_DURATIONS.map((item) => (
        <MenuItem value={item} key={`item-${item}`}>
          {item} {t("main.days")}
        </MenuItem>
      ))}
    </Select>
  );
}
