import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Paper, Stack, Divider, InputBase, InputAdornment, Drawer, LinearProgress
  } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import _ from 'lodash';
import { EmailBlockLeftContents } from './utitilities';
import MailRightContents from './rightContents';
import ComposeMailContainer from './composeMailContainer';
// import EmailDataContext, { dataObject } from "../../context/emailContext";
import { useEmailContext } from '../../context/emailContext';
import { OperationsMenu } from './menuUtilities';
import { DisplayEmailContents } from './displayMessageContents';
import { useAuthValues } from '../../context/authContext';
import Paginator from './paginator';


export default function Email(props) {
  const { type } = props;
  const [initiated, setInitiated] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [checkObject, setCheckObject] = useState({});
  const [emailCategory, setEMailCategory] = useState('inbox');
  const [refresh, setRefresh] = useState(false);
  const [slideValue, setSlideValue] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { loggedIn } = useAuthValues();
  const {
    isLoading, allMailData, getCategoryEmails, deleteEmail, moveEmailTo, changeEmailTag
  } = useEmailContext();

  useEffect(() => {
    if(allMailData !== null){
      console.log('in useEffect of email: ', allMailData[emailCategory].length );
    }else{
      console.log('in useEffect of email: ', allMailData === null );
    }
  }, [isLoading, allMailData]);

  const handleChange = (newValue) => {
    setSlideValue(newValue);
  };

  const theme = useTheme();
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
  }));

  const UserScrollContainer = styled('div')(({ theme }) => ({
    height: 450,
    overflowY:"scroll",
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {},
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#999',
        borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555'
    }
  }));

  const onClickDeleteButton = () => {
    console.log('inside onClickDeleteButton')
    processMailData('delete', '');
  }

  const processMailData = (operationType, moveTo, checkObjectParam = null) => {
    const emailCategoryArray = ['inbox', 'sent', 'draft', 'starred', 'spam', 'trash'];
    console.log('in processMailData: ', checkObjectParam)
    if (emailCategoryArray.includes(emailCategory)) {
      let trueCount = 0;
      const emailsToBeRemovedArray = [];
      if (checkObjectParam !== null) {
        for (let [key, value] of Object.entries(checkObjectParam)) {
          if (value === true) {
            trueCount++;
            emailsToBeRemovedArray.push(key);
          }
        }
      } else {
        for (let [key, value] of Object.entries(checkObject)) {
          if (value === true) {
            trueCount++;
            emailsToBeRemovedArray.push(key);
          }
        }
      }
      
      if (trueCount > 0) {
        if (operationType === 'move') {
          console.log('outer if: ', selectedItemData, allMailData[emailCategory].length);
          moveEmailTo(emailsToBeRemovedArray, emailCategory, moveTo).then(res => {
              setShowOptions(false);
              setCheckObject({});
              if(selectedItemData.index !== undefined){
                let index = selectedItemData.index;
                const { length } = allMailData[emailCategory];
                if(length === 0 && slideValue){
                  setSlideValue(false);
                }else if(index >= length){
                  processDataAfterMoveOrDeleteOp(selectedItemData.index - 1);
                }else{
                  processDataAfterMoveOrDeleteOp(selectedItemData.index + 1);
                }
              }
              // console.log('before if: ', selectedItemData.index, length, length > 0 && slideValue && selectedItemData.index !== undefined);
              // if(length > 0 && slideValue && selectedItemData.index !== undefined){
              //   processDataAfterMoveOrDeleteOp(selectedItemData.index);
              // }else{
              //   setSlideValue(false);
              // }
          }).catch(error => console.log('error: ', error));
        } else if (operationType === 'changetag') {
          changeEmailTag(emailsToBeRemovedArray, emailCategory, moveTo).then(res => {
            setShowOptions(false);
            setCheckObject({});
          }).catch(error => console.log('error: ', error));
        } else {
          deleteEmail(emailsToBeRemovedArray, emailCategory).then(res => {
            setShowOptions(false);
            setCheckObject({});
            const { currentItemToDisplay } = res;
            processDataAfterMoveOrDeleteOp(currentItemToDisplay);
          }).catch(error => console.log('error: ', error));
        }
      }
    }
  }

  const processDataAfterMoveOrDeleteOp = (currentItemToDisplay) => {
    console.log('inside processDataAfterMoveOrDeleteOp: ', currentItemToDisplay, allMailData[emailCategory].length);
    if (currentItemToDisplay !== -1) {
      const categoryLen = allMailData[emailCategory].length;
      if (currentItemToDisplay >= categoryLen) {
        getNextAndPrevMessageContents(currentItemToDisplay - 1);
      }else{
        getNextAndPrevMessageContents(currentItemToDisplay);
      }
    }else {
      getNextAndPrevMessageContents(currentItemToDisplay);
    }
  }

  const getNextAndPrevMessageContents = (index, displayContents = false) => {
    const arrLen = allMailData[emailCategory].length;
    // console.log('inside getNextAndPreMessage: ', index, arrLen, allMailData[emailCategory] !== undefined && arrLen > 0 && index >= 0 && index < arrLen)
    if (allMailData[emailCategory] !== undefined && arrLen > 0 && index >= 0 && index < arrLen) {
      const ele = allMailData[emailCategory][index];
      const hasNext = index + 1 < arrLen;
      const hasPrev = index - 1 >= 0;
      // console.log('before: seSelectedItemData: ', selectedItemData, hasNext, hasPrev);
      setSelectedItemData({ ...ele, index: index, hasNext, hasPrev });
      // console.log('after setSelectedItemData: ', selectedItemData, index, hasPrev, hasNext);
    } else if (arrLen === 0 && slideValue) {
      setSlideValue(false);
    }
  }

  const processAndSetEmailContents = (props) => {
    console.log('inside processAndSetEmailContents')
    const { index, ele } = props;
    const arrLen = allMailData[emailCategory].length;
    let hasNext = false;
    let hasPrev = false;
    if (allMailData[emailCategory] !== undefined && arrLen > 0) {
      hasNext = index + 1 < arrLen;
      hasPrev = index - 1 >= 0;
    }

    if (showOptions) {
      setCheckObject({}); 
      setShowOptions(false);
    }
    setSelectedItemData({ ...ele, index: index, hasNext, hasPrev });
    setSlideValue(true);
  }

  const processMailCategoryTag = (tag) => {
    console.log('inside processMailCateTag: ', tag);
      setEMailCategory(tag);
      if(slideValue){
        setSlideValue(false);
      }
      getCategoryEmails(tag, currentPage).then(res => {
        console.log('inside res of getCatEmails: ', res);
      }).catch(error => console.log('error: ', error));
  }

  const onPressPrevButton = () => {
    const prevPage = currentPage - 1;
    if(prevPage > 0){
      setCurrentPage(prevPage);
      processMailCategoryTag(emailCategory);
    }
  }

  const onPressNextButton = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    processMailCategoryTag(emailCategory);
  }

  if(allMailData !== null){
    console.log('before render in emails: ', allMailData[emailCategory].length);
  }else{
    console.log('before render in emails: allMailData is null');
  }

  const condition = allMailData !== null && allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0;

  return (
      <Item 
        variant={type === 'outlined' ? type : 'elevation'}
        sx={{ width: '95%', position: 'relative', overflow: 'hidden', height: '100%'}} 
        elevation={3}
        title="title-email-cont"
      >
        {isLoading ? (
          <LinearProgress
            style={{ position: 'absolute', top: 0, left: 0,  width: '100%' }}
            color="success" />
        ) : null}

        {showCompose ? (
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
          anchor={'bottom'}
          open={showCompose}
          onClose={() => setShowCompose(false)}
          variant='persistent'
          hideBackdrop={false}
          PaperProps={{
            sx: { width: '100%', height: '100%', position: "absolute", bottom: 0, right: 0, backgroundColor: 'transparent' },
          }}
          style={{ zIndex: 100 }}
        >
          <ComposeMailContainer onClickClose={() => setShowCompose(false)} />
        </Drawer>

        <Stack 
          direction="row" 
          alignItems='center' 
          sx={{ height: '100%' }}
        >
          <Item sx={{ width: '23%', height: '100%', alignItems: 'center' }}>
            <EmailBlockLeftContents
              emailCategory={emailCategory}
              onPressCompose={() => setShowCompose(true)} 
              setMailCategoryTag={(tag) => { 
                setCurrentPage(1);
                processMailCategoryTag(tag);
              }}
            />
          </Item>
          <div style={{ width: '77%', height: '100%', position: 'relative' }}>
            {slideValue ? (
              <DisplayEmailContents
                data={selectedItemData}
                emailCategory={emailCategory}
                getNextAndPrevMessageContents={(index) => getNextAndPrevMessageContents(index, true)}
                disableContents={() => setSlideValue(false)} 
                processMailData={processMailData}
                setRefresh={(val) => setRefresh(val)}
              />
            ) : null}

            <div style={{ height: 45}}>
              <Stack 
                direction="row" 
                justifyContent='space-between' 
                alignItems="center"
                sx={{ padding: 0.5, paddingLeft: 2, paddingRight: 2 }}
              >
                <div style={{ width: '100%' }}>
                  <InputBase
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search mail"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    }
                  />
                </div>
                <div></div>
              </Stack>
            </div>
            <Divider />
            <OperationsMenu 
              showOptions={showOptions}
              checkObject={checkObject}
              processMailData={processMailData}
              onClickDeleteButton={onClickDeleteButton}
              setRefresh={(val) => setRefresh(val)}
            />

            <Divider />
            <UserScrollContainer style={{ zIndex: 100 }}>
              {condition ? (
                <MailRightContents
                  parentData={allMailData[emailCategory]}
                  emailCategory={emailCategory}
                  showOptions={showOptions}
                  refresh={refresh}
                  checkObjectParent={checkObject}
                  showEmailContents={processAndSetEmailContents}
                  refreshFinished={() => setRefresh(false)}
                  setShowOptions={(value, checkObject) => {
                    setCheckObject(checkObject);
                    setShowOptions(value);
                  }}
                  resetCheckObject={() => setCheckObject({})}
                />
              ) : null}

              {/* {condition ? (
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 15, 
                  right: 0, 
                  width: '98%', 
                  padding: 2, 
                  backgroundColor: 'white',
                  paddingRight: 20,
                }}>
                  <Paginator
                    currentPage={currentPage}
                    totalItems={emailCategory[emailCategory.length]}
                    onPressPrevButton={onPressPrevButton}
                    onPressNextButton={onPressNextButton}
                   />
                </div>
              ) : null } */}
            </UserScrollContainer>

          </div>
        </Stack>
      </Item>
  );
}