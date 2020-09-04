import client from "./client";
import exchangeRateHack from "./exchangeRateHack";

const getLiveData = (): Promise<{ [key: string]: number }> => {
  return client
    .live({ currencies: "CHF,EUR", source: "USD" })
    .then((data: any) => {
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
