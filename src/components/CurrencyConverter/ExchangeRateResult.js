import { Grid } from "@material-ui/core";
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
          <Grid
            container
            className="pt-12 pb-8 text-center text-5xl"
          >
            <Grid item className="font-light md:text-right" xs={12} md>
              <span className="px-3">{props.amount}</span>
              <span>{props.from?.currency}</span>
            </Grid>

            <Grid item className="font-light w-auto" xs={12} md={1}>
              =
            </Grid>

            <Grid item className="font-semibold accent md:text-left" xs={12} md>
              <span className="pr-2">
                {converted.amount.toLocaleString("en", {
                  maximumFractionDigits:
                    config.CONVERTED_AMOUNT_FRACTION_DIGITS,
                })}
              </span>
              <span className="pl-2">{props.to?.currency}</span>
            </Grid>
          </Grid>

          <div className="text-center">
            <div className="flex justify-center">
              <div className="text-right">
                <p>1 {props.from?.currency} = </p>
                <p>1 {props.to?.currency} = </p>
              </div>

              <div className="mx-1 text-left">
                <p>
                  {converted.fromOne.toLocaleString("en", {
                    maximumFractionDigits:
                      config.CONVERTED_AMOUNT_ONE_FRACTION_DIGITS,
                  })}{" "}
                </p>
                <p>
                  {converted.toOne.toLocaleString("en", {
                    maximumFractionDigits:
                      config.CONVERTED_AMOUNT_ONE_FRACTION_DIGITS,
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
