/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// inbox, sent, starred etc are categories, every object's email in the category should be unique,
// because of deletion condition

import React, { useState, useEffect, useMemo } from 'react';
import openSocket from 'socket.io-client';
import { useNavigate, useLocation } from 'react-router-dom';
import { getData, postData } from '../utils/fetchCall';
import AlertMessage from '../components/alert';

export const useEmailDataAndManipulators = () => {
  const dataObject = {
    email: '', inbox: [], sent: [], draft: [], starred: [], spam: [], trash: [],
  };

  const [isLoading, setIsLoading] = useState(false);
  const [allMailData, setAllMailData] = useState(dataObject);
  const [emailContents, setEmailContents] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    console.log('inside navigateToLogin');
    try {
      console.log('in try block');
      navigate('/login', { replace: true, state: { path: location.pathname } });
    } catch (e) {
      console.log('error at navigate: ', e);
    }
  };

  const getCategoryEmails = async (cat) => {
    setIsLoading(true);
    try {
      const response = await getData(`/email/category/${cat}`, true);
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      }
      if (response.status !== 200) {
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }
      console.log('at assign: ', jsonData.messages.email, jsonData.messages.emails[cat].length);
      if (allMailData === null) {
        dataObject.email = jsonData.messages.email;
        dataObject[cat] = jsonData.messages.emails[cat];
        setAllMailData(dataObject);
      } else {
        const newDataObject = { ...allMailData };
        newDataObject.email = jsonData.messages.email;
        newDataObject[cat] = jsonData.messages.emails[cat];
        setAllMailData(dataObject);
      }
      // else {
      //   dataObject.email = jsonData.messages.email;
      //   allMailData[cat] = jsonData.messages.emails[cat];
      //   setAllMailData(allMailData);
      // }
      setTimeout(() => {
        setIsLoading(false);
        return Promise.resolve();
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later';
      return Promise.reject(errorMessage);
    }
  };

  // not necessary and not tested
  const getEmailContents = async (messageId) => {
    setIsLoading(true);
    try {
      const response = await getData(`/email/${messageId}`, true);
      const jsonData = await response.json();
      if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }
      setEmailContents(jsonData);
      setIsLoading(false);
      return Promise.resolve(jsonData);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = err.message ? err.message : 'Please try again later';
      return Promise.reject(errorMessage);
    }
  };

  const postNewMail = async (dataObject) => {
    setIsLoading(true);
    try {
      const response = await postData('/email/create', true, dataObject, 'POST');
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      }
      if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData);
        }
        throw new Error();
      }
      setTimeout(() => {
        setIsLoading(false);
        const allMailDataNew = { ...allMailData };
        if (allMailDataNew.sent === undefined) {
          allMailDataNew.sent = [];
        }
        allMailDataNew.sent.push(jsonData); // allMailDataNew.sent.push(jsonData);
        setAllMailData(allMailDataNew); // send message details from back-end and add the same in the array
        return Promise.resolve({ message: 'success' });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return Promise(errorMessage);
    }
  };

  const moveEmailTo = async (emailsToBeMovedArray, emailCategory, moveTo) => {
    setIsLoading(true);
    try {
      const response = await postData('/email/category/inbox', true, dataObject, 'PUT');
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData);
        }
        throw new Error();
      }
      if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
        const data = allMailData[emailCategory];
        let moveDataArray = [];
        let remDataFromCategory = [];
        for (let i = 0; i < emailsToBeMovedArray.length; i++) {
          const emailToRemove = emailsToBeMovedArray[i];
          moveDataArray = moveDataArray.concat(data.filter((ele) => ele._id === emailToRemove));
          remDataFromCategory = remDataFromCategory.concat(data.filter((ele) => ele._id !== emailToRemove));
        }
        const tempObject = { ...allMailData };
        tempObject[moveTo] = tempObject[moveTo].concat(moveDataArray);
        tempObject[emailCategory] = remDataFromCategory;
        setAllMailData(tempObject);
        setIsLoading(false);
        return Promise.resolve({
          message: 'success',
          allMailDataNew: tempObject,
        });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return new Promise(errorMessage);
    }
  };

  const deleteEmail = (emailsToBeRemovedArray, emailCategory) => {
    setIsLoading(true);
    try {
      if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
        const data = allMailData[emailCategory];
        let currentItemToDisplay = -1;
        for (let i = 0; i < emailsToBeRemovedArray.length; i++) {
          const emailToRemove = emailsToBeRemovedArray[i];
          for (let j = 0; j < data.length; j++) {
            if (data[j]._id === emailToRemove) {
              currentItemToDisplay = j;
              data.splice(j, 1);
            }
          }
        }
        const tempObject = { ...allMailData };
        tempObject[emailCategory] = data;
        setIsLoading(false);
        setAllMailData(tempObject);
        return Promise.resolve({
          message: 'success',
          currentItemToDisplay,
        });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return new Promise(errorMessage);
    }
  };

  const changeEmailTag = (emailsToBeMovedArray, emailCategory, moveTo) => {
    setIsLoading(true);
    try {
      if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
        const data = allMailData[emailCategory];
        const emailTagToBeChangedSet = new Set(emailsToBeMovedArray);
        data.forEach((ele) => {
          const existingTagSet = new Set(ele.mail.type); // change conditions
          if (emailTagToBeChangedSet.has(ele.email) && !existingTagSet.has(moveTo)) {
            ele.mail.type.push(moveTo.toLowerCase());
          }
        });
        const tempObject = { ...allMailData };
        tempObject[emailCategory] = data;
        setAllMailData(tempObject);
        setIsLoading(false);
        return Promise.resolve({ message: 'success' });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return new Promise(errorMessage);
    }
  };

  return {
    isLoading,
    emailContents,
    allMailData,
    getCategoryEmails,
    getEmailContents,
    postNewMail,
    moveEmailTo,
    deleteEmail,
    changeEmailTag,
  };
};

const EmailDataContext = React.createContext();

export function EmailContextProvider({ children }) {
  // const emailContextFields = useEmailDataAndManipulators();
  const dataObject = {
    email: '', totalItems: 0, inbox: [], sent: [], draft: [], starred: [], spam: [], trash: [],
  };

  const [isLoading, setIsLoading] = useState(false);
  const [allMailData, setAllMailData] = useState(dataObject);
  const [emailContents, setEmailContents] = useState(null);
  const [initiated, setInitiated] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (allMailData !== null) {
      console.log('useEffect of EmailContPro: ', allMailData.inbox.length, allMailData.sent.length);
    }
    if (!initiated && !isLoading) {
      setInitiated(true);
      getCategoryEmails('inbox').then((res) => {
        console.log('success: ', res);
      }).catch((error) => console.log('error: ', error));
    }
    setAllMailData(allMailData);
  }, [initiated, isLoading, allMailData]);

  useEffect(() => {
    const socket = openSocket('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
    socket.on('email', (data) => {
      console.log('inside socket: ', data);
      if (data.action === 'sent') {
        // updateInboxEmails(data.newEmail);
        getCategoryEmailsForSocket('inbox', 1).then((res) => {
          console.log('success: ');
        }).catch((err) => {
          console.log('error in: ', err);
        });
      }
    });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    try {
      navigate('/login', { replace: true, state: { path: location.pathname } });
    } catch (e) {
      console.log('error at navigate: ', e);
    }
  };

  const jwtExpired = () => {
    try {
      localStorage.removeItem('token');
      return navigateToLogin();
    } catch (error) {
      console.log('error at jwtExpired: ', error);
      return navigateToLogin();
    }
  };

  const updateInboxEmails = (newReceivedEmail) => {
    console.log('inside updateInboxEmails: ', newReceivedEmail);
    const newObject = { ...allMailData };
    newObject.inbox = [newReceivedEmail, ...newObject.inbox];
    setAllMailData(newObject);
  };

  const getCategoryEmails = async (cat, pageNumber) => {
    setIsLoading(true);
    try {
      const response = await getData(`/email/category/${cat}?page=${pageNumber}`, true);
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (response.status === 500 && jsonData.message !== undefined && jsonData.message === 'jwt expired') {
        jwtExpired();
      } else if (response.status !== 200) {
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }
      // console.log('at assign: ', jsonData.messages.email, jsonData.messages.emails[cat].length);
      const newDataObject = { ...allMailData };
      newDataObject.email = jsonData.messages.email;
      newDataObject[cat] = jsonData.messages.emails[cat];
      newDataObject.totalItems = jsonData.totalItems;
      setAllMailData(newDataObject);
      setTimeout(() => {
        setIsLoading(false);
        return Promise.resolve('success');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later';
      return Promise.reject(errorMessage);
    }
  };

  const getCategoryEmailsForSocket = async (cat, pageNumber = 1) => {
    try {
      const response = await getData(`/email/category/${cat}?page=${pageNumber}`, true);
      const jsonData = await response.json();
      if (response.status === 200) {
        const newDataObject = { ...allMailData };
        newDataObject.email = jsonData.messages.email;
        newDataObject[cat] = jsonData.messages.emails[cat];
        newDataObject.totalItems = jsonData.totalItems;
        setAllMailData(newDataObject);
        return Promise.resolve('success');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // not necessary and not tested
  const getEmailContents = async (messageId) => {
    setIsLoading(true);
    try {
      const response = await getData(`/email/${messageId}`, true);
      const jsonData = await response.json();
      if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }
      setEmailContents(jsonData);
      setIsLoading(false);
      return Promise.resolve(jsonData);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = err.message ? err.message : 'Please try again later';
      return Promise.reject(errorMessage);
    }
  };

  const postNewMail = async (dataObject) => {
    setIsLoading(true);
    try {
      const response = await postData('/email/create', true, dataObject, 'POST');
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (response.status === 500 && jsonData.message !== undefined && jsonData.message === 'jwt expired') {
        jwtExpired();
      } else if (response.status === 422) {
        const error = new Error(jsonData.message ? jsonData.message : 'Cannot send message to itself');
        error.statusCode = 422;
        throw error;
      } else if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData);
        }
        throw new Error();
      }
      setTimeout(() => {
        setIsLoading(false);
        return Promise.resolve({ message: 'success' });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      if (error.statusCode === 422) {
        setErrorMessage(error.message);
        setOpen(true);
        return Promise.reject();
      }
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return Promise.reject(errorMessage);
    }
  };

  const moveEmailTo = async (emailsToBeMovedArray, emailCategory, moveTo) => {
    setIsLoading(true);
    try {
      let endPoint = '/email/changecat/multi';
      let dataObject = {
        messageIdArray: emailsToBeMovedArray,
        fromCategory: emailCategory,
        toCategory: moveTo,
      };
      if (emailsToBeMovedArray.length === 1) {
        endPoint = '/email/changecat/single';
        dataObject = {
          messageId: emailsToBeMovedArray[0],
          fromCategory: emailCategory,
          toCategory: moveTo,
        };
      }
      const response = await postData(endPoint, true, dataObject, 'PUT');
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (response.status === 500 && jsonData.message !== undefined && jsonData.message === 'jwt expired') {
        jwtExpired();
      } else if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData);
        }
        throw new Error();
      }
      if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
        const data = allMailData[emailCategory];
        let moveDataArray = [];
        const remDataFromCategory = [];
        const emailsToBeMovedArraySet = new Set(emailsToBeMovedArray);
        for (let i = 0; i < emailsToBeMovedArray.length; i++) {
          const emailToRemove = emailsToBeMovedArray[i];
          moveDataArray = moveDataArray.concat(data.filter((ele) => ele._id.toString() === emailToRemove.toString()));
        }
        data.forEach((ele) => {
          if (!emailsToBeMovedArraySet.has(ele._id) || !emailsToBeMovedArraySet.has(ele._id.toString())) {
            remDataFromCategory.push(ele);
          }
        });

        const tempObject = { ...allMailData };
        tempObject[moveTo] = tempObject[moveTo].concat(moveDataArray);
        tempObject[emailCategory] = remDataFromCategory;
        setAllMailData(tempObject);
        // setIsLoading(false);
        setTimeout(() => {
          setIsLoading(false);
          console.log('before returning promise: ', allMailData[emailCategory.length]);
          return Promise.resolve({ message: 'success' });
        }, 1500);
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return Promise.reject(errorMessage);
    }
  };

  const deleteEmail = async (emailsToBeRemovedArray, emailCategory) => {
    setIsLoading(true);
    try {
      let endPoint = '/email/delete/multi';
      let dataObject = {
        messageArray: emailsToBeRemovedArray,
        fromCategory: emailCategory,
      };
      if (emailsToBeRemovedArray.length === 1) {
        endPoint = '/email/delete/one';
        dataObject = {
          messageId: emailsToBeRemovedArray[0],
          category: emailCategory,
        };
      }
      const response = await postData(endPoint, true, dataObject, 'DELETE');
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (response.status === 500 && jsonData.message !== undefined && jsonData.message === 'jwt expired') {
        jwtExpired();
      } else if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData);
        }
        throw new Error();
      }

      if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
        const data = allMailData[emailCategory];
        let currentItemToDisplay = -1;
        for (let i = 0; i < emailsToBeRemovedArray.length; i++) {
          const emailToRemove = emailsToBeRemovedArray[i];
          for (let j = 0; j < data.length; j++) {
            if (data[j]._id === emailToRemove) {
              currentItemToDisplay = j;
              data.splice(j, 1);
            }
          }
        }
        const tempObject = { ...allMailData };
        tempObject[emailCategory] = data;
        setIsLoading(false);
        setAllMailData(tempObject);
        return Promise.resolve({
          message: 'success',
          currentItemToDisplay,
        });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return Promise.reject(errorMessage);
    }
  };

  const changeEmailTag = async (emailsToBeMovedArray, emailCategory, moveTo) => {
    setIsLoading(true);
    try {
      if (emailsToBeMovedArray.length > 1) {
        const errorMessage = 'Adding tag to multiple objects is currently not supported';
        setErrorMessage(errorMessage);
        setOpen(true);
        const error = new Error(errorMessage);
        throw error;
      }

      const dataObject = {
        messageId: emailsToBeMovedArray[0],
        newSubCategory: moveTo,
        emailCategory,
      };
      const response = await postData('/email/addsubcat/single', true, dataObject, 'PUT');
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (response.status === 500 && jsonData.message !== undefined && jsonData.message === 'jwt expired') {
        jwtExpired();
      } else if (response.status !== 200) {
        setIsLoading(false);
        if (jsonData.message) {
          throw new Error(jsonData);
        }
        throw new Error();
      }

      if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
        const data = allMailData[emailCategory];
        const { email } = allMailData;
        const emailTagToBeChangedSet = new Set(emailsToBeMovedArray);
        data.forEach((ele) => {
          const subCatList = email === ele.from ? ele.creatorSubCat : ele.receiverSubCat;
          const existingTagSet = new Set(subCatList);
          if (emailTagToBeChangedSet.has(ele._id) && !existingTagSet.has(moveTo)) {
            if (email === ele.from) {
              ele.creatorSubCat.push(moveTo.toLowerCase());
            } else {
              ele.receiverSubCat.push(moveTo.toLowerCase());
            }
          }
        });
        const tempObject = { ...allMailData };
        tempObject[emailCategory] = data;
        setAllMailData(tempObject);
        setIsLoading(false);
        return Promise.resolve({ message: 'success' });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try again later!';
      return Promise.reject(errorMessage);
    }
  };

  const emailContextFields = useMemo(() => ({
    isLoading,
    emailContents,
    allMailData,
    getCategoryEmails,
    getEmailContents,
    postNewMail,
    moveEmailTo,
    deleteEmail,
    changeEmailTag,
  }), [isLoading, allMailData]);

  return (
    <EmailDataContext.Provider value={emailContextFields}>
      <AlertMessage open={open} errorMessage={errorMessage} setOpen={setOpen} />
      {children}
    </EmailDataContext.Provider>
  );
}

// export default () => React.useContext(EmailDataContext);

export const useEmailContext = () => React.useContext(EmailDataContext);
