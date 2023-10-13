import React, { useEffect, useState } from "react";
import {
  Stack,
  MenuList,
  ListItemText,
  Button,
  Badge,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ChatText, SectionTitle } from "../../components/typographies/index";
import PropTypes from 'prop-types';
import { Dot, getIcons } from "./generatlUtilities";

export const getTrueCount = (object) => {
  let trueCount = 0;
  for (let [key, value] of Object.entries(object)) {
    if (value === true) trueCount++;
  }
  return trueCount;
}

export default function nullFunction() { }


export const EmailBlockLeftContents = ({ emailCategory, onPressCompose, setMailCategoryTag }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(-1);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    // setCurrentCategoryIndex(0);
  }, []);

  const options = [
    { title: "Personal", tag: "per" },
    { title: "Important", tag: "imp" },
    { title: "Company", tag: "cmp" },
    { title: "Private", tag: "pvt" },
  ];

  const optionsButton = [
    { title: "Inbox", key: 'inbox', tag: "inb" },
    { title: "Sent", key: 'sent', tag: "snt" },
    { title: "Draft", key: 'draft', tag: "dft" },
    { title: "Starred", key: 'starred', tag: "std" },
    { title: "Spam", key: 'spam', tag: "spm" },
    { title: "Trash", key: 'trash', tag: "trs" },
  ];

  const CustomMenuItem = styled(Button)(({ theme }) => ({
    backgroundColor: "transparent",
    padding: 0,
    textTransform: "capitalize",
    root: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    ":hover": {
      backgroundColor: "transparent",
    },
  }));

  const CustomBadge = styled(Badge)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
  }));

  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };
  // const handleChange = (event, newValue) => {
  //   setCurrentIndex(newValue);
  // };

  return (
    <div
      title="compose-mail-cont"
      style={{
        width: "100%",
        height: "100%",
        justifyContents: "center",
        paddingTop: "20px",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Button
          sx={{ width: "85%", color: '#fff' }}
          variant="contained"
          onClick={onPressCompose}
        >
          Compose
        </Button>
      </Stack>

      <div style={{ marginTop: 30, width: "100%", paddingLeft: "20px" }}>
        <SectionTitle>STATUS</SectionTitle>
        <div style={{ height: 10 }} />
        <MenuList title="category-menu">
          {optionsButton.map((ele, index) => {
            const currentItemColor = currentTypeIndex === -1 && emailCategory === ele.key ? theme.palette.primary.main : 'inherit';
            return (
              <CustomMenuItem
                key={`custom-menu-${index}`}
                fullWidth={true}
                disableRipple={true}
                style={{ paddingTop: 3, paddingBottom: 3, paddingRight: 30 }}
                onClick={() => {
                  if (currentTypeIndex !== -1) {
                    setCurrentTypeIndex(-1);
                  }
                  setMailCategoryTag(ele.key);
                  // setCurrentCategoryIndex(index);
                }}
              >
                {getIcons(ele.tag, currentItemColor)}
                <ListItemText style={{ marginLeft: "15px" }}>
                  <ChatText
                    style={{
                      color: currentItemColor  //currentCategoryIndex === index ? theme.palette.primary.main : "#000"
                    }}
                  >
                    {ele.title}
                  </ChatText>
                </ListItemText>
                {ele.tag === "inb" || ele.tag === "dft" || ele.tag === "spm" ? (
                  <CustomBadge color="primary" badgeContent={index}></CustomBadge>
                ) : null}
              </CustomMenuItem>
            );
          })}
        </MenuList>
      </div>

      <div style={{ marginTop: 30, width: "100%", paddingLeft: "20px" }}>
        <SectionTitle style={{ marginBottom: 10 }}>LABEL</SectionTitle>
        {options.map((ele, index) => (
          <MenuList key={`options-menu-${index}`}>
            <CustomMenuItem
              fullWidth={true}
              disableRipple={true}
              style={{ marginTop: -10 }}
              onClick={() => {
                setCurrentTypeIndex(index);
                if (currentCategoryIndex !== -1) {
                  setCurrentCategoryIndex(-1);
                }
                // setMailCategoryTag(ele.key);
              }}
            >
              <Dot title={ele.title.toLowerCase()} />
              <ListItemText>
                <ChatText
                  style={{ color: currentTypeIndex === index ? theme.palette.primary.main : "#000" }}
                >
                  {ele.title}
                </ChatText>
              </ListItemText>
            </CustomMenuItem>
          </MenuList>
        ))}
      </div>

      <div style={{ height: 30 }} />
    </div>
  );
};

EmailBlockLeftContents.propTypes = {
  emailCategory: PropTypes.string,
  onPressCompose: PropTypes.func,
  setMailCategoryTag: PropTypes.func,
}
EmailBlockLeftContents.defaultProps = {
  emailCategory: 'inbox',
  onPressCompose: () => {},
  setMailCategoryTag: () => {},
}
