import ExchangeHistory from "../ExchangeHistory/ExchangeHistory";
import CurrencyConverterForm from "./CurrencyConverterForm";
import { ExchangeRatesProvider } from "../../context/ExchangeRatesContext/ExchangeRatesContext";
import { ExchangeRateFormProvider } from "../../context/CurrencyFormContext/CurrencyFormContext";

export default function CurrencyConverter() {
  return (
    <>
      <ExchangeRateFormProvider>
        <ExchangeRatesProvider>
          <CurrencyConverterForm />
        </ExchangeRatesProvider>

        <ExchangeHistory />
      </ExchangeRateFormProvider>
    </>
  );
}
