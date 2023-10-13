import React, { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { Stack, IconButton, Avatar, Divider, CircularProgress, Box } from "@mui/material";
import { SignalCellularNull, StarBorderOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CustomCheckBox from "../../atoms/CheckBoxAlt";
import { ChatText, SectionTitle } from "../../components/typographies/index";
import PropTypes from 'prop-types';
import { useEmailContext } from '../../context/emailContext';
import AlertMessage from '../../components/alert';
import { getTrueCount } from "./utitilities";
import './styles.css';
// import EmailDataContext from "../../context/emailContext";

export const EMailElement = ({ userEmail, ele, checked, index, onClickCheckBox, showEmailContents, emailCategory }) => {

  const colorsArray = (type) => {
    switch (type) {
      case 'personal': return "#56CA00";
      case 'company': return "#9155FD";
      case 'important': return "#FFB400";
      default: return "#FF4C51";
    }
  }

  const Dot = ({ type }) => {
    return (
      <div
        style={{
          marginRight: "5px",
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colorsArray(type)
        }}
        title={`tag-label-div-${type}`}
      />
    );
  };

  const displayName = userEmail === ele.from ? ele.creatorDisplayName : userEmail === ele.to ? ele.receiverDisplayName : '';
  const subCatList = userEmail === ele.from ? ele.creatorSubCat : userEmail === ele.to ? ele.receiverSubCat : [];

  return (
    <div title="email-list-item">

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 0.6, paddingLeft: 2, paddingRight: 2 }}
      >
        <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
          <CustomCheckBox
            style={{ width: 30, height: 30 }} 
            checked={checked}
            onClickCheckBox={(value) => {
              // onClickCheckBox(ele.email, value);
              onClickCheckBox(ele._id, value);
            }}
            />
          <IconButton aria-label="delete" sx={{ marginRight: 1.5 }}>
            <StarBorderOutlined fontSize="s" />
          </IconButton>
          <Avatar
            alt={ele.title}
            src="../../../assets/avatar/laurette.jpg"
            sx={{ width: 30, height: 30 }}
            // si {...stringAvatar("Kent Dodds")} 
          />
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems="center"
            style={{ width: '100%', paddingTop: 3, paddingBottom: 3 }}
            onClick={() => {
              showEmailContents({ index, ele });
            }}
            title="clickable-stack-item"
          >
            <ChatText sx={{ fontWeight: "bold", marginLeft: 1.5 }}>
              {displayName}
            </ChatText>
            <SectionTitle sx={{ fontSize: 13, marginLeft: 1.5 }}>
              {ele.subject}
            </SectionTitle>
          </Stack>
          
        </Stack>
        <div className='grid-container' title="tag-label-container">
          {subCatList.map(item => <Dot type={item} />)}
        </div>
        <div></div>
      </Stack>
      <Divider />
    </div>
  );
};

const MailRightContents = ({
  parentData, showOptions, setShowOptions, refresh, refreshFinished, showEmailContents, checkObjectParent, emailCategory,
}) => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  const theme = useTheme();
  const { getEmailContents, allMailData } = useEmailContext();
  let checkObject = { ...checkObjectParent };
  
  useState(() => { 
    if (parentData) {
      setData(parentData);
    }
    if (data !== null && data.length > 0) {
      data.forEach((ele) => { checkObject[ele.email] = false });
    }
  }, [parentData]);

  useState(() => { 
    if (refresh) {
      setTimeout(() => {
        refreshFinished();
      }, 2500);
    }
  }, [refresh]);

  const onClickCheckBox = (messageId, value) => {
    // checkObject = { ...checkObjectParent, [email]: value }
    checkObject = { ...checkObjectParent, [messageId]: value }
    const trueCount = getTrueCount(checkObject);
    setShowOptions(trueCount > 0, trueCount > 0 ? checkObject : {});
  }

  // const getEmailContentData = (props) => {
  //   getEmailContents().then(resp => {
  //     console.log('resp: ', resp)
  //   }).catch(error => {
  //     setErrorMessage(error);
  //     setOpen(true);
  //   })
  // }


  return (
    <div style={{ width: "100%", position: 'relative', height: '100%' }} title="mail-right-content">
      <AlertMessage open={open} errorMessage={errorMessage} setOpen={setOpen} />
      {refresh ? (
        <div
          title="refresh-container"
          className="refresh-container"
          style={{ backgroundColor: theme.palette.loaderBackground.main, height: '100%' }}
        >
          <Box sx={{ display: 'flex', marginTop: -10 }}>
            <CircularProgress style={{ color: 'rgba(244, 245, 250)' }} />
          </Box>
        </div>
      ) : null}
      <div style={{ width: '100%' }} title="emails-list-cont">
        {data !== null && data.map((ele, index) => {
          return (
            <EMailElement
              userEmail={allMailData.email}
              key={`email-element-${index}`}
              // checked={checkObjectParent[ele.email] === true}
              checked={checkObjectParent[ele._id] === true}
              ele={ele}
              index={index}
              emailCategory={emailCategory}
              showEmailContents={(props) => showEmailContents(props)}
              // showEmailContents={getEmailContentData}
              onClickCheckBox={(messageId, val) => onClickCheckBox(messageId, val)}
            />
          )
        })}
      </div>
    </div>
  );
};

export default MailRightContents;

MailRightContents.propTypes = {
  userEmail: PropTypes.string,
  selectAll: PropTypes.bool,
  uncheckParentCheckBox: PropTypes.func,
  showOptions: PropTypes.bool,
  setShowOptions: PropTypes.func,
  mailCategory: PropTypes.string,
}

MailRightContents.defaultProps = {
  userEmail: '',
  selectAll: false,
  uncheckParentCheckBox: () => { },
  showOptions: false,
  setShowOptions: () => { },
  mailCategory: 'inbox'
}




