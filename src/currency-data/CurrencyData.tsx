import React, { useState, useEffect } from "react";

export const CurrencyData = () => {
  const [currencyData, setCurrencyData] = useState({
    success: true,
    terms: "https://currencylayer.com/terms",
    privacy: "https://currencylayer.com/privacy",
    timestamp: 1598891885,
    source: "USD",
    quotes: { USDCHF: 0.91, USDEUR: 0.84 },
  });
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // client
    //   .live({ currencies: "CHF,EUR", source: "USD" })
    //   .then((data: any) => {
    //     console.log("fetched new data ", data);
    //     setCurrencyData(JSON.stringify(data));
    //   })
    //   .catch((err: any) => {
    //     console.log(err.code); // 104
    //     console.log(err.message); // Your monthly usage limit has been reached...
    //   });

    setRates({
      ...currencyData.quotes,
      EURUSD: 1 / currencyData.quotes.USDEUR,
      CHFUSD: 1 / currencyData.quotes.USDCHF,
      EURCHF: (1 / currencyData.quotes.USDEUR) * currencyData.quotes.USDCHF,
      CHFEUR: (1 / currencyData.quotes.USDCHF) * currencyData.quotes.USDEUR,
    });
  }, []);

  return rates;
};
