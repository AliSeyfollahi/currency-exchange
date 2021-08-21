import ExchangeHistory from "../ExchangeHistory/ExchangeHistory";
import CurrencyConverterForm from "./CurrencyConverterForm";
import { ExchangeRatesProvider } from "../../context/ExchangeRatesContext/ExchangeRatesContext";
import { ExchangeRateFormProvider } from "../../context/CurrencyFormContext/CurrencyFormContext";
import { useTranslation } from "react-i18next";

export default function CurrencyConverter() {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="page-title">{t("currency_converter.i_want_convert")}</h3>

      <ExchangeRateFormProvider>
        <ExchangeRatesProvider>
          <CurrencyConverterForm />
        </ExchangeRatesProvider>

        <ExchangeHistory />
      </ExchangeRateFormProvider>
    </>
  );
}
