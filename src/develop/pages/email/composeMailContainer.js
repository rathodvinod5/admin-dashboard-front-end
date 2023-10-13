import React, { useState, useContext } from "react";
import { Paper, Stack, IconButton, Divider, InputBase, ButtonGroup, Button, Menu,
  MenuItem } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Close, MinimizeOutlined, DeleteOutline, MoreVert, ExpandLessOutlined } from "@mui/icons-material";
import { ChatText } from "../../components/typographies";
import { grey } from "@mui/material/colors";
import PropTypes from 'prop-types';
// import EmailDataContext from "../../context/emailContext";
import { useEmailContext } from '../../context/emailContext';

const ComposeMailContainer = ({ onClickClose }) => {
  const [minimise, setMinimise] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const theme = useTheme();
  // const { allMailData, setAllMailData } = useContext(EmailDataContext);
  const { postNewMail, getCategoryEmails } = useEmailContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  const processNewMessageContents = () => {
    if (toAddress !== null && message !== null && validateEmail(toAddress)) {
      const dataObject = {
        content: message,
        toAddress: toAddress,
        subject: subject,
      };
      // let newMailData = allMailData;
      // newMailData.sent.push();
      // setAllMailData(newMailData);
      postNewMail(dataObject).then(response => { 
        onClickClose();
        getCategoryEmails('sent').then();
      }).catch(error => {
        onClickClose();
        console.log('error: ', error);
      });
    }
  }

  return (
    <Paper
      style={{
        width: 700,
        height: minimise ? 50 : 400,
        overflow: "hidden",
        // backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
      title="title-compose-mail-cont"
      // name="title-compose-mail-cont"
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Stack
          sx={{
            height: 50,
            width: "100%",
            backgroundColor: theme.palette.mode === 'light' ? grey[200] : 'inherit',
            paddingLeft: 2.5,
            paddingRight: 1.5
          }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <ChatText sx={{ fontWeight: "bold" }}>Compose Mail</ChatText>
          </div>
          <div>
            <IconButton aria-label="minimize" onClick={() => setMinimise(!minimise)} title="title-minimize-icon">
              <MinimizeOutlined />
            </IconButton>
            <IconButton aria-label="close" onClick={onClickClose} name="title-close-icon">
              <Close />
            </IconButton>
          </div>
        </Stack>
        <Divider />
        {!minimise ? (
          <div style={{ width: '100%' }}>
            <Stack
              sx={{ height: 50, width: "100%", paddingLeft: 1.5, paddingRight: 1.5 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div style={{ width: "100%" }}>
                <Stack
                  sx={{ height: 50, width: "100%" }}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <ChatText>To:</ChatText> */}
                  <InputBase
                    value={toAddress}
                    onChange={(event) => setToAddress(event.target.value)}
                    fullWidth={true}
                    sx={{ ml: 1, flex: 1, width: "100%" }}
                    inputProps={{
                      "aria-label": "Enter to address",
                      style: { paddingLeft: '10px' }
                    }}
                    startAdornment={<p style={{ color: grey[500], fontSize: 15 }}>To:</p>}
                  />
                </Stack>
              </div>
              <div>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton sx={{ fontSize: 16 }}>Cc</IconButton>
                  <IconButton sx={{ fontSize: 16 }}>Bcc</IconButton>
                </Stack>
              </div>
            </Stack>
            <Divider />
            <Stack
              sx={{ height: 50, width: "100%", paddingLeft: 1.5, paddingRight: 1.5 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div style={{ width: "100%" }}>
                <Stack
                  sx={{ height: 50, width: "100%" }}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <ChatText>Subject:</ChatText> */}
                  <InputBase
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    fullWidth={true}
                    sx={{ ml: 1, flex: 1, width: "100%" }}
                    inputProps={{
                      "aria-label": "Enter subject",
                      style: { paddingLeft: '10px' }
                    }}
                    startAdornment={<p style={{ color: grey[500], fontSize: 15 }}>Subject:</p>}
                  />
                </Stack>
              </div>
            </Stack>
            <Divider />
            <InputBase
              fullWidth={true}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              multiline={true}
                sx={{
                  flex: 1,
                  width: "100%",
                  paddingLeft: 2.5,
                  paddingRight: 2,
                }}
              rows={8}
              placeholder="Message"
            />
            <Divider />
            <Stack
              sx={{
                height: 50,
                width: "100%",
                paddingLeft: 2,
                position: 'absolute',
                left: 0,
                bottom: 0,
                paddingRight: 1.5,
              }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
              <ButtonGroup variant="contained">
                <Button
                  //aria-label="send-button"
                  style={{ color: '#fff' }} 
                  disabled={toAddress === ''}
                  onClick={processNewMessageContents}
                >
                  Send
                </Button>
                <Button
                  id="demo-positioned-button"
                  aria-label="expand-less-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <ExpandLessOutlined style={{ color: '#fff' }} />
                </Button>
                <Menu
                  title="send-button-menu"
                  // aria-label="send-button-menu"
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem>Schedule Send</MenuItem>
                  <MenuItem>Save as Draft</MenuItem>
                </Menu>
              </ButtonGroup>
              </div>
              <div>
                <IconButton
                  aria-controls={open1 ? 'demo-positioned-menu1' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={handleClick1}
                  aria-label="more-vert"
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="demo-positioned-menu1"
                  title="gen-tasks-menu"
                  aria-labelledby="demo-positioned-button1"
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem>Print</MenuItem>
                  <MenuItem>Check Spelling</MenuItem>
                  <MenuItem>Plain Text Mode</MenuItem>
                </Menu>
                <IconButton
                  aria-label='delete'
                  onClick={() => {
                    setToAddress('');
                    setSubject('');
                    setMessage('');
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </div>
            </Stack>
          </div>
        ) : null}
        
      </div>
    </Paper>
  );
};

export default ComposeMailContainer;

ComposeMailContainer.propTypes = {
    onClickClose: PropTypes.func,
}
ComposeMailContainer.defaultProps = {
    onClickClose: () => {},
}

