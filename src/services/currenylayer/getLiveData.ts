import client from "./client";
import exchangeRateHack from "./exchangeRateHack";

const getLiveData = (): Promise<{ [key: string]: number }> => {
  return client
    .live({ currencies: "CHF,EUR", source: "USD" })
    .then((data: any) => {
      // because the free plan of api only return with source of USD
      // i have implemented calculations to generate other currency rates
      return {
        ...data.quotes,
        ...exchangeRateHack(data.quotes),
      };
    })
    .catch((err: any) => {
      console.log(err);
    });
};
export default getLiveData;
