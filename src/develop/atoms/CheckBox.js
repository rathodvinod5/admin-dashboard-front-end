import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from 'prop-types'; // ES6

const CustomCheckBox = ({ isParent, isSelectAll, label, onClickCheckBox, style }) => {
  const [value, setCheckBox] = React.useState(false);

  useEffect(() => {
    console.log('inside: useEffect: ', isParent, isSelectAll, value);
    if (isParent === false && (value === true && isSelectAll === false)){
      console.log('inside 1st if')
    } else if (isParent === false && isSelectAll === true && value === false) {
      console.log('inside 2nd if')
      console.log('inside useEffect of Checkbox: ', isSelectAll);
      setCheckBox(isSelectAll);
    }
  }, [value]);

  const CssCheckbox = styled(Checkbox)(({ theme }) => ({
    "&.MuiCheckbox-root": {
      color: "rgb(118, 118, 118)",
      "&.Mui-checked": {
        color: theme.palette.primary.main,
      },
    },
  }));

  const handleCheckBoxChange = (event) => {
    console.log('inside handleCheckBoxChange: ',isParent, isSelectAll, event.target.checked);
    // setCheckBox(event.target.checked);
    if (isParent === true || (isSelectAll === true && event.target.checked === false)) {
      console.log('first if of handleCheckBoxChange')
      onClickCheckBox(event.target.checked);
      setCheckBox(event.target.checked);
    } else {
      console.log('else case of handleCheckBoxChange')
      setCheckBox(event.target.checked);
    }
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
  isParent: PropTypes.bool
}

CustomCheckBox.defaultProps = {
  isSelectAll: false,
  label: "",
  onClickCheckBox: () => { },
  styles: { width: 25, height: 25 },
  isParent: false,
}