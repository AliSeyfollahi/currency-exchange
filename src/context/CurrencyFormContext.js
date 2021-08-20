import { createContext, useContext, useReducer } from "react";

export const defaultExchangeRateFormContext = {
  amount: null,
  from: null,
  to: null,
};
export const ExchangeRateFormContext = createContext();

// Actions
export const CONVERT = "CONVERT";
export const SWITCH_RATES = "SWITCH_RATES";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function convert(value) {
  return { type: CONVERT, params: value };
}
export function switchRates() {
  return { type: SWITCH_RATES };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function ExchangeRateFormReducer(state, action) {
  switch (action.type) {
    case CONVERT:
      return action.params;
    case CLEAR_ALL:
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
