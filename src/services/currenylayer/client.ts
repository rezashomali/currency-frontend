// @ts-ignore
import CurrencyLayerClient from "currencylayer-client";
import { CurrencyLayerApiKey } from "../../config";

const client = new CurrencyLayerClient({
  apiKey: CurrencyLayerApiKey,
});

export default client;
