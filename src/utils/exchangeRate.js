export function calculateExchangeRate(amount, fromRate, toRate) {
  amount = parseFloat(amount);
  fromRate = parseFloat(fromRate);
  toRate = parseFloat(toRate);

  return amount ? amount * fromRate / toRate : null;
}
