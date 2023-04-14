import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

type AutocompleteInputProps = {
  control: Control;
  name: string;
  inputProps?: any; // AutocompleteProps<any, undefined, undefined, undefined>;
  textProps?: TextFieldProps;
  options: Array<{
    id: string;
    label: string;
    value: string;
    helperText?: string;
  }>;
  getOptions?: (name: string) => void;
  isLoadingOptions?: boolean;
  valueChangeCallback?: (value: string) => void;
};

const AutocompleteInput = ({
  control,
  name,
  inputProps,
  textProps,
  options,
  getOptions,
  isLoadingOptions,
  valueChangeCallback,
}: AutocompleteInputProps) => {
  const [search, setSearch] = useState('');

  const [searchDebounce] = useDebounce(search, 2000);

  useEffect(() => {
    getOptions?.(searchDebounce);
  }, [searchDebounce]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          value={field.value}
          onChange={(event, newValue: any) => {
            field.onChange({ target: { value: newValue } });
            valueChangeCallback?.(newValue);
          }}
          inputValue={search}
          onInputChange={(e, newValue) => setSearch(newValue)}
          renderOption={(props, option: any) => {
            return (
              <li {...props} key={option.id}>
                <Typography component={Box}>
                  {option.label}

                  {option.helperText ? (
                    <Typography variant="body2">{option.helperText}</Typography>
                  ) : null}
                </Typography>
              </li>
            );
          }}
          options={options}
          renderInput={params => (
            <TextField
              {...params}
              size="small"
              {...textProps}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoadingOptions ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          sx={{ minWidth: '150px' }}
          {...inputProps}
        />
      )}
    />
  );
};

export default AutocompleteInput;
