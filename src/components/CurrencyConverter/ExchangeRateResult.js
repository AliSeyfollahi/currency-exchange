import { useEffect, useState } from "react";
import config from "../../config";
import { calculateExchangeRate } from "../../utils/exchangeRate";

export default function ExchangeRateResult(props) {
  const [convertedAmount, setConvertedAmouont] = useState();

  useEffect(() => {
    if (props.doConvert && props.amount && props.from?.rate && props.to?.rate) {
      setConvertedAmouont(
        calculateExchangeRate(
          props.amount,
          props.from.rate,
          props.to.rate
        ).toLocaleString("en", {
          maximumFractionDigits: config.CONVERTED_AMOUNT_FRACTION_DIGITS,
        })
      );
    } else {
      setConvertedAmouont(null);
    }
  }, [props]);

  return (
    <>
      {convertedAmount && (
        <div className="py-12 text-center text-5xl">
          <span className="font-light">
            <span className="px-2">{props.amount}</span>
            <span className="px-2">{props.from?.currency}</span>
            <span className="px-2">=</span>
          </span>
          <span className="font-semibold accent">
            <span className="px-2">{convertedAmount}</span>
            <span className="px-2">{props.to?.currency}</span>
          </span>
        </div>
      )}
    </>
  );
}
