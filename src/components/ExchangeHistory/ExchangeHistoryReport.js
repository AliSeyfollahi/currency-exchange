import { useEffect, useState } from "react";
import { getExchangeRatesHistory } from "../../api/nomics";
import { useExchangeRateFormContext } from "../../context/CurrencyFormContext/CurrencyFormContext";
import ExchangeHistoryChartReport from "./ExchangeHistoryChartReport";
import ExchangeHistoryTableReport from "./ExchangeHistoryTableReport";

export default function ExchangeHistoryReport(props) {
  const { exchangeRateFormValues } = useExchangeRateFormContext();
  const [rows, setRows] = useState();
  const [rowsLoading, setRowsLoading] = useState(false);

  useEffect(() => {
    setRows(null);
    setRowsLoading(true);
    getExchangeRatesHistory({
      duration: props.duration,
      currency: exchangeRateFormValues.from,
    }).then((data) => {
      setRowsLoading(false);
      setRows(data);
    });
  }, [props.duration]);

  return (
    <>
      {props.reportType === "table" && (
        <ExchangeHistoryTableReport rows={rows} loading={rowsLoading} />
      )}
      {props.reportType === "chart" && (
        <ExchangeHistoryChartReport rows={rows} loading={rowsLoading} />
      )}
    </>
  );
}
