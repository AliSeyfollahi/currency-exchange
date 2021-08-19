import config from "../config";

const GET_CURRENCIES_METADATA_URL = `${config.NOMICS_API_BAE_URL}/currencies`;
const GET_EXCHANGE_RATES_URL = `${config.NOMICS_API_BAE_URL}/exchange-rates`;
const GET_EXCHANGE_RATES_URL_HISTORY = `${GET_EXCHANGE_RATES_URL}/history`;

const defaultParams = {
  key: config.NOMICS_API_KEY,
};

export const getCurrenciesMetadata = (params) => {
  params = { ...defaultParams, attributes: "id,name,logo_url", ...params };
  return fetch(
    `${GET_CURRENCIES_METADATA_URL}?${new URLSearchParams(params).toString()}`
  ).then((response) => response.json());
};

export const getExchangeRates = () => {
  return fetch(
    `${GET_EXCHANGE_RATES_URL}?${new URLSearchParams(defaultParams).toString()}`
  ).then((response) => response.json());
};

export const getExchangeRatesHistory = (params) => {
  let start = new Date();
  start.setDate(start.getDate() - params.duration);

  return fetch(
    `${GET_EXCHANGE_RATES_URL_HISTORY}?${new URLSearchParams({
      ...defaultParams,
      ...{
        currency: params.currency,
        start: start.toISOString(),
        end: new Date().toISOString(),
      },
    }).toString()}`
  ).then((response) => response.json());
};
