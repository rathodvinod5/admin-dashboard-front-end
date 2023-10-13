import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Typography,
  MenuItem,
  IconButton,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Close,
  MailOutlined,
  CallOutlined,
  AccessTime,
  TurnedInNot,
  StarOutline,
  PhotoSizeSelectActual,
  DeleteOutline,
  Block,
  CheckCircleOutline,
  NotificationAddOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors"
import { styled, useTheme } from "@mui/material/styles";
import UserAndChatHistoryContext from "../../context/userAndChatContext";
import AvatarWithActiveIcon from "../../templates/avatar";
import { getGradientColor } from "../../theme/Theme";
import {
  ChatText,
  SubTitle,
  SectionTitle,
} from "../../components/typographies/index";
import PropTypes from 'prop-types';

const ItemContainer = ({
  title,
  subtitle,
  firstLetter,
  isActive,
  currentIndex,
  index,
  selectedColor,
  onClickItem,
  onClick,
  showDate,
  disabled,
  showIsActiveTick,
  selectedItemId,
  currentItemId 
}) => {
  const theme = useTheme();
  const CustomMenuItem = styled(MenuItem)({
    height: 60,
    borderRadius: 5,
    marginTop: 2,
    "&.Mui-selected": {
      background:
        "linear-gradient(to right, " +
        `${getGradientColor(selectedColor, "dark")}` +
        ", " +
        `${getGradientColor(selectedColor, "dark")}` +
        ")",
    },
    "&.Mui-active": {
      backgroundColor: "red",
    },
  });
  const baseTitleStyles = {
    fontWeight: 500,
    textAlign: "left",
    fontFamily:
      'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  };

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
  return (
    <CustomMenuItem
      fullWidth={true}
      selected={selectedItemId === currentItemId}
      onClick={() => {
        console.log("inside inner onClick: ", index);
        onClickItem(currentItemId);
      }}
      sx={{ padding: 0 }}
      title="profile-item-cont"
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
          isActive={isActive}
          hideDot={!showIsActiveTick}
        />
        <div style={{ width: "100%", paddingLeft: 3, paddingRight: 10 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Title
              sx={{
                color:
                  selectedItemId === currentItemId 
                    ? "#fff"
                    : theme.palette.mode === "dark"
                    ? "rgba(231, 227, 252, 0.87)"
                    : "rgba(58, 53, 65, 0.87)",
              }}
            >
              {title}
            </Title>
            {showDate ? (
              <SubTitle
                sx={{
                  textAlign: "right",
                  color:
                    selectedItemId === currentItemId 
                      ? "#fff"
                      : theme.palette.mode === "dark"
                      ? "rgba(231, 227, 252, 0.68)"
                      : "rgba(58, 53, 65, 0.68)",
                }}
              >
                Jul 27
              </SubTitle>
            ) : null}
          </Stack>
          <SubTitle
            sx={{
              color:
                selectedItemId === currentItemId 
                  ? "#fff"
                  : theme.palette.mode === "dark"
                  ? "rgba(231, 227, 252, 0.68)"
                  : "rgba(58, 53, 65, 0.68)",
            }}
          >
            {subtitle}
          </SubTitle>
        </div>
      </Stack>
    </CustomMenuItem>
  );
};
export default ItemContainer;

ItemContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  firstLetter: PropTypes.string,
  isActive: PropTypes.bool,
  currentIndex: PropTypes.number,
  index: PropTypes.number,
  selectedColor: PropTypes.string,
  isClickable: PropTypes.bool,
  onClick: PropTypes.func,
  showDate: PropTypes.bool,
  disabled: PropTypes.bool,
  showIsActiveTick: PropTypes.bool,
  selectedItemId: PropTypes.number,
  currentItemId: PropTypes.number, 
}

ItemContainer.defaultProps = {
  firstLetter: 'A',
  isActive: false,
  currentIndex: -1,
  index: 10000,
  selectedColor: green['400'],
  isClickable: false,
  onClick: () => {},
  showDate: false,
  disabled: true,
  showIsActiveTick: true,
  selectedItemId: 10000,
  currentItemId: -1, 
}

const getIcons = (tag) => {
  switch (tag) {
    case "tag":
      return <TurnedInNot />;
    case "imp":
      return <StarOutline />;
    case "med":
      return <PhotoSizeSelectActual />;
    case "del":
      return <DeleteOutline />;
    case "blc":
      return <Block />;
    case "chk":
      return <CheckCircleOutline />;
    case "ntp":
      return <NotificationAddOutlined />;
    case "inv":
      return <PersonOutlineOutlined />;
    default:
      return null;
  }
};

export const ChatDrawerContents = ({ type, userId, onClickClose }) => {
  const { userObjectData } = useContext(UserAndChatHistoryContext);
  const [userInfo, setUserInfo] = useState({
    id: '', title: 'A', des: '', isActive: false, email: '', contact: '', timeline: '', subTitle: ''
  });
  const { users, contacts } = userObjectData;
  // let userInfo = { id: '', title: 'A', des: '', isActive: false, email: '', contact: '', timeline: '', subTitle: '' };
  // let user = null; users.filter(us => { return us.id === userId });
  // userInfo = user.length > 0 ? user[0] : userInfo;

  useEffect(() => {
    if (users.length > 0) {
      users.forEach((item) => {
        if(item.id === userId){
          setUserInfo({ ...item });
        }
      });
    }
    if (userInfo.id === '' && contacts.length > 0) {
      contacts.forEach((item) => {
        if (item.id === userId) {
          setUserInfo({ ...item });
        }
      });
    }
  });

  const options = [
    { title: "Add Tag", tag: "tag" },
    { title: "Important Contact", tag: "imp" },
    { title: "Shared Media", tag: "med" },
    { title: "Delete Contact", tag: "del" },
    { title: "Block Contact", tag: "blo" },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          size="medium"
          color="secondary"
          aria-label="add an alarm"
          onClick={onClickClose}
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
        <AvatarWithActiveIcon
          title={userInfo.title.charAt(0).toUpperCase()}
          isClickable={false}
          isActive={true}
          styles={{ width: 80, height: 80 }}
        />
        <ChatText sx={{ fontWeight: "bold", textAlign: "center" }}>
        </ChatText>
        <SubTitle sx={{ textAlign: "center", fontSize: 14 }}>
          {userInfo.des}
        </SubTitle>
      </div>
      <br />

      <div>
        <SectionTitle>ABOUT</SectionTitle>
        <div style={{ height: 10 }} />
        <ChatText>
          {userInfo.subTitle}
        </ChatText>
      </div>

      <div style={{ marginTop: 30 }}>
        <SectionTitle>PERSONAL INFORMATION</SectionTitle>
        <div style={{ height: 10 }} />
        <Stack
          style={{ marginLeft: 10 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <MailOutlined fontSize="small" />
          <ChatText style={{ marginLeft: 10 }}>
            {userInfo.email}
          </ChatText>
        </Stack>
        <Stack
          style={{ marginTop: 10, marginLeft: 10 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <CallOutlined fontSize="small" />
          <ChatText style={{ marginLeft: 10 }}>{userInfo.contact}</ChatText>
        </Stack>
        <Stack
          style={{ marginTop: 10, marginLeft: 10 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <AccessTime fontSize="small" />
          <ChatText style={{ marginLeft: 10 }}>{userInfo.timeline}</ChatText>
        </Stack>
      </div>

      <div style={{ marginTop: 30 }}>
        <SectionTitle style={{ marginBottom: 10 }}>OPTIONS</SectionTitle>
        {/* <div style={{ height: 10 }} /> */}
        {options.map((ele) => (
          <MenuList>
            <MenuItem style={{ marginTop: -10 }}>
              <ListItemIcon>{getIcons(ele.tag)}</ListItemIcon>
              <ListItemText>
                <ChatText> {ele.title}</ChatText>
              </ListItemText>
            </MenuItem>
          </MenuList>
        ))}
      </div>

      <div style={{ height: 30 }} />
    </div>
  );
};

export const ChatDrawerContentsLeft = ({ type, userId, onClickClose }) => {
  const options = [
    { title: "Two-Step Verification", tag: "chk" },
    { title: "Notification", tag: "ntp" },
    { title: "Invite Friends", tag: "inv" },
    { title: "Delete Account", tag: "del" },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          size="medium"
          color="secondary"
          aria-label="add an alarm"
          onClick={onClickClose}
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
        <AvatarWithActiveIcon
          title={"N"}
          isClickable={false}
          isActive={true}
          styles={{ width: 80, height: 80 }}
        />
        <ChatText sx={{ fontWeight: "bold", textAlign: "center" }}>
          John Doe
        </ChatText>
        <SubTitle sx={{ textAlign: "center", fontSize: 14 }}>Admin</SubTitle>
      </div>
      <br />

      <div>
        <SectionTitle>ABOUT</SectionTitle>
        <div style={{ height: 10 }} />
        <ChatText>
          Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream
          bear claw brownie brownie marshmallow.
        </ChatText>
      </div>

      <div style={{ marginTop: 30 }}>
        <SectionTitle>STATUS</SectionTitle>
        <div style={{ height: 10 }} />
        <Stack
          style={{ marginLeft: 10 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <MailOutlined fontSize="small" />
          <ChatText style={{ marginLeft: 10 }}>
            felecia_rower@email.com
          </ChatText>
        </Stack>
        <Stack
          style={{ marginTop: 10, marginLeft: 10 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <CallOutlined fontSize="small" />
          <ChatText style={{ marginLeft: 10 }}>+1(123) 456 - 7890</ChatText>
        </Stack>
        <Stack
          style={{ marginTop: 10, marginLeft: 10 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <AccessTime fontSize="small" />
          <ChatText style={{ marginLeft: 10 }}>Mon - Fri 10AM - 8PM</ChatText>
        </Stack>
      </div>

      <div style={{ marginTop: 30 }}>
        <SectionTitle style={{ marginBottom: 10 }}>SETTINGS</SectionTitle>
        {/* <div style={{ height: 10 }} /> */}
        {options.map((ele, index) => (
          <MenuList key={'settings-item-' + index }>
            <MenuItem style={{ marginTop: -10 }}>
              <ListItemIcon>{getIcons(ele.tag)}</ListItemIcon>
              <ListItemText>
                <ChatText> {ele.title}</ChatText>
              </ListItemText>
            </MenuItem>
          </MenuList>
        ))}
      </div>

      <div style={{ height: 30 }} />
    </div>
  );
};
