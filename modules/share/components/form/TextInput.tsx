import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

type TextInputProps = {
  control: Control;
  name: string;
  inputProps: OutlinedInputProps;
}

const TextInput = ({
  control,
  name,
  inputProps,
}: TextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <OutlinedInput
          {...inputProps}
          {...field}
        />
      )}
    />
  )
};

export default TextInput;
