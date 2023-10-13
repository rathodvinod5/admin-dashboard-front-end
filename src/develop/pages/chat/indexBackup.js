import React, { createContext, useEffect, useState } from "react";
import {
  Paper,
  Stack,
  InputAdornment,
  OutlinedInput,
  Divider,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { SearchOutlined, Call, Videocam, MoreVert } from "@mui/icons-material";
import AvatarWithActiveIcon from "../../templates/avatar/index";
import LeftContents from "./leftContent";
import RightContents from "./rightContainer";
import ItemContainer, { ChatDrawerContents, ChatDrawerContentsLeft } from "./utilities";
import UserAndChatHistoryContext, { userAndChatHistoryObject } from "../../context/userAndChatContext";
import DetailsUpperContainer from "./detailsUpperCont";
import { useChatMessageContext } from "../../context/chatContext";
import './styles.css';

import { BottomTextContainer } from "./rightContainer";

const Chat = (props) => {
  const { type } = props;
  const [userObjectData, setUserObjectData] = useState(userAndChatHistoryObject);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [showDrawer, toggleDrawer] = useState(false);
  const [contentsType, setContentsType] = useState(0);
  const [currentItemSelected, setCurrentItemSelected] = useState(-1);

  const messagesEndRef = React.createRef()

  const { isLoading, contactList, chatMessagesHistory, getChatMessage, postChatMessage } = useChatMessageContext();

  // useEffect(() => {
  //   // scrollToBottom()
  // }, [userObjectData]);

  useEffect(() => {
    console.log('inside useEffect of Chat');
    if(!initiated){
      setInitiated(true);
      chatMessagesHistory();
    }
  }, []);

  useEffect(() => {}, [isLoading, contactList]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const theme = useTheme();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "left",
  }));

  const baseTitleStyles = {
    fontFamily:
      'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  };

  const Title = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 20,
    color: theme.palette.primary.main,
  }));

  const UserScrollContainer = styled("div")(({ theme }) => ({
    height: 551,
    padding: "20px 10px 20px 15px",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      // background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#999",
      borderRadius: 2,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }));

  const onClickSendButton = (textMessage) => {
    console.log('inside onClickSendButton', textMessage)
    try {
      const newUserObjectData = { ...userObjectData };
      if (newUserObjectData.chatHistory[currentItemSelected] === undefined) {
        newUserObjectData.chatHistory[currentItemSelected] = [];
      }
      newUserObjectData.chatHistory[currentItemSelected].push({
        byMe: true,
        message: [textMessage],
        time: new Date(),
        status: 1 // 0 -> sent, 1 -> delivered, 2 -> seen
      });
      setUserObjectData(newUserObjectData);
    } catch (e) {
      console.log('exception', e)
    }
  }

  return (
    <UserAndChatHistoryContext.Provider
      value={{ userObjectData, setUserObjectData }}
    >
      <Item
        variant={type === "outlined" ? type : "elevation"}
        sx={{ width: "95%", position: "relative" }}
        elevation={3}
        title="title-chat-cont"
        data-testId="id-chat-cont"
      >
        {showDrawer ? (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.loaderBackground.main,
            zIndex: 50
          }} />
        ) : null}

        <Drawer
          anchor={contentsType === 0 ? "left" : "right"}
          open={showDrawer}
          variant="persistent"
          // transitionDuration={{ enter: 400 }}
          // hideBackdrop={true}
          PaperProps={{
            sx: {
              width: 370,
              padding: 2.5,
              position: "absolute",
              top: 0,
              right: 0,
            },
          }}
          unmountOnExit={true}
        >
          {contentsType === 0 ? (
            <ChatDrawerContentsLeft
              userId={currentItemSelected}
              type={2}
              onClickClose={() => toggleDrawer(false)}
            />
          ) : (
            <ChatDrawerContents
              userId={currentItemSelected}
              type={2}
              onClickClose={() => toggleDrawer(false)}
            />
          )}
        </Drawer>

        <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
          <Item sx={{ width: "33%", height: "100%" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ padding: 0.5, paddingLeft: 2, paddingRight: 2 }}
            >
              <AvatarWithActiveIcon
                title="N"
                isActive={true}
                isClickable={true}
                onClick={() => {
                  setContentsType(0); // 0/1
                  toggleDrawer(true);
                }}
              />
              <OutlinedInput
                id="outlined-adornment-weight"
                // value={values.weight}
                // onChange={handleChange('weight')}
                sx={{ borderRadius: 8, height: 40, marginRight: 1 }}
                fullWidth={true}
                placeholder="Search for Contact.."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Stack>
            <Divider />

            {/* Chat container */}
            {/* <UserScrollContainer style={{ zIndex: 100 }} onClick={(id) => setSelectedUserId(id)}>
              <LeftContents />
            </UserScrollContainer> */}
            <div style={{
              height: 550, width: '100%', overflow: 'hidden', 'overflowY': 'scroll',
              padding: "20px 10px 20px 15px",
              '-webkit-scrollbar': '0.4em',
              // scrollbarColor: 'transparent red'
            }}>
              <LeftContents
                currentItemSelected={currentItemSelected}
                setCurrentItem={(id) => setCurrentItemSelected(id)} 
              />
            </div>
          </Item>

          <div style={{ width: "67%", height: "100%", position: "relative" }}>
            <DetailsUpperContainer
              currentItemId={''}
              currentItemSelected={currentItemSelected} 
              onClickItem={(val) => {
                console.log('inside chat onClick: ', val)
                setContentsType(1);
                toggleDrawer(!showDrawer);
              }}
            />
            <Divider />

            <UserScrollContainer onClick={(id) => setSelectedUserId(id)}>
              <RightContents
                chatHistory={userObjectData.chatHistory}
                currentItemSelected={currentItemSelected} 
              />
              <div style={{ marginBottom: 220 }}  ref={messagesEndRef}></div>
            </UserScrollContainer>

            <div 
              style={{ 
                position: 'absolute', 
                bottom: 0,
                left: 10,
                right: 10,
                // width: '100%',
                backgroundColor: 'white',
                // background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
                height: 70,
              }} 
            />
            <BottomTextContainer onClickSendButton={onClickSendButton} />
          </div>
        </Stack>
      </Item>
    </UserAndChatHistoryContext.Provider>
  );
};

export default Chat;
