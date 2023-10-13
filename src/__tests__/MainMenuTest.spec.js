import {
    render, screen, fireEvent, waitFor, within //userEvent
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import MainMenu from '../develop/pages/dashboard/mainMenu';

// all test cases were succesfull
describe.skip('Test main menu', () => {

  test('it should be visible/rendered', () => {
    render(<Router><MainMenu /></Router>);
    // render(<AuthProvider><Router><MainMenu /></Router></AuthProvider>);
    const mainMenu = screen.getByRole('menu');
    expect(mainMenu).toBeInTheDocument();
  });
  
  test("it's length should be greater then zero", () => {
    render(<Router><MainMenu /></Router>);
    const mainMenu = screen.getByRole('menu');
    const { getAllByRole } = within(mainMenu); 
    const items = getAllByRole('menuitem');
    expect(items.length).toBeGreaterThan(0);
  });
    
  test("list item Email and Chat should be present", () => {
    render(<Router><MainMenu /></Router>);
    const listItemEmail = screen.getByRole('menuitem', { name: 'Email' });
    const listItemChat = screen.getByRole('menuitem', { name: 'Chat' });
    expect(listItemEmail).toBeInTheDocument();
    expect(listItemChat).toBeInTheDocument();
  });
    
//   test("on click menu item email, it should be active", async () => {
//     render(<Router><MainMenu /></Router>);
//     const listItemEmail = screen.getByRole('menuitem', { name: 'Email' });
//     expect(listItemEmail).not.toHaveClass('Mui-active');
    
//     userEvent.click(listItemEmail);
//     await waitFor(() => {
//       expect(listItemEmail).toHaveClass('Mui-active');
//     });
//   });
});