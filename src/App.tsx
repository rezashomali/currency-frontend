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

const CurrencyLayerClient = require("currencylayer-client");

// Const Data
const AMOUNT_DELAY: number = 1000;
const currencies: { [key: string]: string } = {
  USD: "$ USD - Dollar",
  EUR: "€ EUR - Euro",
  CHF: "ƒ CHF - Swiss Franc",
};

function App() {
  const client = new CurrencyLayerClient({
    apiKey: "7cb2fa306d15983c0edcec597fa8234dd",
  });

  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<string>(
    "EUR"
  );
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [selectCurrenciesTo, setSelectCurrenciesTo] = useState<{
    [key: string]: string;
  }>({});

  const debouncedAmount = useDebounce(amount, AMOUNT_DELAY);

  const getCurrencySymbole = (item: string) => currencies[item].split(" ")[0];

  useEffect(() => {
    client
      .live({ currencies: "CHF,EUR", source: "USD" })
      .then((data: any) => {
        console.log("fetched new data ", data);
        // setCurrencyData(JSON.stringify(data));

        const generateRates = {
          ...data.quotes,
          EURUSD: Number((1 / data.quotes.USDEUR).toFixed(3)),
          CHFUSD: Number((1 / data.quotes.USDCHF).toFixed(3)),
          EURCHF: Number(
            ((1 / data.quotes.USDEUR) * data.quotes.USDCHF).toFixed(3)
          ),
          CHFEUR: Number(
            ((1 / data.quotes.USDCHF) * data.quotes.USDEUR).toFixed(3)
          ),
        };
        setRates(generateRates);
      })
      .catch((err: any) => {
        console.log(err.code); // 104
        console.log(err.message); // Your monthly usage limit has been reached...
      });
  }, []);

  useEffect(() => {
    setResult(
      rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`]
        ? Number(
            (
              rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`] *
              debouncedAmount
            ).toFixed(2)
          )
        : debouncedAmount
    );
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
              values={currencies}
              selectedCurrency={selectedCurrencyFrom}
              onChange={(event) => {
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
              values={currencies}
              selectedCurrency={selectedCurrencyTo}
              onChange={(event) => {
                setSelectedCurrencyTo(event.target.value as string);
              }}
            />
          </Grid>
          <Grid item sm={5} xs={12}>
            <InputAmount
              symbol={getCurrencySymbole(selectedCurrencyFrom)}
              onChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </Grid>
          <Grid item sm={2} implementation="css" xsDown component={Hidden} />
          <Grid item sm={5} xs={12} style={{ display: "flex" }}>
            <Result
              symbol={getCurrencySymbole(selectedCurrencyTo)}
              data={result}
            />
          </Grid>

          <Grid item xs={12}>
            <Chart
              selectedCurrencyFrom={selectedCurrencyFrom}
              selectedCurrencyTo={selectedCurrencyTo}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
