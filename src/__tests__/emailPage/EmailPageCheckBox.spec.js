import { within, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import EmailPage from '../../develop/pages/email/index';
import { BrowserRouter as Router } from "react-router-dom";
import { dataObject } from "../../develop/context/emailContext";

// all test cases were succesfull
describe.skip('EmailPage test checkbox', () => {
  
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  test('onclick of single/multiple checkbox, the operations options should appear', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const listItemFromList = screen.getAllByTitle('email-list-item')[0];
    const listItemCheckBox = within(listItemFromList).getByRole('checkbox');
    expect(listItemCheckBox).toBeInTheDocument();
    expect(listItemCheckBox).not.toBeChecked();
    expect(screen.queryByTitle('move-op-folder-icon')).not.toBeInTheDocument();
    expect(screen.queryByTitle('cat-pin-icon-button')).not.toBeInTheDocument();
    expect(screen.queryByTitle('op-menu-del-icon')).not.toBeInTheDocument();
    userEvent.click(listItemCheckBox);

    await waitFor(() => {
        expect(listItemCheckBox).toBeChecked();
    });
    expect(screen.queryByTitle('move-op-folder-icon')).toBeInTheDocument();
    expect(screen.queryByTitle('cat-pin-icon-button')).toBeInTheDocument();
    expect(screen.queryByTitle('op-menu-del-icon')).toBeInTheDocument();
  });
    
  test('check for move(to spam) operation from inbox category in top container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialSpamLen = dataObject.spam.length;
    const initialListItems = screen.getAllByTitle('email-list-item');
    const listItemFromList = initialListItems[0];
    const listItemCheckBox = within(listItemFromList).getByRole('checkbox');
    expect(listItemCheckBox).toBeInTheDocument();
    expect(listItemCheckBox).not.toBeChecked();
    expect(screen.queryByTitle('move-op-folder-icon')).not.toBeInTheDocument();
    userEvent.click(listItemCheckBox);

    await waitFor(() => {
        expect(listItemCheckBox).toBeChecked();
    });
    const moveOpFolderIcon = screen.queryByTitle('move-op-folder-icon');
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
        expect(screen.queryByTitle('move-op-folder-icon')).not.toBeInTheDocument();
    });
    const newInboxList = screen.getAllByTitle('email-list-item');
    expect(newInboxList.length).toBe(initialListItems.length - 1);

    const spamMainMenuList = within(screen.getByTitle('category-menu')).getByText('Spam');
    expect(spamMainMenuList).toBeInTheDocument();
    userEvent.click(spamMainMenuList);
    
    await waitFor(() => {
      const listItemsCount = screen.getAllByTitle('email-list-item').length;
      expect(listItemsCount).toBe(initialSpamLen + 1);
    });
  });
    
  test('check for move(to trash) operation from inbox category in top container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialTrashLen = dataObject.trash.length;
    const initialListItems = screen.getAllByTitle('email-list-item');
    const listItemFromList = initialListItems[0];
    const listItemCheckBox = within(listItemFromList).getByRole('checkbox');
    expect(listItemCheckBox).toBeInTheDocument();
    expect(listItemCheckBox).not.toBeChecked();
    expect(screen.queryByTitle('move-op-folder-icon')).not.toBeInTheDocument();
    userEvent.click(listItemCheckBox);

    await waitFor(() => {
        expect(listItemCheckBox).toBeChecked();
    });
    const moveOpFolderIcon = screen.queryByTitle('move-op-folder-icon');
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
        expect(screen.queryByTitle('move-op-folder-icon')).not.toBeInTheDocument();
    });
    const newInboxList = screen.getAllByTitle('email-list-item');
    expect(newInboxList.length).toBe(initialListItems.length - 1);

    const trashMainMenuList = within(screen.getByTitle('category-menu')).getByText('Trash');
    expect(trashMainMenuList).toBeInTheDocument();
    userEvent.click(trashMainMenuList);
    
    await waitFor(() => {
      const listItemsCount = screen.getAllByTitle('email-list-item').length;
      expect(listItemsCount).toBe(initialTrashLen + 1);
    });
  });
    
  test('check for tags/labels(Personal) to be added from top container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialListItems = screen.getAllByTitle('email-list-item');
    const firstListItemFromList = initialListItems[0];
    // const initialNumOfChip = within(firstListItemFromList).queryByTitle('tag-label-div-personal');
    const listItemCheckBox = within(firstListItemFromList).getByRole('checkbox');
    expect(listItemCheckBox).toBeInTheDocument();
    expect(listItemCheckBox).not.toBeChecked();
    // expect(initialNumOfChip).not.toBeInTheDocument();
    expect(screen.queryByTitle('cat-pin-icon-button')).not.toBeInTheDocument();
    expect(screen.queryByTitle('mail-sub-cat-menu')).not.toBeInTheDocument();
    userEvent.click(listItemCheckBox);

    await waitFor(() => {
        expect(listItemCheckBox).toBeChecked();
    });
    const categoryPinIcon = screen.getByTitle('cat-pin-icon-button');
    expect(categoryPinIcon).toBeInTheDocument();
    userEvent.click(categoryPinIcon);
    
    await waitFor(() => {
      expect(screen.getByTitle('mail-sub-cat-menu')).toBeInTheDocument();
    });
    const mailSubCatMenu = screen.getByTitle('mail-sub-cat-menu');
    const personalCatButton = within(mailSubCatMenu).getByText('Personal');
    expect(personalCatButton).toBeInTheDocument();
    userEvent.click(personalCatButton);
    
    await waitFor(() => {
      expect(screen.queryByTitle('mail-sub-cat-menu')).not.toBeInTheDocument();
    });
    const newFirstEle = screen.getAllByTitle('email-list-item')[0];
    const tagLabelChipDiv = within(newFirstEle).getByTitle('tag-label-div-personal')
    expect(tagLabelChipDiv).toBeInTheDocument();
    const newListItemCheckBox = within(newFirstEle).getByRole('checkbox');
    expect(newListItemCheckBox).toBeInTheDocument();
    expect(newListItemCheckBox).not.toBeChecked();
      
  });

  test('check for delete operation from inbox category in top container', async () => {
    window.ResizeObserver = ResizeObserver;
    render(<Router><EmailPage /></Router>);
    const initialListItems = screen.getAllByTitle('email-list-item');
    const listItemFromList = initialListItems[0];
    const listItemCheckBox = within(listItemFromList).getByRole('checkbox');
    expect(listItemCheckBox).toBeInTheDocument();
    expect(listItemCheckBox).not.toBeChecked();
    expect(screen.queryByTitle('op-menu-del-icon')).not.toBeInTheDocument();
    userEvent.click(listItemCheckBox);

    await waitFor(() => {
        expect(listItemCheckBox).toBeChecked();
    });
    const deleteIcon = screen.queryByTitle('op-menu-del-icon');
    expect(deleteIcon).toBeInTheDocument();
    userEvent.click(deleteIcon);
    
    await waitFor(() => {
      expect(screen.queryByTitle('op-menu-del-icon')).not.toBeInTheDocument();
    });
    const newInboxList = screen.getAllByTitle('email-list-item');
    expect(newInboxList.length).toBe(initialListItems.length - 1);

  });
    
});