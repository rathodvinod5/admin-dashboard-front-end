import { ButtonBase, Typography } from "@mui/material";

const DivAsButton = ({ childrens }) => {
  return (
    <ButtonBase component="div">
        {childrens}
    </ButtonBase>
  )
}

export default DivAsButton;