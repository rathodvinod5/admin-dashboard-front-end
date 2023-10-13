import React, { useEffect, useState, createContext, useMemo } from "react";
import DrawerWithContent from "./drawer/drawer";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider, styled } from "@mui/material/styles";
import { getLightTheme, getDarkTheme } from "../../theme/Theme";
// import useToken from "../../utils/useToken";
import MainMenu from "./mainMenu";
import { Routes, Route, Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Home from "../home/index";
import Email from "../email/index";
import Chat from "../chat/index";
import GlobalDataContext, { dataObject } from "../../context/dashboardContext";
import PrimarySearchAppBar from "./topAppBar/index";
import RequireAuth from "./requireAuth/authUtilities";
import { EmailContextProvider } from "../../context/emailContext";
import { ChatMessageContextProvider } from '../../context/chatContext';

import "./styles.css";

const DashBoard = () => {
  const [theme, setTheme] = useState("light");
  // const { token } = useToken();
  const [colorSelected, setColorSelected] = useState("green");
  const [showDrawer, toggleDrawer] = useState(false);
  const [bordered, toggleBordered] = useState(false);
  const [type, setType] = useState("default"); // default, bordered, semidark
  const [globalData, setGlobalData] = useState(dataObject);

  // const CustomBox = styled(Box)(({ theme }) => ({
  //   width: "260px",
  //   borderWidth: 0,
  // }));

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login", { replace: true });
  //   }
  // }, []);

  const ParentEmail = () => {
    return (
      <RequireAuth>
        <EmailContextProvider>
          <Email />
        </EmailContextProvider>
      </RequireAuth>
    );
  }

  const ParentChat = () => {
    return (
      <RequireAuth>
        <ChatMessageContextProvider>
          <Chat />
        </ChatMessageContextProvider>
      </RequireAuth>
    );
  }

  return (
    <GlobalDataContext.Provider value={{ globalData, setGlobalData }} id="id-dashboard-main-cont">
      <ThemeProvider
        theme={
          theme === "light"
            ? getLightTheme(colorSelected, type)
            : getDarkTheme(colorSelected, type)
        }
      >
        <CssBaseline />
        <div data-testid="id-dashboard-main-cont" className="main-container" style={{ position: "relative" }}>
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <DrawerWithContent
              toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
              toggleBordered={() => toggleBordered(!bordered)}
              setType={(type) => {
                setType(type);
              }}
              setColorSelected={(color) => {
                setColorSelected(color);
                globalData.ui.selectedColor = color;
                setGlobalData(globalData);
              }}
              showDrawer={showDrawer}
              onClose={() => toggleDrawer(false)}
            />
          </div>
          <div className="left-container">
            <MainMenu
              selectedColor={colorSelected}
              toggleDrawer={() => toggleDrawer(true)}
            />
          </div>
          <div className="content-container">
            <PrimarySearchAppBar />
            <br />
            <Routes>
              <Route exact path="/email" element={<ParentEmail />} type={type} />
              <Route exact path="/chat" element={<ParentChat />} type={type} />
              <Route index path="/*" element={<Home type={type} />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </GlobalDataContext.Provider>
  );
};

export default DashBoard;
