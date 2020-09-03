import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
} from "@material-ui/core";

type Props = SelectProps & {
  label: string;
  values: {
    [key: string]: string;
  };
  selectedCurrency: string;
};

const MoneySelector: React.FC<Props> = ({
  label,
  values,
  selectedCurrency,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <Select value={selectedCurrency} onChange={onChange}>
        {Object.keys(values).map((item) => (
          <MenuItem key={item} value={item}>
            {values[item]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Select the currency you want to conver {label}
      </FormHelperText>
    </FormControl>
  );
};

export default MoneySelector;
