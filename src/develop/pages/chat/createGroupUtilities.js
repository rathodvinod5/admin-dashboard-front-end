import React, { useEffect, useState, useMemo } from 'react';
import {
  Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Card,
  CardHeader, Avatar, colors, Paper
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Check } from '@mui/icons-material';
// import { PropTypes } from 'prop-types';
import { useChatMessageContext } from '../../context/chatContext';
import AlertMessage from '../../components/alert/index';

import './styles.css';

export const CreateNewGroupButton = ({ onClick }) => {

  const theme = useTheme();
  const CustomButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    // color: theme.palette.mode === "dark" ? "#fff" : "rgba(58, 53, 65, 0.87)",
    paddingRight: 5,
    paddingLeft: 5,
    textTransform: 'none',
    paddingLeft: 15,
    paddingRight: 15,
    float: 'right',
    ':hover': {
      color: "rgba(231, 227, 252, 0.87))",
      backgroundColor: theme.palette.primary.main,
    }
  }));

  return (
    <Paper className="create-group-button-cont" elevation={0} style={{ backgroundColor: 'inherit' }}>
      <CustomButton
        variant='text'
        // style={{ float: 'right', backgroundColor: 'teal', textTransform: 'none', color: '#fff', padding: 10, paddingLeft: 15, paddingRight: 15 }} 
        onClick={onClick}
      >
        Create Group
      </CustomButton>
    </Paper>
  );
};

// CreateNewGroupButton.propTypes = {
//   onClick: PropTypes.fun,
// }

// CreateNewGroupButton.defaultProps = {
//   onClick: () => { },
// }

export const NewGroupModalContents = ({ showModalContents, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedItemSet, setSelectedItemSet] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { contactList, createNewGroup } = useChatMessageContext();
  const { contacts } = contactList;

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose(false);
    }
  }

  const CustomButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: '#fff',
    ':hover': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
    }
  }));

  const processData = () => {
    console.log('inside processData: ', groupName, selectedItemSet.length);
    if (groupName && selectedItemSet.length >= 2) {
      const inputObject = {
        groupName: groupName,
        users: selectedItemSet
      }
      createNewGroup(inputObject).then(result => {
        onClose(false);
      }).catch(error => {
        console.log('error at processData: ', error);
        setErrorMessage(error);
        setIsError(true);
      });

    } else {
      const errorMessage = !groupName ? 'Group Name should not be empty' : 'Group should have more then 2 users';
      setErrorMessage(errorMessage);
      setIsError(true);
    }
  }

  return (
    <Dialog
      open={showModalContents}
      // hideBackdrop={true}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "50%",
          // maxHeight: 800
        }
      }}
    >
      <AlertMessage open={isError} errorMessage={errorMessage} setOpen={setIsError} />
      <DialogTitle>Create New Group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter group name and select the users.
        </DialogContentText>
        <div style={{ height: 10 }} />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Group Name"
          // type="email"
          fullWidth
          variant="standard"
          value={groupName}
          error={false}
          onChange={(event) => setGroupName(event.target.value)}
        />
        <div style={{ height: 10 }} />
        <div style={{ maxHeight: 260, overflowY: 'scroll' }}>
          {contacts.map(ele => {
            const key = "user-list-item-" + ele.email;
            return (
              <React.Fragment key={key}>
                <Users
                  item={ele}
                  setSelectedItem={(email) => {
                    if (selectedItemSet.includes(email)) {
                      const newItemSetArray = selectedItemSet.filter(item => item !== email);
                      setSelectedItemSet(newItemSetArray);
                    } else {
                      setSelectedItemSet([...selectedItemSet, email]);
                    }
                  }}
                  selectedItemSet={selectedItemSet}
                />
              </React.Fragment>
            )
          })}
          {/* {[1, 2, 3, 4, 5].map(ele => <Users  />)} */}
        </div>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="text"
          size="small"
          style={{ textTransform: 'none', color: '#fff' }}
          onClick={onClose}
        >
          Close
        </CustomButton>
        <CustomButton
          variant="text"
          size="small"
          style={{ textTransform: 'none', color: '#fff', paddingLeft: 15, paddingRight: 15 }}
          onClick={processData}
        >
          Create Group
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

const Users = ({ item, setSelectedItem, selectedItemSet }) => {
  const { grey } = colors;
  const isSelected = selectedItemSet.includes(item.email);
  const theme = useTheme();

  return (
    <Paper elevation={0} style={{ backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.paper }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'tomato' }} aria-label="recipe">
            {item.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        style={{
          cursor: 'pointer',
          // backgroundColor: grey[100], 
          borderRadius: 4,
          marginBottom: 4
        }}
        onClick={() => {
          setSelectedItem(item.email);
        }}
        action={isSelected ? (
          <div className="check-circle" style={{ border: '1.5px solid green' }}>
            <Check sx={{ color: 'green', marginLeft: '10%', fontSize: 20 }} size="small" />
          </div>
        ) : null}
        title={item.name}
        subheader={item.email}
      />
    </Paper>
  );
}