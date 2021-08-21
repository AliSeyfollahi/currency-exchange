import { Button, Grid, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CurrenciesList from "./CurrenciesList";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import ExchangeRateResult from "./ExchangeRateResult";
import {
  reset,
  convert,
  useExchangeRateFormContext,
} from "../../context/CurrencyFormContext/CurrencyFormContext";
import { getExchangeRates } from "../../api/nomics";
import {
  setExchangeRates,
  useExchangeRatesContext,
} from "../../context/ExchangeRatesContext/ExchangeRatesContext";
import Message from "../common/Message/Message";

export default function CurrencyConverterForm(props) {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({});
  const { exchangeRates, exchangeDispatch } = useExchangeRatesContext();
  const [messageOpen, setMessageOpen] = useState(false);

  const { exchangeRateFormValues, exchangeRateFormDispatch } =
    useExchangeRateFormContext();

  useEffect(() => {
    getExchangeRates().then((data) => {
      exchangeDispatch(setExchangeRates(data));
    }).catch(()=>{
      setMessageOpen(true);
    });
  }, []);

  useEffect(() => {
    if (props?.formValues.from && exchangeRates && Object.keys(exchangeRates).length > 0) {
      setFormValues(props.formValues);
      exchangeRateFormDispatch(
        convert({
          ...props.formValues,
          ...{
            fromRate: exchangeRates[props.formValues.from].rate,
            toRate: exchangeRates[props.formValues.to].rate,
          },
        }, true)
      );
    }
  }, [props.formValues, exchangeRates]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormValues({ ...formValues, ...{ [name]: value } });
    exchangeRateFormDispatch(reset());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    exchangeRateFormDispatch(
      convert({
        ...formValues,
        ...{
          fromRate: exchangeRates[formValues.from].rate,
          toRate: exchangeRates[formValues.to].rate,
        },
      })
    );
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    let values = {
      ...formValues,
      ...{ to: formValues.from, from: formValues.to },
    };
    exchangeRateFormDispatch(reset());
    setFormValues(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap lg:flex-nowrap">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={2}>
            <TextField
              fullWidth
              autoFocus
              label={t("currency_converter.amount")}
              type="number"
              min="0"
              minLength="1"
              required
              value={formValues.amount ? formValues.amount : ""}
              onChange={handleChange}
              name="amount"
            />
          </Grid>

          <Grid item xs={5} md lg className="md:pr-0">
            <CurrenciesList
              inputLabel={t("currency_converter.from")}
              onChange={handleChange}
              name="from"
              required
              value={formValues?.from}
            />
          </Grid>

          <Grid
            item
            xs={2}
            md={2}
            lg={1}
            className="flex items-end justify-center"
          >
            <Button
              variant="contained"
              type="button"
              className="bg-white teal min-w-min px-2"
              size="small"
              onClick={handleSwitch}
            >
              <CompareArrowsIcon color="primary" />
            </Button>
          </Grid>

          <Grid item xs={5} md lg className="md:pl-0">
            <CurrenciesList
              inputLabel={t("currency_converter.to")}
              name="to"
              onChange={handleChange}
              required
              value={formValues?.to}
            />
          </Grid>
        </Grid>

        <div className="flex items-end md:pl-6 pt-8 lg:pt-0 justify-center w-full lg:w-min">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="text-uppercase"
          >
            {t("currency_converter.convert")}
          </Button>
        </div>
      </form>

      {exchangeRateFormValues?.amount && (
        <div>
          <ExchangeRateResult
            amount={exchangeRateFormValues.amount}
            from={{
              currency: exchangeRateFormValues.from,
              rate: exchangeRateFormValues.fromRate,
            }}
            to={{
              currency: exchangeRateFormValues.to,
              rate: exchangeRateFormValues.toRate,
            }}
          />
        </div>
      )}

      <Message message={t("api.general_error")} open={messageOpen}/>
    </>
  );
}
