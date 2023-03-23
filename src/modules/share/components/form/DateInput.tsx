import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';

type TextInputProps = {
  control: Control;
  name: string;
  inputProps?: TextFieldProps;
};

const DateInput = ({ control, name, inputProps }: TextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          {...field}
          label={inputProps?.label}
          inputFormat="dd/MM/yyyy"
          renderInput={params => (
            <TextField {...params} type="date" {...inputProps} />
          )}
        />
      )}
    />
  );
};

export default DateInput;
