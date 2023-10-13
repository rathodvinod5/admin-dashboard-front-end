import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import openSocket from 'socket.io-client';
import { getData, postData } from "../utils/fetchCall";
import { useAuthValues } from "./authContext";

const ChatMessageContext = createContext();

export const ChatMessageContextProvider = ({ children }) => {
  const [initiated, setInitiated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItemObject, setCurrentItemObject] = useState({ isGroupChat: false, index: -1, groupId: -1 });
  const [contactList, setContactList] = useState({ contacts: [], groups: [] });
  const [chatMessagesHistory, setChatMessageHistory] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAuthValues();

  useEffect(() => {
    if (!initiated && !isLoading) {
      setInitiated(true);
      setIsLoading(true);
      getContactList()
        .then((res) => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("error: ", error);
        });
    }
  }, [initiated, isLoading, contactList, JSON.stringify(chatMessagesHistory)]);

  useEffect(() => {
    const socket = openSocket('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
    socket.on('chat', (data) => {
      console.log('inside socket: ', currentItemObject, data);
      if (data.action === 'sent' && token.userId === data.toUserId && data.newChatMessage !== undefined) {
        setChatMessageHistory([{ ...data.newChatMessage }, ...chatMessagesHistory]);
      } else if (data.action === 'newGroup') {
        getContactList().then(() => { }).catch(error => { });
      } else if (data.action === 'groupChat' && currentItemObject.groupId === data.conversationId) {
        console.log('inside last if: ')
        getChatMessageHistory({ isGroupChat: true, groupId: data.conversationId }).then(result => { }).catch(error => console.log('Error: ', error));
      }
    });

    return () => {
      socket.off('chat');
    };
  });

  const navigateToLogin = () => {
    try {
      navigate("/login", { replace: true, state: { path: location.pathname } });
    } catch (error) {
      console.log("error at navigateToLogin: ", error);
    }
  };

  const jwtExpired = () => {
    try {
      localStorage.removeItem("token");
      return navigateToLogin();
    } catch (error) {
      console.log("error at jwtExpired: ", error);
      return navigateToLogin();
    }
  };

  const getContactList = async () => {
    setIsLoading(true);
    try {
      const response = await getData("/chat/get/all/contacts", true);
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (
        response.status === 500 &&
        jsonData.message !== undefined &&
        jsonData.message === "jwt expired"
      ) {
        jwtExpired();
      } else if (response.status !== 200) {
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }

      setTimeout(() => {
        const dataObject = {
          contacts: jsonData.data.contacts ? jsonData.data.contacts : [],
          groups: jsonData.data.groups ? jsonData.data.groups : [],
        };
        setContactList(dataObject);
        setIsLoading(false);
        return Promise.resolve("success");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : "Please try later";
      return Promise.reject(errorMessage);
    }
  };

  const getChatMessageHistory = async ({ isGroupChat, index, groupId }) => {
    console.log('inside getChatMessageHistory: ', isGroupChat, index, groupId)
    if (index === undefined) {
      setChatMessageHistory([]);
    }
    setIsLoading(true);
    try {
      const { groups, contacts } = contactList;
      let queryParam;
      if (index === undefined) {
        queryParam = "?groupId=" + groupId;
        setCurrentItemObject({
          isGroupChat: true,
          index: -1,
          groupId: groupId,
        });
      } else {
        queryParam = isGroupChat ? "?groupId=" + groups[index]._id : "?emailId=" + contacts[index].email;
        setCurrentItemObject({
          isGroupChat: false,
          index: !isGroupChat ? index : -1,
          groupId: isGroupChat ? groups[index]._id : -1,
        });
      }
      console.log("query param: ", queryParam);
      const response = await getData("/chat/get/messages" + queryParam, true);
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (
        response.status === 500 &&
        jsonData.message !== undefined &&
        jsonData.message === "jwt expired"
      ) {
        jwtExpired();
      } else if (response.status !== 200) {
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }

      setTimeout(() => {
        setChatMessageHistory(jsonData.data);
        setIsLoading(false);
        return Promise.resolve({ message: "success" });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : "Please try later!";
      return Promise.reject(errorMessage);
    }
  };

  const postChatMessage = async (inputObject) => {
    setIsLoading(true);
    try {
      const url = inputObject.isGroup
        ? "/chat/group/send/message"
        : "/chat/send/message";
      const response = await postData(url, true, inputObject);
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (
        response.status === 500 &&
        jsonData.message !== undefined &&
        jsonData.message === "jwt expired"
      ) {
        jwtExpired();
      } else if (response.status !== 200) {
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }
      console.log('in setTimeout: ', jsonData.data);
      const newChatMessageArray = [{ ...jsonData.data }].concat(chatMessagesHistory);
      setChatMessageHistory([...newChatMessageArray]);
      setIsLoading(false);
      return Promise.resolve("success");
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message ? error.message : "Please try later!";
      return Promise.reject(errorMessage);
    }
  };

  const createNewGroup = async (inputObject) => {
    setIsLoading(true);
    try {
      const response = await postData('/chat/group/create', true, inputObject);
      const jsonData = await response.json();
      if (response.status === 401) {
        navigateToLogin();
      } else if (
        response.status === 500 &&
        jsonData.message !== undefined &&
        jsonData.message === "jwt expired"
      ) {
        jwtExpired();
      } else if (response.status !== 200) {
        if (jsonData.message) {
          throw new Error(jsonData.message);
        }
        throw new Error();
      }

      console.log('group info: ', jsonData);
      if (jsonData.message === 'success' && jsonData.data) {
        setTimeout(() => {
          setContactList({
            contacts: contactList.contacts,
            groups: [...contactList.groups, { ...jsonData.data }]
          });
          setIsLoading(false);
          return Promise.resolve('success');
        }, 1500);
      } else {
        throw new Error('Something went wrong');
      }

    } catch (error) {
      console.log('error at createNewGroup: ', error);
      setIsLoading(false);
      const errorMessage = error.message ? error.message : 'Please try later';
      return Promise.reject(errorMessage);
    }
  }

  const chatContext = useMemo(
    () => ({
      isLoading: isLoading,
      contactList: contactList,
      chatMessagesHistory: chatMessagesHistory,
      getContactList: getContactList,
      getChatMessageHistory: getChatMessageHistory,
      postChatMessage: postChatMessage,
      createNewGroup: createNewGroup,
    }),
    [isLoading, contactList, JSON.stringify(chatMessagesHistory)]
  );

  return (
    <ChatMessageContext.Provider value={chatContext}>
      {children}
    </ChatMessageContext.Provider>
  );
};

export const useChatMessageContext = () => useContext(ChatMessageContext);

// const data = {
//   createdAt: "2022-12-10T05:59:09.184Z"
//   groupAdmins: ["637e02f650240ccebaa47c76"]
//   groupName: "Rebels"
//   isGroupChat: true
//   updatedAt: "2022-12-10T05:59:09.184Z"
//   users: ["637e035350240ccebaa47c7b", "638ae7512d7942a51af18c81"]
//   __v: 0
//   _id: "6394202dde361f8df7beb95f"
// }
