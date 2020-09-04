import client from "./client";
import exchangeRateHack from "./exchangeRateHack";

// run the api for a date, get and calculate all rates
// recieve a date and return all rates
const getHistoryRate = (date: string): Promise<{ [key: string]: number }> => {
  return client
    .historical({ date, currencies: "CHF,EUR", source: "USD" })
    .then((data: { quotes: { [key: string]: number } }) => {
      return {
        ...data.quotes,
        ...exchangeRateHack(data.quotes),
      };
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default getHistoryRate;
