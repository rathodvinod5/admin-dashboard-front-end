import React, { useContext, useEffect } from 'react';
import { Paper, Stack, IconButton, Divider, InputBase, InputAdornment, Drawer, Chip, Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { MoreVert, ArrowBackRounded, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { OperationsMenu } from './menuUtilities';
import { colorsArray } from './generatlUtilities';
import ItemContainer from '../chat/utilities';
import { SectionTitle } from '../../components/typographies';
// import EmailDataContext from "../../context/emailContext";
import { useEmailContext } from '../../context/emailContext';
import { useAuthValues } from '../../context/authContext';
import './styles.css';

export const DisplayEmailContents = ({
    data, disableContents, processMailData, setRefresh, getNextAndPrevMessageContents, emailCategory
}) => {

  const theme = useTheme();
  const { isLoading, emailContents, allMailData } = useEmailContext();
  const { email } = allMailData;

  useEffect(() => {

  }, [isLoading, emailContents])

  let title = email === data.from ? data.creatorDisplayName : email === data.to ? data.receiverDisplayName : '';
  let userEmail = '';
  if(emailCategory === 'inbox'){
    userEmail = data.from;
  }else if(emailCategory === 'sent'){
    userEmail = data.to;
  }else{
    userEmail = email === data.from ? data.from : email === data.to ? data.to : ''
  }
  const subCatList = email === data.from ? data.creatorSubCat : email === data.to ? data.receiverSubCat : [];
   
  return (
    <Paper
      style={{
        zIndex: 20, position: 'absolute', top: 0, left: 0,
        right: 0, bottom: 0, width: '100%', height: '100%',
      }}
    >
      <div style={{ height: 45, width: '100%'}} title="email-content-cont">
        <Stack 
          direction="row" 
          justifyContent='space-between' 
          alignItems="center"
          sx={{ padding: 0, paddingRight: 2, width: '100%' }}
        >
          <Stack 
            direction="row" 
            justifyContent='flex-start' 
            alignItems="center"
            sx={{ padding: 0.5, paddingLeft: 2, paddingRight: 2, }}
            title="message-and-chip-cont"
          >
            <IconButton onClick={disableContents} sx={{ marginLeft: -1 }} title="content-cont-back-arrow">
              <ArrowBackRounded fontSize="small" />
            </IconButton>
            <Typography 
              sx={{ fontSize: 15, marginBottom: -0.2 }} 
              gutterBottom
              variant="h2"
            >
              {data.subject}
            </Typography>

            {subCatList.map(ele => (
              <Chip
                label={ele}
                variant="outlined"
                sx={{
                  color: colorsArray(ele),
                  marginLeft: 1,
                  borderColor: colorsArray(ele),
                }}
                title={`category-chip-${ele}`}
              />
            ))}
            
          </Stack>
          <Stack 
            direction="row" 
            justifyContent='flex-end' 
            alignItems="center"
          >
            <IconButton 
              disabled={!data.hasPrev}
              onClick={() => {
                if (data.hasPrev) getNextAndPrevMessageContents(data.index - 1);
              }}
              title="prev-icon-button"
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton 
              disabled={!data.hasNext}
              onClick={() => {
                if (data.hasNext) getNextAndPrevMessageContents(data.index + 1);
              }}
              title="next-icon-button"
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </div>
      <Divider />

      <OperationsMenu 
        title='operations-menu-cont'
        contHeight={50}
        showOptions={true}
        processMailData={(type, moveTo) => {
          processMailData(type, moveTo, { [data._id]: true })
        }}
        onClickDeleteButton={(type, moveTo) => processMailData(type, moveTo, { [data._id]: true })}
        setRefresh={setRefresh}
      />

      <Divider />
      <div className='message-parent-cont' style={{ backgroundColor: theme.palette.background.default }}>
        <Paper style={{ width: '95%', paddingBottom: '30px'}} >
          <Stack 
            direction="row" 
            justifyContent="space-between"
            alignItems="center"
            sx={{ paddingLeft: 1, paddingRight: 1, width: '100%' }}
          >
            <ItemContainer
              title={title}
              subtitle={userEmail.toLowerCase()}
              firstLetter={title.charAt(0).toUpperCase()}
              showIsActiveTick={false}
              isActive={false}
              currentIndex={-1}
              index={1000}
              onClick={() => {}}
              selectedColor={'green'}
              showDate={false}
            />  
            <Stack 
              direction="row" 
              justifyContent='flex-end' 
              alignItems="center"
            >
              <SectionTitle style={{ fontSize: 14, }}>
                {moment().format('MMM Do YYYY, h:mm a')}
              </SectionTitle> 
              <IconButton aria-label="delete"><MoreVert /></IconButton>
            </Stack>
          </Stack>
          <Divider />
          <div style={{ padding: '20px', minHeight: 350, height: '100%' }}>
            <SectionTitle>
              {data.content.split("\n").map((i,key) => {
                  return <div key={key}>{i}</div>;
              })}
            </SectionTitle>
          </div>
        </Paper>
      </div>
    </Paper>
  );
}

DisplayEmailContents.propTypes = {
    title: PropTypes.string,
    email: PropTypes.string,
    hasNext: PropTypes.bool,
    hasPrev: PropTypes.bool,
    index: PropTypes.number,
    mail: {
      message: PropTypes.string,
      subject: PropTypes.string,
      timeStamp: PropTypes.string,
      type: []
  },
  emailCategory: PropTypes.string
}
DisplayEmailContents.defaultProps = {
    title: "",
    email: "",
    hasNext: true,
    hasPrev: false,
    index: 0,
    mail: {
      message: '',
      subject: '',
      timeStamp: new Date(),
      type: ['importanct']
  },
  emailCategory: 'inbox'
}