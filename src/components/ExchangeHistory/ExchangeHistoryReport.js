import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getExchangeRatesHistory } from "../../api/nomics";
import config from "../../config";
import { CurrencyFormContext } from "../../context/CurrencyFormContext";

export default function ExchangeHistoryReport(props) {
  const { exchangeRateValues } = useContext(CurrencyFormContext);
  const [rows, setRows] = useState();
  const [rowsLoading, setRowsLoading] = useState(false);
  const { t } = useTranslation();

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
      {rowsLoading && (
        <div className="text-center">
          <CircularProgress color="primary" />
        </div>
      )}
      {exchangeRateValues.exchangeHistoryReportType === "table" && rows && (
        <TableContainer component={Paper} className={`${props.className}`}>
          <div style={{ overflow: "auto" }}>
            <Table
              aria-label={t("exchange_history.exchange_history")}
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell className="capitalize w-2/5">
                    {t("main.date")}
                  </TableCell>
                  <TableCell className="capitalize pl-1">
                    {t("exchange_history.exchange_rate")}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>

            <div className="max-h-96" style={{ overflow: "auto" }}>
              <Table>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.timestamp} hover>
                      <TableCell className="w-2/5" component="td" scope="row">
                        {new Date(row.timestamp).toLocaleDateString("en")}
                      </TableCell>
                      <TableCell>
                        {parseFloat(row.rate).toFixed(
                          config.EXCHANGE_HISTORY_REPORT_TYPE_RATE_DIGITS
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TableContainer>
      )}
    </>
  );
}
