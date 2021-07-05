import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { CloseOutlined, SearchOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";

let timeout = null;

const DebouncedSearch = ({
  ref,
  value,
  onChange,
  debounceTime,
  label = "Search user",
  name = "searchString",
  variant = "outlined",
  disabled,
  fullWidth = true,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debounce = debounceTime || 1000;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      const trimValue = value.trim().length > 0 ? value.trim() : "";
      onChange(trimValue);
    }, debounce);
  };

  const handleClear = () => onChange("");

  return (
    <TextField
      autoComplete="off"
      rows="5"
      size="small"
      type="text"
      label={label}
      name={name}
      variant={variant}
      value={inputValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClear}
              size="small"
              style={{ marginRight: "-5px" }}
            >
              <CloseOutlined
                style={{ width: "14px", height: "14px", padding: "3px" }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      ref={ref}
      fullWidth={fullWidth}
      disabled={disabled}
    />
  );
};

export default DebouncedSearch;
