
import { useContext, useEffect, useState } from "react";
import { getExchangeRatesHistory } from "../../api/nomics";
import { CurrencyFormContext } from "../../context/CurrencyFormContext";
import ExchangeHistoryTableReport from "./ExchangeHistoryTableReport";

export default function ExchangeHistoryReport() {
  const { exchangeRateValues } = useContext(CurrencyFormContext);
  const [rows, setRows] = useState();
  const [rowsLoading, setRowsLoading] = useState(false);

  useEffect(() => {
    setRows(null);
    setRowsLoading(true);
    getExchangeRatesHistory({
      duration: exchangeRateValues.exchangeHistoryReportDuration,
      currency: exchangeRateValues.from.currency,
    }).then((data) => {
      setRowsLoading(false);
      setRows(data);
    });
  }, [exchangeRateValues]);

  return (
    <>
      {exchangeRateValues.exchangeHistoryReportType === "table" && (
        <ExchangeHistoryTableReport rows={rows} loading={rowsLoading}/>
      )}
    </>
  );
}
