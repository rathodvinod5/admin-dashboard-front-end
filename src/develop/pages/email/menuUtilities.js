import React, { useEffect } from 'react';
import {
    IconButton, Menu, MenuItem, Button, MenuList, ListItemText, ListItemIcon, Stack
} from '@mui/material';
import { FolderOutlined, LabelOutlined, DeleteOutline, ReplayOutlined, MoreVert } from '@mui/icons-material';
import { styled, useTheme } from "@mui/material/styles";
import { ChatText, SectionTitle } from "../../components/typographies/index";
import { Dot, getIcons } from './generatlUtilities';
import PropTypes from 'prop-types';
import { useEmailContext } from '../../context/emailContext';

export const MailSubCategoryMenu = ({ processMailData, setMoveToCategory }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const options = [
    { title: "Personal", tag: "per" },
    { title: "Important", tag: "imp" },
    { title: "Company", tag: "cmp" },
    { title: "Private", tag: "pvt" },
  ];
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();

  useEffect(() => { }, [anchorEl]);
  

  const handleClick = (event) => {
    // console.log('anchor element: ', event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // console.log('handleClose called');
    // setMoveToCategory(null);
    setAnchorEl(null);
  };

  const handleMenuClick = (moveTo) => {
    console.log('inside handleMenuClick: ', moveTo);
    // processMailData('move', moveTo);
  }

  const renderMiniMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleClose}
      keepMounted={true}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      title="mail-sub-cat-menu"
    >
      {options.map((ele, index) => (
          <MenuList key={`mini-menu-${index}`}>
            <MenuItem
              onClick={() => processMailData('changetag', ele.title.toLowerCase())}
              fullWidth={true}
              disableRipple={true}
              style={{
                marginTop: -10,
                textTransform: "capitalize",
              }}
            >
              <Dot index={index} title={ele.title.toLowerCase()} />
              <ListItemText>{ele.title}</ListItemText>    
            </MenuItem>
          </MenuList>
        ))}
    </Menu>
  );


  return (
    <div>
      {renderMiniMenu}
      <IconButton
        id="demo-positioned-button"
        // style={{ position: 'relative' }}
        aria-controls={isMenuOpen ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleClick}
        title="cat-pin-icon-button"
      >
        <LabelOutlined />
      </IconButton>
    </div>
  );
}
  
export const FolderIconWithMenu = ({ processMailData, setMoveToCategory }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  

  useEffect(() => {
  }, [anchorEl]);

  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setMoveToCategory(null);
    setAnchorEl(null);
  };

  const handleMenuClick = (moveTo) => {
    console.log('inside handleMenuClick: ', moveTo);
    processMailData('move', moveTo);
  }

  const renderMiniMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleClose}
      keepMounted={true}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      title="move-spam-trash-menu"
    >
      <MenuItem onClick={() => handleMenuClick('spam')} sx={{ paddingRight: 3 }}>
        <ListItemIcon>{getIcons('spm')}</ListItemIcon>
        <ListItemText>Spam</ListItemText>    
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('trash')}  sx={{ paddingRight: 3 }}>
        <ListItemIcon>{getIcons('trs')}</ListItemIcon>
        <ListItemText>Trash</ListItemText>    
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      {renderMiniMenu}
      <IconButton
        id="demo-positioned-button"
        // style={{ position: 'relative' }}
        aria-controls={isMenuOpen ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleClick}
        title="move-op-folder-icon"
      >
        <FolderOutlined />
      </IconButton>
    </div>
  );
}

export const OperationsMenu = ({
  showOptions, onClickDeleteButton, setRefresh, contHeight, title, processMailData, 
  // checkObject emailCategory, onOperationSuccess, performSingle, selectedItemData,
}) => {

  return (
    <div style={{ height: contHeight}} title={title}>
      <Stack 
        direction="row" 
        justifyContent='space-between' 
        alignItems="center"
        sx={{ padding: 0.5, paddingLeft: 2.5, paddingRight: 2}}
      >
      <div>
        <Stack direction="row" alignItems="center" sx={{ marginLeft: -1 }}>
          {showOptions ? (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <FolderIconWithMenu processMailData={processMailData} />
              <MailSubCategoryMenu processMailData={processMailData} />
              <IconButton onClick={onClickDeleteButton} title="op-menu-del-icon">
                <DeleteOutline />
              </IconButton>
            </div>
          ) : null}
        </Stack>
      </div>
      <div>
        <IconButton aria-label="delete" onClick={() => setRefresh(true)}>
          <ReplayOutlined />
        </IconButton>
        <IconButton aria-label="delete"><MoreVert /></IconButton>
      </div>
      </Stack>
    </div>
  );
}

OperationsMenu.propTypes = {
  contHeight: PropTypes.number,
  title: PropTypes.string,
  performSingle: PropTypes.bool,
  selectedItemData: PropTypes.object
}
OperationsMenu.defaultProps = {
  contHeight: 55,
  title: 'operations-menu-cont-main',
  performSingle: false,
  selectedItemData: {}
}