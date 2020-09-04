import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  InputProps,
} from "@material-ui/core";
import "./InputAmount.scss";

type Props = InputProps & {
  symbol: string;
  amount: number;
  helperText?: string;
};

const InputAmount: React.FC<Props> = ({ onChange, symbol, amount }) => {
  return (
    <FormControl fullWidth className="inputAmount">
      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
      <Input
        type="number"
        error={amount < 0 ? true : false}
        className="inputAmount__input"
        // id="standard-adornment-amount"
        value={amount}
        onChange={onChange}
        startAdornment={
          <InputAdornment className="inputAmount__symbol" position="start">
            {symbol}
          </InputAdornment>
        }
      />
      {amount < 0 ? (
        <span className="inputAmount__error">incorect value</span>
      ) : (
        ""
      )}
    </FormControl>
  );
};

export default InputAmount;
