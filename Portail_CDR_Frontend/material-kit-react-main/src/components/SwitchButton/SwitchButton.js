import React from "react";
import Switch from "@mui/material/Switch";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import MKTypography from "components/MKTypography";
const SwitchButton = ({ leftLabel, rightLabel, onChange }) => {
  return (
    <Box display="flex" alignItems="center">
      <MKTypography>{leftLabel}</MKTypography>
      <Switch onChange={onChange} />
      <MKTypography>{rightLabel}</MKTypography>
    </Box>
  );
};

SwitchButton.propTypes = {
  leftLabel: PropTypes.string.isRequired, // Validate leftLabel prop as a required string
  rightLabel: PropTypes.string.isRequired, // Validate rightLabel prop as a required string
  onChange: PropTypes.func.isRequired, // Validate onChange prop as a required function
};

export default SwitchButton;
