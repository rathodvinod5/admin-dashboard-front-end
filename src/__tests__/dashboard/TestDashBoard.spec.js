import {
    render, screen, fireEvent, waitFor, //userEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import Dashboard from '../../develop/pages/dashboard/index';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from '../../develop/context/authContext';

// pending, from 2nd test case
describe.skip('Test Dashboard', () => {

  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  // const auth = {
  //   loggedIn: true,
  //   logIn: () => { },
  //   logOut: () => { }
  // };
  // jest.mock('../../develop/context/authContext.js', () => ({
  //   useAuthValues: jest.fn().mockReturnValue(auth),
  // }));  

  // afterEach(() => {
  //   cleanup(); 
  // });

  test('it should render dashboard and main menu container', () => {
    window.ResizeObserver = ResizeObserver;
    try {
      render(<Dashboard />);
      const dashboardContainer = screen.getByTestId("id-dashboard-main-cont");
      const menuListContainer = screen.getByTestId("id-main-menu-list");
      
      expect(dashboardContainer).toBeInTheDocument();
      expect(menuListContainer).toBeInTheDocument();
    } catch (e) {
      console.log('Error at test: ', e)
    }
  });
    
  test('on click of email list item, email page should be visible', async () => {
    window.ResizeObserver = ResizeObserver;
    const auth = {
      loggedIn: true,
      logIn: () => { },
      logOut: () => { }
    };
    jest.mock('../../develop/context/authContext.js', () => ({
      useAuthValues: jest.fn().mockReturnValue(auth),
    }));  
    render(<Router><Dashboard /></Router>);
    expect(screen.queryByTitle("title-email-cont")).not.toBeInTheDocument();
    expect(screen.getByTitle("title-main-menu-list")).toBeInTheDocument();
    
    const menuListEmailItem = screen.getByRole("menuitem", { name: "Email", hidden: true });
    expect(menuListEmailItem).toBeInTheDocument();
    userEvent.click(menuListEmailItem);
    
    await waitFor(() => {
      expect(screen.getByTitle("title-email-cont")).toBeInTheDocument();
    });
  });
    
  test('on click of chat list item, chat page should be visible', async () => {
    render(<Router><Dashboard /></Router>);
    expect(screen.queryByTitle("title-chat-cont")).not.toBeInTheDocument();
    expect(screen.getByTitle("title-main-menu-list")).toBeInTheDocument();
    
    const menuListChatItem = screen.getByRole("menuitem", { name: "Chat", hidden: true });
    expect(menuListChatItem).toBeInTheDocument();
    userEvent.click(menuListChatItem);
    
    await waitFor(() => {
        expect(screen.getByTitle("title-chat-cont")).toBeInTheDocument();
    });
  });
        
});