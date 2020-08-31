import React, { useState, useEffect, Props } from "react";
import useDebounce from "./utils/useDebounce";
import { Container, Grid, Paper } from "@material-ui/core";
import Header from "./components/Header";

import InputAmount from "./components/InputAmount";
import Result from "./components/Result";
import "./App.scss";

const AMOUNT_DELAY = 1000;

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<any>("EURUSD");
  const [rates, setRates] = useState<{ [key: string]: number }>({
    EURUSD: 1.19,
    EURCHF: 1.08,
  });
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState(
    rates[selectedCurrency]
  );

  const debouncedAmount = useDebounce(amount, AMOUNT_DELAY);

  useEffect(() => {
    console.log(debouncedAmount);
    console.log(rates[selectedCurrency]);
    setResult(debouncedAmount * rates[selectedCurrency]);
  }, [debouncedAmount, selectedCurrency]);

  return (
    <div>
      <Header />
      <Container className="container">
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <small>Base Currency</small>
            <strong>EUR</strong>
          </Grid>
          <Grid item xs={6}>
            <InputAmount
              onAmountChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Paper
              onClick={() => {
                setSelectedCurrency("EURUSD");
              }}
              elevation={3}
              className="currency-selector"
            >
              <span>$</span>
              <span>USD</span>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              onClick={() => {
                setSelectedCurrency("EURCHF");
              }}
              elevation={3}
              className="currency-selector"
            >
              <span>ƒ</span>
              <span>CHF</span>
            </Paper>
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
