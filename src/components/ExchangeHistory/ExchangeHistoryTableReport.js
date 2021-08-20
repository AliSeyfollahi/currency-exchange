import { useEffect, useState } from "react";
import Loading from "../common/Loading/Loading";
import config from "../../config";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function ExchangeHistoryTableReport(props) {
  const [statistics, setStatistics] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (props.rows) {
      const min = Math.min(...props.rows.map((item) => item.rate));
      const max = Math.max(...props.rows.map((item) => item.rate));
      const avg =
        props.rows.reduce((total, item) => total + parseFloat(item.rate), 0) /
        props.rows.length;

      setStatistics({ min, max, avg });
    } else {
      setStatistics(null);
    }
  }, [props.rows]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <TableContainer component={Paper} className={`${props.className}`}>
          <div className="overflow-auto">
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

            <div className="max-h-96 overflow-auto">
              <Table>
                <TableBody>
                  {props.rows &&
                    props.rows.map((row) => (
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

                  {props.loading && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Loading />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TableContainer>
      </Grid>

      <Grid item xs={12} lg={6}>
        <TableContainer component={Paper}>
          <Table
            aria-label={t("exchange_history.exchange_history")}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell className="capitalize w-2/5">
                  {t("exchange_history.statistics")}
                </TableCell>
                <TableCell className="w-2/5"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {statistics && (
                <>
                  <TableRow hover>
                    <TableCell
                      className="w-2/5 capitalize"
                      component="td"
                      scope="row"
                    >
                      {t("exchange_history.lowest")}
                    </TableCell>
                    <TableCell>
                      {parseFloat(statistics.min).toFixed(
                        config.EXCHANGE_HISTORY_REPORT_TYPE_RATE_DIGITS
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow hover>
                    <TableCell
                      className="w-2/5 capitalize"
                      component="td"
                      scope="row"
                    >
                      {t("exchange_history.highest")}
                    </TableCell>
                    <TableCell>
                      {parseFloat(statistics.max).toFixed(
                        config.EXCHANGE_HISTORY_REPORT_TYPE_RATE_DIGITS
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow hover>
                    <TableCell
                      className="w-2/5 capitalize"
                      component="td"
                      scope="row"
                    >
                      {t("exchange_history.average")}
                    </TableCell>
                    <TableCell>
                      {parseFloat(statistics.avg).toFixed(
                        config.EXCHANGE_HISTORY_REPORT_TYPE_RATE_DIGITS
                      )}
                    </TableCell>
                  </TableRow>
                </>
              )}

              {props.loading && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Loading />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
