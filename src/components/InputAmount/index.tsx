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
};

const InputAmount: React.FC<Props> = ({ onChange, symbol }) => {
  return (
    <FormControl fullWidth className="inputAmount">
      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
      <Input
        className="inputAmount__input"
        // id="standard-adornment-amount"
        // value={values.amount}
        onChange={onChange}
        startAdornment={
          <InputAdornment className="inputAmount__symbol" position="start">
            {symbol}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default InputAmount;
