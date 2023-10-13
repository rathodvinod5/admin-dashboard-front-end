import {
    render, screen, fireEvent, waitFor, within //userEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { EmailBlockLeftContents } from '../../develop/pages/email/utitilities';
import EmailDataContext, { dataObject } from "../../develop/context/emailContext";

const customRender = (ui, {providerProps, ...renderOptions}) => { 
  return render(
    <EmailDataContext.Provider value={{ dataObject }}>{ui}</EmailDataContext.Provider>,
    renderOptions,
  )
}

// all test cases were succesfull
describe.skip('Email block menu container', () => {

  test('it(container) should render', () => {
    customRender(
      <Router>
        <EmailBlockLeftContents emailCategory={'inbox'} onPressCompose={() => {}} setMailCategoryTag={(tag) => {}} />
      </Router>, 
      dataObject
    );
    const container = screen.getByTitle('compose-mail-cont');
    expect(container).toBeInTheDocument();
  });

  test('it should have compose button', () => {
    customRender(
      <Router>
        <EmailBlockLeftContents emailCategory={'inbox'} onPressCompose={() => {}} setMailCategoryTag={(tag) => {}} />
      </Router>, 
      dataObject
    );
    const composeButton = screen.getByRole('button', { name: /compose/i });
    expect(composeButton).toBeInTheDocument();
  })
    
  test('it should have category menu and its length should be 6', async () => { 
    customRender(
      <Router>
        <EmailBlockLeftContents emailCategory={'inbox'} onPressCompose={() => {}} setMailCategoryTag={(tag) => {}} />
      </Router>, 
      dataObject
    );
    const categoryMenu = screen.getByTitle('category-menu');
    expect(categoryMenu).toBeInTheDocument();
    const { getAllByRole } = within(categoryMenu);
    const listItems = getAllByRole('button');
    expect(listItems.length).toBe(6);
    // expect(itemNames.sort()).toEqual(['Inbox', 'Sent', 'Draft', 'Starred', 'Spam', 'Trash'].sort());
  });  
});