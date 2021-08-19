import { useTranslation } from "react-i18next";
import CurrencyConverterForm from "./CurrencyConverterForm";

export default function CurrencyConverter() {
  const { t } = useTranslation();

  return <>
    <h3 className="page-title">{t("currency_converter.i_want_convert")}</h3>

    <CurrencyConverterForm/>
  </>;
}
