import { InputAdornment, TextField, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps {
  control: Control;
  name: string;
  label?: string;
  defaultValue?: number;
  inputProps: any;
}

function CurrencyInput(props: CurrencyInputProps) {
  const { control, name, label, defaultValue, inputProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <NumericFormat
            value={value}
            onValueChange={values => {
              onChange(values.value);
            }}
            thousandSeparator="."
            decimalSeparator=","
            valueIsNumericString
            allowNegative={false}
            prefix=""
            customInput={TextField}
            label={label}
            fullWidth
            onBlur={onBlur}
            InputProps={{
              endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
            }}
            {...inputProps}
          />
          {error ? (
            <Typography variant="body2" color="error">
              {error.message}
            </Typography>
          ) : null}
        </>
      )}
    />
  );
}

export default CurrencyInput;
