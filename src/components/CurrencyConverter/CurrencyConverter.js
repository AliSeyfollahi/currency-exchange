import ExchangeHistory from "../ExchangeHistory/ExchangeHistory";
import CurrencyConverterForm from "./CurrencyConverterForm";
import { Divider } from "@material-ui/core";
import { getExchangeRates } from "../../api/nomics";
import { useEffect, useState } from "react";
import { defaultCurrencyFormContext, CurrencyFormContext } from "../../context/CurrencyFormContext";

export default function CurrencyConverter() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangeRateValues, setExchangeRateValues] = useState(
    defaultCurrencyFormContext
  );

  useEffect(() => {
    getExchangeRates().then((data) => {
      setExchangeRates(data);
    });
  }, []);

  return (
    <>
      <CurrencyFormContext.Provider
        value={{
          currencies: exchangeRates,
          exchangeRateValues,
          setExchangeRateValues,
        }}
      >
        <CurrencyConverterForm />

        {exchangeRateValues?.amount && (
          <>
            <Divider className="my-8" />
            <ExchangeHistory />
          </>
        )}
      </CurrencyFormContext.Provider>
    </>
  );
}
