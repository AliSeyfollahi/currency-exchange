import { useEffect, useState } from "react";
import config from "../../config";
import { calculateExchangeRate } from "../../utils/exchangeRate";

export default function ExchangeRateResult(props) {
  const [converted, setConverted] = useState();

  useEffect(() => {
    if (props.amount && props.from?.rate && props.to?.rate) {
      setConverted(
        calculateExchangeRate(props.amount, props.from.rate, props.to.rate)
      );
    } else {
      setConverted(null);
    }
  }, [props]);

  return (
    <>
      {converted && (
        <>
          <div className="pt-12 pb-8 text-center text-5xl">
            <span className="font-light">
              <span className="px-2">{props.amount}</span>
              <span className="px-2">{props.from?.currency}</span>
              <span className="px-2">=</span>
            </span>
            <span className="font-semibold accent">
              <span className="px-2">
                {converted.amount.toLocaleString("en", {
                  maximumFractionDigits:
                    config.CONVERTED_AMOUNT_FRACTION_DIGITS,
                })}
              </span>
              <span className="px-2">{props.to?.currency}</span>
            </span>
          </div>

          <div className="text-center">
            <div className="flex justify-center">
              <div className="text-right">
                <p>1 {props.from?.currency} = </p>
                <p>1 {props.to?.currency} = </p>
              </div>

              <div className="mx-1 text-left">
                <p>
                  {converted.fromOne.toLocaleString("en", {
                    maximumFractionDigits: config.CONVERTED_AMOUNT_ONE_FRACTION_DIGITS,
                  })}{" "}
                </p>
                <p>
                  {converted.toOne.toLocaleString("en", {
                    maximumFractionDigits: config.CONVERTED_AMOUNT_ONE_FRACTION_DIGITS,
                  })}{" "}
                </p>
              </div>

              <div className="text-left">
                <p>{props.to?.currency}</p>
                <p>{props.from?.currency}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
