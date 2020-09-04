const exchangeRateHack = (rate: { [key: string]: number }) => {
  return {
    EURUSD: Number((1 / rate.USDEUR).toFixed(3)),
    CHFUSD: Number((1 / rate.USDCHF).toFixed(3)),
    EURCHF: Number(((1 / rate.USDEUR) * rate.USDCHF).toFixed(3)),
    CHFEUR: Number(((1 / rate.USDCHF) * rate.USDEUR).toFixed(3)),
  };
};
export default exchangeRateHack;
