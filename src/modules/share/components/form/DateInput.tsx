import { DatePickerProps } from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';

type TextInputProps = {
  control: Control;
  name: string;
  inputProps?: DatePickerProps<Date>;
  textProps?: TextFieldProps;
};

const DateInput = ({
  control,
  name,
  inputProps,
  textProps,
}: TextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          {...field}
          {...inputProps}
          renderInput={params => (
            <TextField {...params} type="date" {...textProps} />
          )}
        />
      )}
    />
  );
};

export default DateInput;
