import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from './develop/pages/login/index';
import SignUp from './develop/pages/signup/index';
import DashBoard from "./develop/pages/dashboard/index";
import './App.css';
import './index.css';
import { useAuthValues } from './develop/context/authContext';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { isLoggedIn, checkIsTokenStored } = useAuthValues();

  React.useEffect(() => { 
    console.log('inside useEffect of App.js')
    checkIsTokenStored().then(result => { 
      console.log("RES: ", result)
      setIsLoading(false);
    }).catch(error => {
      console.log("RES: ", error)
      setIsLoading(false);
    });
  }, [isLoading]);

  return !isLoading ? (
    <div>
      {/* <AuthProvider> */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/*" element={<DashBoard />}>
            </Route>
          </Routes>
        </Router>
        <Outlet />
      {/* </AuthProvider> */}
    </div>
  ) : null;
}

export default App;
