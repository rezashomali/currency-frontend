import React, { useState, useEffect } from "react";
import useDebounce from "./utils/useDebounce";
import { Container, Grid, Hidden } from "@material-ui/core";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import Header from "./components/Header";

import getLiveData from "./services/currenylayer/getLiveData";
import MoneySelector from "./components/MoneySelector";
import InputAmount from "./components/InputAmount";
import Result from "./components/Result";
import Chart from "./components/Chart";
import "./App.scss";

// Const Data
const AMOUNT_DELAY = 1000; // for use in useDebounce
const currencies: { [key: string]: string } = {
  // currencies that used in project
  USD: "$ USD - Dollar",
  EUR: "€ EUR - Euro",
  CHF: "ƒ CHF - Swiss Franc",
};

function App() {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<string>(
    localStorage.getItem("prevCurrencyFrom") || "EUR"
  );
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<string>(
    localStorage.getItem("prevCurrencyTo") || "USD"
  );
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const debouncedAmount = useDebounce(amount, AMOUNT_DELAY);

  const getCurrencySymbole = (item: string) => currencies[item].split(" ")[0]; // generate symbole for currencies

  useEffect(() => {
    // run only once and get and calculate all of the rates
    getLiveData().then((liveRates) => {
      setRates(liveRates);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("prevCurrencyFrom", selectedCurrencyFrom);
    localStorage.setItem("prevCurrencyTo", selectedCurrencyTo);
    // run everytime each currency select or amount of the input change
    // generate the result of the convertion base of the currencies selected
    if (selectedCurrencyFrom === selectedCurrencyTo) {
      setResult(debouncedAmount);
    } else {
      setResult(
        rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`] && amount > 0
          ? Number(
              (
                rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`] *
                debouncedAmount
              ).toFixed(2)
            )
          : 0
      );
    }
  }, [debouncedAmount, selectedCurrencyFrom, selectedCurrencyTo]);

  const swapCurrecies = () => {
    // swap selected currencies
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
              amount={amount}
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
