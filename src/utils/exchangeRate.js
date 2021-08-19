export function calculateExchangeRate(amount, fromRate, toRate) {
  amount = parseFloat(amount);
  fromRate = parseFloat(fromRate);
  toRate = parseFloat(toRate);

  return amount
    ? {
        amount: (amount * fromRate) / toRate,
        fromOne: fromRate / toRate,
        toOne: toRate / fromRate,
      }
    : null;
}
