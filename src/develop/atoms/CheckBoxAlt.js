import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from 'prop-types'; // ES6

const CustomCheckBox = ({ label, checked, onClickCheckBox, style }) => {
  const [value, setCheckBox] = React.useState(checked);

  // useEffect(() => {}, [value, checked]);

  const CssCheckbox = styled(Checkbox)(({ theme }) => ({
    "&.MuiCheckbox-root": {
      color: "rgb(118, 118, 118)",
      "&.Mui-checked": {
        color: theme.palette.primary.main,
      },
    },
  }));

    const handleCheckBoxChange = (event) => {
      console.log('inside handleCheckBoxChange')
      setCheckBox(event.target.checked);
      onClickCheckBox(event.target.checked);
  };

  return (
    <Stack direction="row" style={{ ...style }}>
      <FormControlLabel
        control={<CssCheckbox checked={value} onClick={handleCheckBoxChange} />}
        label={label !== undefined ? label : ""}
        sx={{
          ".MuiFormControlLabel-label": {
            color: "rgba(58, 53, 65, 0.68)",
            fontSize: 14,
          },
        }}
      />
    </Stack>
  );
};

export default CustomCheckBox;

CustomCheckBox.propTypes = {
  isSelectAll: PropTypes.bool,
  label: PropTypes.string,
  onClickCheckBox: PropTypes.func,
  styles: PropTypes.object,
  isParent: PropTypes.bool,
  checked: PropTypes.bool,
}

CustomCheckBox.defaultProps = {
  isSelectAll: false,
  label: "",
  onClickCheckBox: () => { },
  styles: { width: 25, height: 25 },
  isParent: false,
  checked: false
}