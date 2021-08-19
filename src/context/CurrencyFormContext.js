import { createContext } from "react";
import config from "../config";

export const defaultCurrencyFormContext = {
  amount: null,
  from: null,
  to: null,
  exchangeHistoryReportType: config.EXCHANGE_HISTORY_REPORT_TYPE_DEFAULT,
  exchangeHistoryReportDuration: config.EXCHANGE_HISTORY_DURATIONS_DEFAULT,
};
export const CurrencyFormContext = createContext(defaultCurrencyFormContext);
