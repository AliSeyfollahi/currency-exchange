import { createContext, useContext, useReducer } from "react";
import ConversionHistoryStorage from "./storage";

export const defaultExchangeRateFormContext = {
  amount: null,
  from: null,
  to: null,
};
export const ExchangeRateFormContext = createContext();

// Actions
export const CONVERT = "CONVERT";
export const SWITCH_RATES = "SWITCH_RATES";
export const RESET = "RESET";

// Action creators
export function convert(value) {
  return { type: CONVERT, params: value };
}
export function switchRates() {
  return { type: SWITCH_RATES };
}

export function reset() {
  return { type: RESET };
}

// Reducer
export function ExchangeRateFormReducer(state, action) {
  switch (action.type) {
    case CONVERT:
      (new ConversionHistoryStorage).create(action.params);
      return action.params;
    case RESET:
      return { amount: null, from: null, to: null };
    default:
      return state;
  }
}

export function ExchangeRateFormProvider(props) {
  const [items, dispatch] = useReducer(
    ExchangeRateFormReducer,
    defaultExchangeRateFormContext
  );

  return (
    <ExchangeRateFormContext.Provider
      value={{
        exchangeRateFormValues: items,
        exchangeRateFormDispatch: dispatch,
      }}
      {...props}
    />
  );
}

export function useExchangeRateFormContext() {
  return useContext(ExchangeRateFormContext);
}
