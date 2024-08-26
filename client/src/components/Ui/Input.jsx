import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const Input = ({ type, label, onChangeHandler, variant,name,value }) => {
  return (
    <TextField
      type={type}
      label={label}
      onChange={(e)=>onChangeHandler(e)}
      variant={variant}
      name={name}
      value={value}
     
    />
  );
};

// Prop validation
Input.propTypes = {
  type: PropTypes.string, // Type can be a string (e.g., 'text', 'password', etc.)
  label: PropTypes.string.isRequired, // Label is required
  onChangeHandler: PropTypes.func.isRequired, // onChangeHandler must be a function
  variant: PropTypes.string, // Variant can be a string (default can be set in the component)
  name: PropTypes.string,
  value:PropTypes.string
};

// Default props
Input.defaultProps = {
  type: "text", // Default type
  variant: "standard", // Default variant set to 'standard'
};

export default Input;
