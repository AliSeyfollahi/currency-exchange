import {
  Button,
  makeStyles,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { DeleteForever, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConversionHistoryStorage from "../../context/CurrencyFormContext/storage";
import Loading from "../common/Loading/Loading";
import { Alert } from "@material-ui/lab";

export default function ConversionHistory() {
  const { t } = useTranslation();
  const [conversions, setConversions] = useState();
  const [conversionsLoading, setConversionsLoading] = useState(false);

  const useStyles = makeStyles({
    actionButton: {
      visibility: "hidden",
    },
    actionRow: {
      "&:hover .actions > button, &:hover .actions > a": {
        visibility: "visible !important",
      },
    },
  });
  const classes = useStyles();

  const getAllConversions = () => {
    setConversionsLoading(true);
    new ConversionHistoryStorage().read().then((data) => {
      setConversionsLoading(false);
      setConversions(data);
    });
  };

  const deleteConversion = (e) => {
    e.preventDefault();
    const button =
      e.target.tagName === "BUTTON" ? e.target : e.target.closest("button");
    const record = JSON.parse(button.dataset.record);
    new ConversionHistoryStorage().delete(record.date).then(() => {
      getAllConversions();
    });
  };

  useEffect(() => {
    getAllConversions();
  }, []);

  const formatDate = (date) => {
    date = new Date(date);
    return date.toLocaleString().replace(",", "@");
  };

  const formatEvent = (conversion) => {
    const str = t("conversion_history.event_str");
    return str
      .replace("{amount}", conversion.amount)
      .replace("{from}", conversion.from)
      .replace("{to}", conversion.to);
  };

  return (
    <>
      <h3 className="page-title">
        {t("conversion_history.conversion_history")}
      </h3>

      {conversions?.length > 0 && (
        <TableContainer component={Paper}>
          <Table
            aria-label={t("exchange_history.exchange_history")}
            stickyHeader
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell className="capitalize">{t("main.date")}</TableCell>
                <TableCell className="capitalize w-3/6">
                  {t("conversion_history.event")}
                </TableCell>
                <TableCell className="capitalize">
                  {t("conversion_history.actions")}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {conversions.map((conversion) => (
                <TableRow
                  hover
                  key={conversion.date}
                  className={classes.actionRow}
                >
                  <TableCell className="capitalize" component="td" scope="row">
                    {formatDate(conversion.date)}
                  </TableCell>
                  <TableCell>{formatEvent(conversion)}</TableCell>
                  <TableCell className="actions">
                    <Link
                      to={`/CurrencyConverter/${conversion.amount}/${conversion.from}/${conversion.to}`}
                      component={Button}
                      size="small"
                      color="primary"
                      className={`capitalize mr-4 ${classes.actionButton}`}
                    >
                      <Visibility fontSize="small" className="mr-1" />
                      {t("main.view")}
                    </Link>

                    <Button
                      size="small"
                      color="secondary"
                      onClick={deleteConversion}
                      data-record={JSON.stringify(conversion)}
                      className={classes.actionButton}
                    >
                      <DeleteForever fontSize="small" className="mr-1" />
                      <span className="capitalize-first-letter">
                        {t("conversion_history.delete_from_history")}
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {conversionsLoading && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Loading />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!conversions?.length && <Alert severity="warning">{t("main.no_items_found")}!</Alert>}
    </>
  );
}
