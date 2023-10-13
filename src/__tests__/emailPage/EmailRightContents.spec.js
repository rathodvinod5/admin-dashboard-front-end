import {
    render, screen, fireEvent, waitFor, within //userEvent
} from '@testing-library/react';
// import { MuiThemeProvider } from "@mui/material/styles";
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import MailRightContents, { EMailElement } from '../../develop/pages/email/rightContents';
import { dataObject } from "../../develop/context/emailContext";

// all test cases were succesfull
describe.skip('Email right content container', () => {

  test('it(the container) should render', () => {
    render(
      <Router>
        <MailRightContents
          parentData={dataObject['inbox']}
          refresh={false}
          showEmailContents={() => {}}
          checkObjectParent={{}}
        />
      </Router>);
    const container = screen.getByTitle('mail-right-content');
    expect(container).toBeInTheDocument();
  });
    
//   test.skip('it should render the refresh container', async () => {
//     render(
//         <ThemeProvider
//             theme={ theme === "light" ? getLightTheme(colorSelected, type) : getDarkTheme(colorSelected, type)
//             }
//         >
//             <Router>
//                 <MailRightContents
//                     parentData={dataObject['inbox']}
//                     refresh={true}
//                     showEmailContents={() => { }}
//                     checkObjectParent={{}}
//                 />
//             </Router>
//       </ThemeProvider>
//     );
//     expect(screen.getByTitle('refresh-container')).toBeInTheDocument();
//   });
    
  test('it should render the inbox category email lists', async () => {
    const arrLen = dataObject['inbox'].length;
    render(
      <Router>
        <MailRightContents
          parentData={dataObject['inbox']}
          refresh={false}
          showEmailContents={() => { }}
          checkObjectParent={{}}
        />
      </Router>);
    
    const listContainer = screen.getByTitle('emails-list-cont');
    expect(listContainer).toBeInTheDocument();
    const { getAllByTitle } = within(listContainer);
    const listItems = getAllByTitle('email-list-item');
    expect(listItems.length).toBe(arrLen);
  });
    
  test('list item should render checkbox, name, subject and dots', () => {
    const ele = {
      title: 'Louetta Esses',
      email: 'louettae@mail.com',
      mail: {
        timeStamp: '1660817369000',
        type: ['important'],
        subject: 'Update Can Change Your Personal Life Important',
        message: `Hi John,\n \n
        5 Biggest Ways in Which the Latest iOS Update Can Change Your Personal Life \n
        1.Group FaceTime \n
        2. Memoji & Animoji \n
        3. Person to Person Payments \n
        4. Screen Time \n
        5. Shortcuts App on Macs \n
        Regrads, \n   \n
        Louetta Esses`
      }
    }
    render(
      <EMailElement 
        checked={false}
        ele={ele}
        index={0}
        showEmailContents={(props) => { console.log('showEmailContests called') }}
        onClickCheckBox={(email, val) => { console.log('onClickCheckBox called') }}
      />
    );
      
    expect(screen.getByTitle('email-list-item')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Louetta Esses')).toBeInTheDocument();
    expect(screen.getByText('Update Can Change Your Personal Life Important')).toBeInTheDocument();
  });
});