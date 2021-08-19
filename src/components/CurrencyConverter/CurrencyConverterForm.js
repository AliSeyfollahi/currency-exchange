import { Button, Grid, TextField } from "@material-ui/core";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getExchangeRates } from "../../api/nomics";
import CurrenciesList from "./CurrenciesList";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import ExchangeRateResult from "./ExchangeRateResult";

export const CurrencyFormContext = createContext();

export default function CurrencyConverterForm() {
  const { t } = useTranslation();
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangesLoading, setExchangesLoading] = useState(true);
  const [doConvert, setDoConvert] = useState(false);
  const [formValues, setFormValues] = useState({
    amount: 500,
  });

  useEffect(() => {
    getExchangeRates().then((data) => {
      setExchangeRates(data);
      setExchangesLoading(false);
    });
  }, []);

  useEffect(() => {
    setDoConvert(false);
  }, [formValues]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormValues({ ...formValues, ...{ [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDoConvert(true);
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      ...{ to: formValues.from, from: formValues.to },
    });
  };

  return (
    <CurrencyFormContext.Provider value={{ currencies: exchangeRates }}>
      <form onSubmit={handleSubmit} className="flex flex-wrap lg:flex-nowrap">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={2}>
            <TextField
              fullWidth
              label={t("currency_converter.amount")}
              type="number"
              min="0"
              minLength="1"
              required
              value={formValues.amount}
              onChange={handleChange}
              name="amount"
            />
          </Grid>

          <Grid item xs={5} md lg className="md:pr-0">
            <CurrenciesList
              loading={exchangesLoading}
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
              loading={exchangesLoading}
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

      <div>
        <ExchangeRateResult
          amount={formValues.amount}
          from={formValues.from}
          to={formValues.to}
          doConvert={doConvert}
        />
      </div>
    </CurrencyFormContext.Provider>
  );
}
