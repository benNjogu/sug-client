import { PropTypes } from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

RHFTextfield.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextfield({ name, helperText, ...otherProps }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error ? error.message : helperText}
          {...otherProps}
        />
      )}
    />
  );
}
