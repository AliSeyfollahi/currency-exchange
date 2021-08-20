import ExchangeHistory from "../ExchangeHistory/ExchangeHistory";
import CurrencyConverterForm from "./CurrencyConverterForm";
import { ExchangeRatesProvider } from "../../context/ExchangeRatesContext";
import { ExchangeRateFormProvider } from "../../context/CurrencyFormContext";

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
