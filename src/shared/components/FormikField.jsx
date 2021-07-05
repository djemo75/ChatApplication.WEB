import { Box, TextField } from "@material-ui/core";
import { Field } from "formik";

import ValidationError from "./ValidationError";

const Input = ({ customOnChange, onChange, error, ...rest }) => {
  return (
    <div className="formik-field">
      <TextField
        onChange={customOnChange ? customOnChange : onChange}
        {...rest}
      />
      {error && (
        <Box mt={0.25}>
          <ValidationError error={error} />
        </Box>
      )}
    </div>
  );
};

const FormikField = ({
  fullWidth = true,
  autoComplete = "off",
  rows = "5",
  variant = "outlined",
  size = "small",
  type = "text",
  ...rest
}) => {
  return (
    <Field
      as={Input}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      rows={rows}
      variant={variant}
      size={size}
      type={type}
      {...rest}
    />
  );
};

export default FormikField;
