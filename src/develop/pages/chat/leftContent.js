import React, { useEffect, useState } from "react";
import { Typography, MenuList, MenuItem, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
// import GlobalDataContext from "../../context/dashboardContext";
import { useChatMessageContext } from "../../context/chatContext";
import ItemContainer from "./utilities";
import AvatarWithActiveIcon from "../../templates/avatar";
import { getGradientColor } from "../../theme/Theme";
import moment from "moment";


const LeftContents = ({ currentItemSelected, setCurrentItem, onClickCreateGroupButton }) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectedColor = "green";
  const { isLoading, contactList, chatMessagesHistory, getChatMessageHistory } = useChatMessageContext();
  const { contacts, groups } = contactList;

  useEffect(() => {
    // setSelectedIndex(selectedIndex);
  }, []);

  const baseTitleStyles = {
    fontWeight: 500,
    textAlign: "left",
    fontFamily:
      'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  };

  const MainTitle = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 20,
    color: theme.palette.primary.main,
  }));

  const theme = useTheme();

  const CustomMenuItem = styled(MenuItem)({
    height: 60,
    // width: '95%',
    borderRadius: 5,
    marginTop: 2,
    paddingRight: 5,
    root: {
      '& .MuiTouchRipple-rippleVisible': {
        animationDuration: '500ms',
      }
    },
    "&.Mui-selected": {
      background:
        "linear-gradient(to right, " +
        `${getGradientColor(selectedColor, "dark")}` +
        ", " +
        `${getGradientColor(selectedColor, "dark")}` +
        ")",
    },
  });

  const Title = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 15,
    // color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.87)' : 'rgba(58, 53, 65, 0.87)',
    color: theme.palette.mode === "dark" ? "#fff" : "rgba(58, 53, 65, 0.87)",
  }));

  const SubTitle = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 12,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    // color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.68)' : 'rgba(58, 53, 65, 0.68)',
    color: theme.palette.mode === "dark" ? "#fff" : "rgba(58, 53, 65, 0.87)",
  }));

  const getChatHistoryOnClickItem = (isGroupChat, index) => {
    console.log('inside getChatHistoryOnClickItem', isGroupChat, index)
    if (!isLoading) {
      getChatMessageHistory({ isGroupChat: isGroupChat, index }).then().catch(error => {
        console.log('error: ', error);
      })
    }
  }

  return (
    <div style={{ width: '100%', paddingBottom: 40 }}>
      <MainTitle sx={{ marginLeft: 1.4 }}>Chats</MainTitle>
      <MenuList fullWidth={true}>
        {contacts.map((ele, index) => {
          const firstLetter = ele.name.charAt(0);
          const lastElement = contacts.length - 1;
          // const message = chatHistory[ele.id][lastElement].message;
          let subTitle = ele.email;
          // if (message.length > 0) {
          //   subTitle = message[0].length < 37 ? message[0] : message[0].slice(0, 37) + "...";
          // }
          return (
            <CustomMenuItem
              fullWidth={true}
              key={'chat-item-' + index}
              // selected={setSelectedIndex === index}
              selected={currentItemSelected === index}
              onClick={(event) => {
                if (currentItemSelected !== index) {
                  setCurrentItem(index);
                  getChatHistoryOnClickItem(false, index);
                }
                // setSelectedIndex(index);
              }}
              sx={{ padding: 0, backgroundColor: selectedIndex === index ? 'green' : 'inherit' }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <AvatarWithActiveIcon
                  title={firstLetter}
                  isClickable={false}
                  isActive={ele.isActive}
                />
                <div
                  style={{ width: "100%", paddingLeft: 3, paddingRight: 10 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Title
                      sx={{
                        color:
                          currentItemSelected === index
                            ? "#fff"
                            : theme.palette.mode === "dark"
                              ? "rgba(231, 227, 252, 0.87)"
                              : "rgba(58, 53, 65, 0.87)",
                      }}
                    >
                      {ele.name}
                    </Title>
                    <SubTitle
                      sx={{
                        textAlign: "right",
                        color:
                          currentItemSelected === index
                            ? "#fff"
                            : theme.palette.mode === "dark"
                              ? "rgba(231, 227, 252, 0.68)"
                              : "rgba(58, 53, 65, 0.68)",
                      }}
                    >
                      Jul 27
                    </SubTitle>
                  </Stack>
                  <SubTitle
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      // marginRight: 0.5,
                      color: currentItemSelected === ele.id ? "#fff" : theme.palette.mode === "dark"
                        ? "rgba(231, 227, 252, 0.68)" : "rgba(58, 53, 65, 0.68)",
                    }}
                  >
                    {subTitle}
                  </SubTitle>
                </div>
              </Stack>
            </CustomMenuItem>
          );
        })}
      </MenuList>

      <MainTitle sx={{ marginLeft: 1.4, marginTop: 2 }}>Groups</MainTitle>
      <MenuList fullWidth={true}>
        {groups.map((ele, index) => {
          const firstLetter = ele.groupName.charAt(0);
          const subTitle = 'Full Stack developer';
          return (
            <ItemContainer
              key={'group-item-' + index}
              title={ele.groupName}
              subtitle={subTitle}
              selectedItemId={currentItemSelected}
              currentItemId={contacts.length + index}
              firstLetter={firstLetter}
              isActive={true}
              currentIndex={selectedIndex}
              // index={2 + index}
              index={index}
              onClickItem={(id) => {
                const itemIndex = contacts.length + index;
                if (currentItemSelected !== itemIndex) {
                  console.log('inside onClick: ', true, index);
                  setCurrentItem(itemIndex);
                  getChatHistoryOnClickItem(true, index);
                }
              }}
              selectedColor={selectedColor}
              showDate={false}
            />
          );
        })}
      </MenuList>
      {/* <div style={{ height: 40, backgroundColor: 'white' }} /> */}
    </div>
  );
};

export default LeftContents;
