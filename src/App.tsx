import React, { useState, useEffect } from "react";
import useDebounce from "./utils/useDebounce";
import { Container, Grid, Hidden } from "@material-ui/core";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import Header from "./components/Header";

import InputAmount from "./components/InputAmount";
import Result from "./components/Result";
import MoneySelector from "./components/MoneySelector";
import "./App.scss";
import Chart from "./components/Chart";

import { CurrencyData } from "./currency-data/CurrencyData";

const CurrencyLayerClient = require("currencylayer-client");
// import { CurrencyLayerClient } from "currencylayer-client";

// Const Data
const AMOUNT_DELAY = 1000;
const Currencies: { [key: string]: string } = {
  USD: "$ USD - Dollar",
  EUR: "€ EUR - Euro",
  CHF: "ƒ CHF - Swiss Franc",
};

function App() {
  // const client = new CurrencyLayerClient({
  //   apiKey: "7cb2fa306d15983c0edcec597fa8234d",
  // });

  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<string>(
    "EUR"
  );
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const [currencyData, setCurrencyData] = useState({
    success: true,
    terms: "https://currencylayer.com/terms",
    privacy: "https://currencylayer.com/privacy",
    timestamp: 1598891885,
    source: "USD",
    quotes: { USDCHF: 0.91, USDEUR: 0.84 },
  });

  const debouncedAmount = useDebounce(amount, AMOUNT_DELAY);

  const getCurrencySymbole = (item: string) => {
    return Currencies[item].split(" ")[0];
  };

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
      EURUSD: Number((1 / currencyData.quotes.USDEUR).toFixed(3)),
      CHFUSD: Number((1 / currencyData.quotes.USDCHF).toFixed(3)),
      EURCHF: Number(
        ((1 / currencyData.quotes.USDEUR) * currencyData.quotes.USDCHF).toFixed(
          3
        )
      ),
      CHFEUR: Number(
        ((1 / currencyData.quotes.USDCHF) * currencyData.quotes.USDEUR).toFixed(
          3
        )
      ),
    });
    // console.log(CurrencyData);
    // setRates(CurrencyData);
  }, []);

  useEffect(() => {
    console.log(rates);

    setResult(
      rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`]
        ? Number(
            (
              rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`] *
              debouncedAmount
            ).toFixed(2)
          )
        : 0
    );
    console.log(selectedCurrencyFrom, selectedCurrencyTo);
  }, [debouncedAmount, selectedCurrencyFrom, selectedCurrencyTo]);

  const swapCurrecies = () => {
    let temp = selectedCurrencyFrom;
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(temp);
  };

  return (
    <div className="app">
      <Header />
      <Container className="container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Currency Converter</h2>
            <span>Today: {new Date().toDateString()}</span>
          </Grid>
          <Grid item sm={5} xs={12}>
            <MoneySelector
              label="From"
              values={Currencies}
              selectedCurrency={selectedCurrencyFrom}
              onSelectChange={(
                event: React.ChangeEvent<{ value: unknown }>
              ) => {
                setSelectedCurrencyFrom(event.target.value as string);
              }}
            />
          </Grid>
          <Grid item sm={2} xs={12} className="app__swapBtnWrapper">
            <div onClick={swapCurrecies}>
              <SwapHorizontalCircleIcon color="primary" fontSize="large" />
            </div>
          </Grid>
          <Grid item sm={5} xs={12}>
            <MoneySelector
              label="To"
              values={Currencies}
              selectedCurrency={selectedCurrencyTo}
              onSelectChange={(
                event: React.ChangeEvent<{ value: unknown }>
              ) => {
                setSelectedCurrencyTo(event.target.value as string);
              }}
            />
          </Grid>
          <Grid item sm={5} xs={12}>
            <InputAmount
              symbol={getCurrencySymbole(selectedCurrencyFrom)}
              onAmountChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </Grid>
          <Grid item sm={2} implementation="css" smDown component={Hidden} />
          <Grid item sm={5} xs={12}>
            <Result
              symbol={getCurrencySymbole(selectedCurrencyTo)}
              data={result}
            />
          </Grid>

          <Grid item xs={12}>
            <Chart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
