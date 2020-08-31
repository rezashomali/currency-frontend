import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";

interface Props {
  onAmountChange: any;
}

const InputAmount: React.FC<Props> = ({ onAmountChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        onChange={onAmountChange}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
        labelWidth={60}
      />
    </FormControl>
  );
};

export default InputAmount;
