// Exchange rate: 1 USD = 130 ETB (approximate)
const USD_TO_ETB_RATE = 130;

// Convert USD amount to ETB
const convertUSDToETB = (amount: number): number => {
  return amount * USD_TO_ETB_RATE;
};

export const formatCurrency = (amount: number, currency: string = 'ETB'): string => {
  if (currency === 'ETB') {
    const etbAmount = amount; // Assume amount is already in ETB or converted
    return `ብር ${etbAmount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Convert USD amount to ETB format
export const formatCurrencyFromUSD = (usdAmount: number): string => {
  const etbAmount = convertUSDToETB(usdAmount);
  return formatCurrency(etbAmount);
};

export const formatCompactCurrency = (amount: number, currency: string = 'ETB'): string => {
  if (currency === 'ETB') {
    const etbAmount = amount;
    return `ብር ${(etbAmount / 1000).toFixed(1)}k`;
  }
  
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Convert USD compact currency to ETB
export const formatCompactCurrencyFromUSD = (usdAmount: number): string => {
  const etbAmount = convertUSDToETB(usdAmount);
  return formatCompactCurrency(etbAmount);
};
