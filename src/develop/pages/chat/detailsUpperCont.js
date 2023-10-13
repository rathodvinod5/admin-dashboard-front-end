import React, { useEffect, useState, useContext } from "react";
import { Stack, IconButton } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles";
import { SearchOutlined, Call, Videocam, MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";

import { useChatMessageContext } from "../../context/chatContext";
import ItemContainer from "./utilities";
import "./styles.css";

function DetailsUpperContainer({
  onClickItem,
  currentItemSelected,
  currentItemId,
}) {
  const [userObject, setUserObject] = useState(null);

  const { contactList } = useChatMessageContext();
  const { contacts, groups } = contactList;

  useEffect(() => {
    if (currentItemSelected >= 0) {
      try {
        if (currentItemSelected < contacts.length) {
          const tempObject = contacts[currentItemSelected];
          const userObj = {
            ...tempObject,
            subtitle: tempObject.email,
          };
          setUserObject(userObj);
        } else {
          const tempObject = groups[currentItemSelected % contacts.length];
          const userObj = {
            ...tempObject,
            name: tempObject.groupName,
            subtitle: "",
          };
          setUserObject(userObj);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }, []);

  return (
    <div
      style={{
        height: 65,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: 0.5,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {userObject !== null ? (
          <ItemContainer
            title={userObject.name}
            subtitle={userObject.subtitle}
            firstLetter={userObject.name.charAt(0).toUpperCase()}
            isActive
            currentIndex={-1}
            index={1000}
            disabled
            selectedColor="green"
            showDate={false}
            selectedItemId={currentItemSelected}
            currentItemId={currentItemId}
            onClickItem={onClickItem}
          />
        ) : (
          <div
            style={{
              height: 63,
            }}
          />
        )}
        <div>
          <IconButton aria-label="delete">
            <Call />
          </IconButton>
          <IconButton aria-label="delete">
            <Videocam />
          </IconButton>
          <IconButton aria-label="delete">
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </Stack>
    </div>
  );
}

export default DetailsUpperContainer;

DetailsUpperContainer.propTypes = {
  currentItemSelected: PropTypes.number,
  onClickItem: PropTypes.func,
  currentItemId: PropTypes.string,
};
DetailsUpperContainer.defaultProps = {
  currentItemSelected: -1,
  onClickItem: () => {},
  currentItemId: "",
};
