import { createContext, useContext, useReducer } from "react";

export const ExchangeRatesContext = createContext();

// Actions
export const SET_EXCHANGE_RATES = "SET_EXCHANGE_RATES";

// Action creators
export function setExchangeRates(data) {
  let associativeArray = [];
  data.forEach((item) => {
    associativeArray[item.currency] = item;
  });
  return {
    type: SET_EXCHANGE_RATES,
    param: associativeArray,
  };
}

// Reducer
export function ExchangeRatesReducer(state, action) {
  switch (action.type) {
    case SET_EXCHANGE_RATES:
      return action.param;
    default:
      return state;
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
