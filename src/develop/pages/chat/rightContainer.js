/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from "react";
import { IconButton, InputBase, Button, Stack, Paper } from "@mui/material";
import { AttachFile, MicOutlined, Done, DoneAll } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import AvatarWithActiveIcon from "../../templates/avatar";
import { useChatMessageContext } from "../../context/chatContext";
import { useAuthValues } from "../../context/authContext";
import {
  ChatText,
  SubTitle,
  SectionTitle,
} from "../../components/typographies/index";
import { PaperItemByMe, PaperItemByThem } from "../../components/paper/index";

function RightContents({ currentItemSelected }) {
  const { chatMessagesHistory } = useChatMessageContext();
  const { token } = useAuthValues();
  // const messageEl = React.createRef()

  useEffect(() => {
    // scrollToBottom()
    // console.log('messageEl: ')
    // if (messageEl.current) {
    //   messageEl.current.addEventListener('DOMNodeInserted', event => {
    //     const { currentTarget: target } = event;
    //     target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    //   });
    // }
  }, [JSON.stringify(chatMessagesHistory)]);

  return (
    <div style={{ height: "100%" }}>
      {currentItemSelected !== -1 && chatMessagesHistory.length > 0 ? (
        <div
          // ref={messageEl}
          // ref={ref}
          style={{
            width: "100%",
            paddingBottom: 120,
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          {chatMessagesHistory.reverse().map((ele, index) => {
            if (ele.sender !== undefined && ele.sender._id !== undefined) {
              if (token.userId === ele.sender._id) {
                return <ByMeContainer key={`by-me-${index}`} {...ele} />;
              }
              return <ByThemContainer key={`by-them-${index}`} {...ele} />;
            }
            return <p>Error</p>;
          })}
        </div>
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <SectionTitle>No chat history</SectionTitle>
        </Stack>
      )}
    </div>
  );
}
export default RightContents;

const ByMeContainer = ({ message, updatedAt }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 30,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        style={{
          width: "70%",
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          {/* {message.map(msg => (
            <PaperItemByMe>
              <ChatText>{msg}</ChatText>
            </PaperItemByMe>
          ))} */}
          <PaperItemByMe>
            <ChatText>{message}</ChatText>
          </PaperItemByMe>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* {getCheckIcons(status)} */}
            <SubTitle
              sx={{
                marginTop: 1,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(231, 227, 252, 0.87)"
                    : "rgba(58, 53, 65, 0.87)",
              }}
            >
              {moment(updatedAt).format("MMM Do YYYY, h:mm a")}
            </SubTitle>
          </Stack>
        </Stack>
        <div
          style={{
            paddingTop: "5px",
          }}
        >
          <AvatarWithActiveIcon
            title="N"
            isClickable={false}
            isActive={false}
            hideDot
          />
        </div>
      </Stack>
    </div>
  );
}

// const getCheckIcons = (status) => {
//   console.log("case: ", status);
//   switch (status) {
//     case 0:
//       return (
//         <Done
//           fontSize="small"
//           style={{
//             marginTop: "5px",
//           }}
//         />
//       );
//     case 1:
//       return (
//         <Done
//           fontSize="small"
//           style={{
//             marginTop: "5px",
//           }}
//           color="primary"
//         />
//       );
//     case 2:
//       return (
//         <DoneAll
//           fontSize="small"
//           style={{
//             marginTop: "5px",
//           }}
//           color="primary"
//         />
//       );
//     default:
//       return <div />;
//   }
// };

const ByThemContainer = ({ message, updatedAt }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: "100%",
        marginBottom: 30,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{
          width: "70%",
        }}
      >
        <div
          style={{
            paddingTop: "5px",
          }}
        >
          <AvatarWithActiveIcon
            title="N"
            isClickable={false}
            isActive={false}
            hideDot
          />
        </div>
        <div>
          <PaperItemByThem>
            <ChatText>{message}</ChatText>
          </PaperItemByThem>
          {/* {message.map(msg => (
            <PaperItemByThem>
              <ChatText>{msg}</ChatText>
            </PaperItemByThem>
          ))} */}
          <SubTitle
            sx={{
              marginTop: 1,
              color:
                theme.palette.mode === "dark"
                  ? "rgba(231, 227, 252, 0.87)"
                  : "rgba(58, 53, 65, 0.87)",
            }}
          >
            {moment(updatedAt).format("MMM Do YYYY, h:mm a")}
          </SubTitle>
        </div>
      </Stack>
    </div>
  );
}

export function BottomTextContainer({ currentItemSelected }) {
  const [textValue, setTextValue] = useState("");

  const { contactList, postChatMessage } = useChatMessageContext();
  const { contacts, groups } = contactList;

  const getUserEmail = async () => {
    if (currentItemSelected >= 0) {
      try {
        if (currentItemSelected < contacts.length) {
          return {
            isGroup: false,
            message: textValue,
            toUserEmail: contacts[currentItemSelected].email,
          };
        }
        return {
          isGroup: true,
          message: textValue,
          groupId: groups[currentItemSelected % contacts.length]._id,
        };
      } catch (error) {
        console.log("error: ", error);
        return null;
      }
    } else {
      return null;
    }
  };

  const onClickSendMessage = useCallback(async () => {
    const resultObject = await getUserEmail();
    console.log("inside onClickSendMessage: ");
    if (resultObject !== null) {
      postChatMessage(resultObject)
        .then((res) => {
          console.log("inside resolve: ", res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "94%",
        paddingRight: 2,
        position: "absolute",
        bottom: 20,
        left: "3%",
      }}
    >
      <InputBase
        value={textValue}
        onChange={(event) => {
          setTextValue(event.target.value);
        }}
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder="Type your message here..."
        inputProps={{
          "aria-label": "search google maps",
        }}
      />
      <IconButton
        type="submit"
        sx={{
          p: "10px",
        }}
        aria-label="search"
      >
        <AttachFile fontSize="small" />
      </IconButton>
      <IconButton
        color="primary"
        sx={{
          p: "10px",
        }}
        aria-label="directions"
      >
        <MicOutlined />
      </IconButton>
      <Button onClick={onClickSendMessage}>Send</Button>
    </Paper>
  );
}
