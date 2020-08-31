import React, { useState, useEffect, Props } from "react";
import useDebounce from "./utils/useDebounce";
import { Container, Grid, Paper } from "@material-ui/core";
import Header from "./components/Header";

import InputAmount from "./components/InputAmount";
import Result from "./components/Result";
import MoneySelector from "./components/MoneySelector";
import "./App.scss";

const AMOUNT_DELAY = 1000;

const Currencies = {
  USD: "USD - Dollar",
  EUR: "EUR - Euro",
  CHF: "CHF - Swiss Franc",
};

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<string>(
    "EUR"
  );
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<string>("USD");
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const debouncedAmount = useDebounce(amount, AMOUNT_DELAY);

  useEffect(() => {
    setRates({ EURUSD: 1.19, EURCHF: 1.08 });
  }, []);

  useEffect(() => {
    setResult(
      rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`]
        ? rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`] *
            debouncedAmount
        : 0
    );
    console.log(selectedCurrencyFrom, selectedCurrencyTo);
  }, [debouncedAmount, selectedCurrencyFrom, selectedCurrencyTo]);

  return (
    <div>
      <Header />
      <Container className="container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Currency Converter</h2>
          </Grid>
          <Grid item xs={5}>
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
          <Grid item xs={2}>
            <button>change</button>
          </Grid>
          <Grid item xs={5}>
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
          <Grid item xs={12}>
            <InputAmount
              onAmountChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Result data={result} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
