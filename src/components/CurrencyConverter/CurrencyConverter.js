import ExchangeHistory from "../ExchangeHistory/ExchangeHistory";
import CurrencyConverterForm from "./CurrencyConverterForm";
import { ExchangeRatesProvider } from "../../context/ExchangeRatesContext/ExchangeRatesContext";
import { ExchangeRateFormProvider } from "../../context/CurrencyFormContext/CurrencyFormContext";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";

export default function CurrencyConverter() {
  const { t } = useTranslation();

  let match = useRouteMatch();

  return (
    <>
      <h3 className="page-title">{t("currency_converter.i_want_convert")}</h3>

      <ExchangeRateFormProvider>
        <ExchangeRatesProvider>
          <CurrencyConverterForm formValues={match.params} />
        </ExchangeRatesProvider>

        <ExchangeHistory />
      </ExchangeRateFormProvider>
    </>
  );
}
