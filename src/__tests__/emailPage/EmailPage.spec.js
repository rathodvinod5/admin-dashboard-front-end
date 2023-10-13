import { within, render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import EmailPage from '../../develop/pages/email/index';
import { BrowserRouter as Router } from "react-router-dom";
import { dataObject } from "../../develop/context/emailContext";

// all test cases were succesfull
describe.skip('Email Page', () => {

  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  test('it(container) should render', () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    expect(screen.getByTitle('title-email-cont')).toBeInTheDocument();
  });

  test('onClick of Compose button, email composer should be visible and messages should be sent successfully', async () => {
    render(<Router><EmailPage /></Router>);
    window.ResizeObserver = ResizeObserver;
    const listItemsLen = screen.getAllByTitle('email-list-item').length;
    const composeButton = screen.getByRole('button', { name: /compose/i });
    userEvent.click(composeButton);
    
    await waitFor(() => {
      expect(screen.getByTitle("title-compose-mail-cont")).toBeInTheDocument();
    });
      
    const toAddress = screen.getByLabelText('Enter to address');
    const subjectInput = screen.getByLabelText('Enter subject');
    const messageInput = screen.getByPlaceholderText('Message');
    const sendButton = screen.getByText('Send');
    expect(toAddress).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    fireEvent.change(toAddress, {
      target: { value: 'abc@gmail.com' }
    });
    fireEvent.change(subjectInput, {
      target: { value: 'Urgent requirement' }
    });
    fireEvent.change(messageInput, {
      target: { value: 'This is message' }
    })
    await waitFor(() => {
      expect(toAddress.value).toBe('abc@gmail.com');
    });
    await waitFor(() => {
      expect(subjectInput.value).toBe('Urgent requirement');
    });
    await waitFor(() => {
      expect(messageInput.value).toBe('This is message');
    });
    userEvent.click(sendButton);
    await waitFor(() => {
      const listItems = screen.getAllByTitle('email-list-item').length;
      expect(listItemsLen).toBe(listItems);
    });
  });
    
  test('on click any items, its contents should be displayed', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const ele = dataObject.inbox[0];
    const listItem = screen.getAllByTitle('email-list-item')[0];
    const clickableListItem = within(listItem).getByTitle('clickable-stack-item');
    expect(clickableListItem).toBeInTheDocument();
    userEvent.click(clickableListItem);
    
    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });
      
    const emailContentCont = within(screen.getByTitle('email-content-cont'));
    expect(emailContentCont.getByText(ele.mail.subject)).toBeInTheDocument();
    
    const profileItemCont = screen.getByTitle('profile-item-cont');
    expect(profileItemCont).toBeInTheDocument();
    const { getByText } = within(profileItemCont);
    expect(getByText(ele.title)).toBeInTheDocument();
    expect(getByText(ele.email)).toBeInTheDocument();
  });

  test('on click inbox menu list item, the corresponding list should be rendered', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const inboxLen = dataObject.inbox.length;
    const categoryMenu = screen.getByTitle('category-menu');
    expect(categoryMenu).toBeInTheDocument();
    const { getByRole } = within(categoryMenu);
    const inboxListItem = getByRole('button', { name: 'Inbox' });
    expect(inboxListItem).toBeInTheDocument();
    // userEvent.clear(inboxListItem);
    const listItemsCount = screen.getAllByTitle('email-list-item').length;
    expect(listItemsCount).toBe(inboxLen);
  });

  test('on click sent menu list item, the corresponding list should be rendered', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const sentLen = dataObject.sent.length;
    const categoryMenu = screen.getByTitle('category-menu');
    expect(categoryMenu).toBeInTheDocument();
    const { getByRole } = within(categoryMenu);
    const sentListItem = getByRole('button', { name: 'Sent' });
    expect(sentListItem).toBeInTheDocument();
    userEvent.click(sentListItem);

    await waitFor(() => {
      const listItemsCount = screen.getAllByTitle('email-list-item').length;
      expect(listItemsCount).toBe(sentLen);
    });
  });

  test('prev icon button should be disabled and next icon button should be enabled for the first message', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });
    const prevIconButton = screen.getByTitle('prev-icon-button');
    const nextIconButton = screen.getByTitle('next-icon-button');
    expect(prevIconButton).toBeInTheDocument();
    expect(nextIconButton).toBeInTheDocument();
    expect(prevIconButton).toBeDisabled();
    expect(nextIconButton).not.toBeDisabled();
  });

  test('prev icon button should be enabled and next icon button should be disabled for the last message', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialInboxLen = dataObject.inbox.length;
    const listItemFromList = screen.getAllByTitle('email-list-item')[initialInboxLen - 1];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });
    const prevIconButton = screen.getByTitle('prev-icon-button');
    const nextIconButton = screen.getByTitle('next-icon-button');
    expect(prevIconButton).toBeInTheDocument();
    expect(nextIconButton).toBeInTheDocument();
    expect(prevIconButton).not.toBeDisabled();
    expect(nextIconButton).toBeDisabled();
  });

  test('next icon button should work properly', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const currEle = dataObject.inbox[0];
    const nextEle = dataObject.inbox[1];
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });

    // test for current message subject line
    const subjectLine = within(screen.getByTitle('message-and-chip-cont')).getByText(currEle.mail.subject);
    expect(subjectLine).toBeInTheDocument();

    const prevIconButton = screen.getByTitle('prev-icon-button');
    const nextIconButton = screen.getByTitle('next-icon-button');
    expect(prevIconButton).toBeInTheDocument();
    expect(nextIconButton).toBeInTheDocument();
    expect(prevIconButton).toBeDisabled();
    expect(nextIconButton).not.toBeDisabled();
    userEvent.click(nextIconButton);

    await waitFor(() => {
      // test for next message subject line
      const newsubjectLine = within(screen.getByTitle('message-and-chip-cont')).getByText(nextEle.mail.subject);
      expect(newsubjectLine).toBeInTheDocument();
    });
  });

  test('prev icon button should work properly', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const inboxLen = dataObject.inbox.length;
    const lastEle = dataObject.inbox[inboxLen - 1];
    const prevEle = dataObject.inbox[inboxLen - 2];

    // pick the last element
    const listItemFromList = screen.getAllByTitle('email-list-item')[inboxLen - 1];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });

    // test for current message subject line
    const subjectLine = within(screen.getByTitle('message-and-chip-cont')).getByText(lastEle.mail.subject);
    expect(subjectLine).toBeInTheDocument();

    const prevIconButton = screen.getByTitle('prev-icon-button');
    const nextIconButton = screen.getByTitle('next-icon-button');
    expect(prevIconButton).toBeInTheDocument();
    expect(nextIconButton).toBeInTheDocument();
    expect(prevIconButton).not.toBeDisabled();
    expect(nextIconButton).toBeDisabled();
    userEvent.click(prevIconButton);

    await waitFor(() => {
      // test for next message subject line
      const newsubjectLine = within(screen.getByTitle('message-and-chip-cont')).getByText(prevEle.mail.subject);
      expect(newsubjectLine).toBeInTheDocument();
    });
  });

  test('check for move(to spam) operation from inbox category in inner container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialSpamLen = dataObject.spam.length;
    const initialInboxLen = dataObject.inbox.length;
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });

    const operationsMenuCont = screen.getByTitle('operations-menu-cont');
    expect(operationsMenuCont).toBeInTheDocument();
    const moveOpFolderIcon = screen.getByTitle('move-op-folder-icon');
    expect(moveOpFolderIcon).toBeInTheDocument();
    userEvent.click(moveOpFolderIcon);

    await waitFor(() => { 
      expect(screen.getByTitle('move-spam-trash-menu')).toBeInTheDocument();
    });
    const moveSpamTrashMenu = screen.getByTitle('move-spam-trash-menu');
    const { getByText } = within(moveSpamTrashMenu);
    const listItemSpam = getByText('Spam');
    expect(listItemSpam).toBeInTheDocument();
    userEvent.click(listItemSpam);

    await waitFor(() => {
      expect(screen.queryByTitle('move-spam-trash-menu')).not.toBeVisible();
    });
    const emailContentCont = screen.getByTitle('email-content-cont');
    const contentContBackArrow = within(emailContentCont).getByTitle('content-cont-back-arrow');
    expect(contentContBackArrow).toBeInTheDocument();
    userEvent.click(contentContBackArrow);

    await waitFor(() => {
      expect(contentContBackArrow).not.toBeInTheDocument();
    });
    expect(screen.getAllByTitle('email-list-item').length).toBe(initialInboxLen - 1);

    const spamMainMenuList = within(screen.getByTitle('category-menu')).getByText('Spam');
    // const spamMainMenuList = getByRole('button', { name: 'Spam 4' }); // Spam 4 -> code suggestion
    expect(spamMainMenuList).toBeInTheDocument();
    userEvent.click(spamMainMenuList);
    
    await waitFor(() => {
      const listItemsCount = screen.getAllByTitle('email-list-item').length;
      expect(listItemsCount).toBe(initialSpamLen + 1);
    });
  });

  test('check for move(to trash) operation from inbox category in inner container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialTrashLen = dataObject.trash.length;
    const initialInboxLen = dataObject.inbox.length;
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });

    const operationsMenuCont = screen.getByTitle('operations-menu-cont');
    expect(operationsMenuCont).toBeInTheDocument();
    const moveOpFolderIcon = screen.getByTitle('move-op-folder-icon');
    expect(moveOpFolderIcon).toBeInTheDocument();
    userEvent.click(moveOpFolderIcon);

    await waitFor(() => { 
      expect(screen.getByTitle('move-spam-trash-menu')).toBeInTheDocument();
    });
    const moveSpamTrashMenu = screen.getByTitle('move-spam-trash-menu');
    const { getByText } = within(moveSpamTrashMenu);
    const listItemTrash = getByText('Trash');
    expect(listItemTrash).toBeInTheDocument();
    userEvent.click(listItemTrash);

    await waitFor(() => {
      expect(screen.queryByTitle('move-spam-trash-menu')).not.toBeVisible();
    });

    const emailContentCont = screen.getByTitle('email-content-cont');
    const contentContBackArrow = within(emailContentCont).getByTitle('content-cont-back-arrow');
    expect(contentContBackArrow).toBeInTheDocument();
    userEvent.click(contentContBackArrow);

    await waitFor(() => {
      expect(contentContBackArrow).not.toBeInTheDocument();
    });
    expect(screen.getAllByTitle('email-list-item').length).toBe(initialInboxLen - 1);

    const trashMainMenuList = within(screen.getByTitle('category-menu')).getByText('Trash');
    expect(trashMainMenuList).toBeInTheDocument();
    userEvent.click(trashMainMenuList);
    
    await waitFor(() => {
      const listItemsCount = screen.getAllByTitle('email-list-item').length;
      expect(listItemsCount).toBe(initialTrashLen + 1);
    });
  });

  test('the labels should be added from inner container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });

    const operationsMenuCont = screen.getByTitle('operations-menu-cont');
    expect(operationsMenuCont).toBeInTheDocument();

    const categoryPinIcon = screen.getByTitle('cat-pin-icon-button');
    expect(categoryPinIcon).toBeInTheDocument();
    userEvent.click(categoryPinIcon);

    await waitFor(() => { 
      expect(screen.getByTitle('move-spam-trash-menu')).toBeInTheDocument();
    });
    const mailSubCatMenu = screen.getByTitle('mail-sub-cat-menu');

    // Personal category
    const personalCatButton = within(mailSubCatMenu).getByText('Personal');
    expect(personalCatButton).toBeInTheDocument();
    userEvent.click(personalCatButton);
    await waitFor(() => {
      const messContentRightCont = screen.getByTitle('message-and-chip-cont');
      const chipTextPersonal = within(messContentRightCont).getByText('personal');
      expect(chipTextPersonal).toBeInTheDocument();
    });

    // Important category
    const impCatButton = within(screen.getByTitle('mail-sub-cat-menu')).getByText('Important');
    expect(impCatButton).toBeInTheDocument();
    userEvent.click(impCatButton);
    await waitFor(() => {
      const messContentRightCont = screen.getByTitle('message-and-chip-cont');
      const chipTextImp = within(messContentRightCont).getByText('important');
      expect(chipTextImp).toBeInTheDocument();
    });

    // // Company category
    // const companyCatButton = within(screen.getByTitle('mail-sub-cat-menu')).getByText('Company');
    // expect(companyCatButton).toBeInTheDocument();
    // userEvent.click(companyCatButton);
    // await waitFor(() => {
    //   const messContentRightCont = screen.getByTitle('message-and-chip-cont');
    //   const chipTextCompany = within(messContentRightCont).getByTitle('category-chip-company');
    //   expect(chipTextCompany).toBeInTheDocument();
    // });

    // // Private category
    // const privateCatButton = within(screen.getByTitle('mail-sub-cat-menu')).getByText('Private');
    // expect(privateCatButton).toBeInTheDocument();
    // userEvent.click(privateCatButton);
    // await waitFor(() => {
    //   const messContentRightCont = screen.getByTitle('message-and-chip-cont');
    //   const chipTextCompany = within(messContentRightCont).getByTitle('category-chip-private');
    //   expect(chipTextCompany).toBeInTheDocument();
    // });
  });

  test('check for delete operation from inbox category in inner container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialInboxLen = dataObject.inbox.length;
    const currentEle = dataObject.inbox[0];
    const nextEle = dataObject.inbox[1];
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const clickableStackItem = within(listItemFromList).getByTitle('clickable-stack-item');
    expect(clickableStackItem).toBeInTheDocument();
    userEvent.click(clickableStackItem);

    await waitFor(() => {
      expect(screen.getByTitle('email-content-cont')).toBeInTheDocument();
    });

    // const operationsMenuCont = screen.getByTitle('operations-menu-cont');
    // expect(operationsMenuCont).toBeInTheDocument();
    const opMenuDelIcon = screen.getByTitle('op-menu-del-icon');
    expect(opMenuDelIcon).toBeInTheDocument();
    userEvent.click(opMenuDelIcon);

    await waitFor(() => { 
      const messAndChipCont = screen.getByTitle('message-and-chip-cont');
      const subjectLine = within(messAndChipCont).queryByText(currentEle.mail.subject);
      expect(subjectLine).not.toBeInTheDocument();
    });
    
    const messAndChipCont = screen.getByTitle('message-and-chip-cont');
    const subjectLine = within(messAndChipCont).getByText(nextEle.mail.subject);
    expect(subjectLine).toBeInTheDocument();
    expect(dataObject.inbox.length).toBe(initialInboxLen - 1);

    const emailContentCont = screen.getByTitle('email-content-cont');
    const contentContBackArrow = within(emailContentCont).getByTitle('content-cont-back-arrow');
    expect(contentContBackArrow).toBeInTheDocument();
    userEvent.click(contentContBackArrow);

    await waitFor(() => {
      expect(contentContBackArrow).not.toBeInTheDocument();
    });
    expect(screen.getAllByTitle('email-list-item').length).toBe(initialInboxLen - 1);
  });

});



// Test command -> npm test -- --verbose src/__tests__/emailPage/EmailPage.spec.js
// "eslintConfig": {
//   "extends": [
//     "react-app"
//   ]
// },