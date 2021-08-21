import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { DeleteForever, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConversionHistoryStorage from "../../context/CurrencyFormContext/storage";
import Loading from "../common/Loading/Loading";

export default function ConversionHistory() {
  const { t } = useTranslation();
  const [conversions, setConversions] = useState();
  const [conversionsLoading, setConversionsLoading] = useState(false);

  const getAllConversions = () => {
    setConversionsLoading(true);
    new ConversionHistoryStorage().read().then((data) => {
      setConversionsLoading(false);
      setConversions(data);
    });
  };

  const viewConversion = (e) => {
    const record = JSON.parse(e.target.dataset.record);
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
      .replace("{from}", conversion.from.currency)
      .replace("{to}", conversion.to.currency);
  };

  return (
    <>
      <h3 className="page-title">
        {t("conversion_history.conversion_history")}
      </h3>

      <TableContainer component={Paper}>
        <Table aria-label={t("exchange_history.exchange_history")} stickyHeader>
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
            {conversions &&
              conversions.map((conversion) => (
                <TableRow hover key={conversion.date}>
                  <TableCell className="capitalize" component="td" scope="row">
                    {formatDate(conversion.date)}
                  </TableCell>
                  <TableCell>{formatEvent(conversion)}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      className="capitalize mr-4"
                      onClick={viewConversion}
                      data-record={JSON.stringify(conversion)}
                    >
                      <Visibility fontSize="small" className="mr-1" />
                      {t("main.view")}
                    </Button>

                    <Button
                      size="small"
                      color="secondary"
                      onClick={deleteConversion}
                      data-record={JSON.stringify(conversion)}
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
    </>
  );
}
