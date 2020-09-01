import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

interface Props {
  label: string;
  onSelectChange: any;
  values: {
    [key: string]: string;
  };
  selectedCurrency: string;
}

const MoneySelector: React.FC<Props> = ({
  label,
  values,
  selectedCurrency,
  onSelectChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>
      <Select value={selectedCurrency} onChange={onSelectChange}>
        {Object.keys(values).map((item) => (
          <MenuItem key={item} value={item}>
            {values[item]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Label + placeholder</FormHelperText>
    </FormControl>
  );
};

export default MoneySelector;
