import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import "./InputAmount.scss";

interface Props {
  onAmountChange: any;
  symbol: string;
}

const InputAmount: React.FC<Props> = ({ onAmountChange, symbol }) => {
  return (
    <FormControl fullWidth className="inputAmount">
      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
      <Input
        className="inputAmount__input"
        // id="standard-adornment-amount"
        // value={values.amount}
        onChange={onAmountChange}
        startAdornment={
          <InputAdornment className="inputAmount__symbol" position="start">
            {symbol}
          </InputAdornment>
        }
      />
    </FormControl>

    // <FormControl fullWidth>
    //   <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
    //   <OutlinedInput
    //     onChange={onAmountChange}
    //     startAdornment={
    //       <InputAdornment position="start">{symbol}</InputAdornment>
    //     }
    //     labelWidth={60}
    //   />
    // </FormControl>
  );
};

export default InputAmount;
