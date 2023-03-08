import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  SxProps,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type RadioInputProps = {
  control: Control;
  name: string;
  inputProps?: RadioGroupProps & { label?: string };
  options: Array<{
    value: string | boolean;
    name: string;
  }>;
  containerSx?: SxProps;
};

const RadioInput = ({
  control,
  name,
  inputProps,
  containerSx,
  options,
}: RadioInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        // <TextField {...inputProps} {...field} Radio type="Radio">
        //   {options?.map(op => (
        //     <MenuItem key={op.value} value={op.value}>
        //       {op.name}
        //     </MenuItem>
        //   ))}
        // </TextField>

        <FormControl sx={{ ...containerSx }}>
          <FormLabel id="radio-buttons-group">{inputProps?.label}</FormLabel>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue={name}
            {...field}
            {...inputProps}
          >
            {options.map(item => (
              <FormControlLabel
                key={item.name}
                value={item.value}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default RadioInput;
