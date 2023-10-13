import {
    render, screen, fireEvent, waitFor, within //userEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import ComposeMailContainer from "../../../develop/pages/email/composeMailContainer";
import EmailDataContext, { dataObject } from "../../../develop/context/emailContext";

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <EmailDataContext.Provider value={{ dataObject }}>{ui}</EmailDataContext.Provider>,
    renderOptions,
  )
}

// all test cases were succesfull
describe.skip('Compose Mail Container', () => {

  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }
  
  test('it should be visible', () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    const titleText = screen.getByText('Compose Mail');
    expect(titleText).toBeInTheDocument();
  });

  test('minimize, close, send and delete icons should be visible', () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    const minimizeIcon = screen.getByRole('button', { name: 'minimize' });
    expect(minimizeIcon).toBeInTheDocument();

    const closeIcon = screen.getByRole('button', { name: 'close' });
    expect(closeIcon).toBeInTheDocument();

    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: 'delete' });
    expect(deleteButton).toBeInTheDocument();
  });

  test('initial height should be 400px', () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    const container = screen.getByTitle('title-compose-mail-cont');
    const styles = window.getComputedStyle(container);
    expect(styles.height).toBe('400px');
  });

  test('container height should be 50px when pressed on minimize button', async () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    const minimizeIcon = screen.getByTitle('title-minimize-icon');
    expect(minimizeIcon).toBeInTheDocument();
    userEvent.click(minimizeIcon);

    await waitFor(() => {
      const container = screen.getByTitle('title-compose-mail-cont');
      const styles = window.getComputedStyle(container);
      expect(styles.height).toBe('50px');
    });
  });

  test('on click expand less button, expand-less-more menu should appear and should have 2 list items', async () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    expect(screen.queryByTitle('send-button-menu')).not.toBeInTheDocument();
    const expandLessButton = screen.getByRole('button', { name: 'expand-less-button' });
    expect(expandLessButton).toBeInTheDocument();
    userEvent.click(expandLessButton);

    await waitFor(() => {
      const expandLessMenu = screen.getByTitle('send-button-menu')
      expect(expandLessMenu).toBeInTheDocument();
     
      //expect(screen.getByTestId('id-send-button-menu')).toBeInTheDocument();
      // expect(screen.getAllByRole('menulist', { name: 'Schedule Send' })).toBeInTheDocument();
    });

    await waitFor(() => {
      const expandLessMenu = screen.getByTitle('send-button-menu')
      const { getAllByRole } = within(expandLessMenu);
      const listItems = getAllByRole('menuitem');
      expect(listItems.length).toBe(2);
    });
  });

  test('on click more vertical icon button, gen-tasks-menu menu should appear and should have 3 list items', async () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    expect(screen.queryByTitle('gen-tasks-menu')).not.toBeInTheDocument();
    const vertMoreIconButton = screen.getByRole('button', { name: 'more-vert' });
    expect(vertMoreIconButton).toBeInTheDocument();
    userEvent.click(vertMoreIconButton);

    await waitFor(() => {
      const vertMoreMenu = screen.getByTitle('gen-tasks-menu')
      expect(vertMoreMenu).toBeInTheDocument();
    });

    await waitFor(() => {
      const vertMoreMenu = screen.getByTitle('gen-tasks-menu')
      const { getAllByRole } = within(vertMoreMenu);
      const listItems = getAllByRole('menuitem');
      expect(listItems.length).toBe(3);
    });
  });

  test('send button should be disabled if toAddress is empty and enabled if it is not empty', async () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    const toAddressInput = screen.queryByLabelText('Enter to address');
    const sendButton = screen.getByText('Send');

    expect(toAddressInput.value).toBe('');
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeDisabled(); //expect(readyToEsignButton).toHaveProperty('disabled', true);

    fireEvent.change(toAddressInput, {
      target: { value: 'abc@xyz.co.in' },
    });

    await waitFor(() => {
      expect(toAddressInput.value).toBe('abc@xyz.co.in');
    });
    expect(sendButton).not.toBeDisabled();
  });

  test('subject and message text input should work', async () => {
    window.ResizeObserver = ResizeObserver;
    customRender(<Router><ComposeMailContainer onClickClose={() => { }} /></Router>, dataObject);
    const subjectInput = screen.getByLabelText('Enter subject');
    const messageInput = screen.getByPlaceholderText('Message');

    expect(subjectInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

    fireEvent.change(subjectInput, {
      target: { value: 'Urgent requirement' }
    });
    fireEvent.change(messageInput, {
      target: { value: 'This is message' }
    })

    await waitFor(() => {
      expect(subjectInput.value).toBe('Urgent requirement');
    });
    await waitFor(() => {
      expect(messageInput.value).toBe('This is message');
    });
  });

  test('check for send button works successfully', () => {
    
  });
});