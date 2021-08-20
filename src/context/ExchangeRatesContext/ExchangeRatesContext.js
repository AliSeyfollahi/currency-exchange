import { createContext, useContext, useReducer } from "react";

export const ExchangeRatesContext = createContext();

// Actions
export const SET_EXCHANGE_RATES = "SET_EXCHANGE_RATES";

// Action creators
export function setExchangeRates(data) {
  return { type: SET_EXCHANGE_RATES, param: data };
}

// Reducer
export function ExchangeRatesReducer(state, action) {

  switch (action.type) {
    case SET_EXCHANGE_RATES:
      return action.param;
  }
}

export function ExchangeRatesProvider(props) {
  const [items, dispatch] = useReducer(ExchangeRatesReducer, []);

  return (
    <ExchangeRatesContext.Provider
      value={{ exchangeRates: items, exchangeDispatch: dispatch }}
      {...props}
    />
  );
}

export function useExchangeRatesContext() {
  return useContext(ExchangeRatesContext);
}
