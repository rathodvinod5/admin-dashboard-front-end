import React, { createContext, useEffect, useState } from "react";
import {
  Paper,
  Stack,
  InputAdornment,
  OutlinedInput,
  Divider,
  Typography,
  Drawer,
  LinearProgress
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { SearchOutlined, Call, Videocam, MoreVert } from "@mui/icons-material";
import AvatarWithActiveIcon from "../../templates/avatar/index";
import LeftContents from "./leftContent";
import RightContents from "./rightContainer";
import ItemContainer, { ChatDrawerContents, ChatDrawerContentsLeft } from "./utilities";
import DetailsUpperContainer from "./detailsUpperCont";
import { useChatMessageContext } from "../../context/chatContext";
import './styles.css';
import { BottomTextContainer } from "./rightContainer";
import useChatScroll from "./useScroll";
import { CreateNewGroupButton, NewGroupModalContents } from './createGroupUtilities';

const Chat = (props) => {
  const { type } = props;
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showDrawer, toggleDrawer] = useState(false);
  const [contentsType, setContentsType] = useState(0);
  const [currentItemSelected, setCurrentItemSelected] = useState(-1);

  const { isLoading, contactList, chatMessagesHistory } = useChatMessageContext();
  const messageEl = useChatScroll(chatMessagesHistory, isLoading);
  // const messageEl = React.useRef(0);

  useEffect(() => {
    // if (messageEl.current) {
    //   messageEl.current.addEventListener('DOMNodeInserted', event => {
    //     const { currentTarget: target } = event;
    //     target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    //   });
    // }
  }, [isLoading, contactList, JSON.stringify(chatMessagesHistory)]);


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
    // pointerEvents: 'none',
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

  return (
    <div>
      <Item
        variant={type === "outlined" ? type : "elevation"}
        sx={{ width: "95%", position: "relative", overflow: 'hidden' }}
        elevation={3}
        title="title-chat-cont"
        data-testId="id-chat-cont"
      >
        {isLoading ? (
          <LinearProgress
            style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
            color="success" />
        ) : null}

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

        {showCreateGroupModal ? (
          <NewGroupModalContents
            showModalContents={showCreateGroupModal}
            onClose={() => setShowCreateGroupModal(false)}
          />
        ) : null}

        <Drawer
          anchor={contentsType === 0 ? "left" : "right"}
          open={showDrawer}
          variant="persistent"
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
          <Item sx={{ width: "33%", height: "100%" }} style={{ position: 'relative' }}>
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
            <CreateNewGroupButton onClick={() => setShowCreateGroupModal(true)} />
          </Item>

          <div style={{ width: "67%", height: "100%", position: "relative" }}>
            <DetailsUpperContainer
              currentItemId={''}
              currentItemSelected={currentItemSelected}
              onClickItem={(val) => {
                setContentsType(1);
                toggleDrawer(!showDrawer);
              }}
            />
            <Divider />

            <UserScrollContainer onClick={(id) => setSelectedUserId(id)} ref={messageEl}>
              <RightContents
                currentItemSelected={currentItemSelected}
              />
            </UserScrollContainer>

            <Paper
            elevation={0}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'inherit',
                height: 70,
              }}
            />
            <BottomTextContainer currentItemSelected={currentItemSelected} />
          </div>
        </Stack>
      </Item>
    </div>
  );
};

export default Chat;
