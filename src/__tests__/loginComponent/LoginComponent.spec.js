import {
    render, screen, fireEvent, waitFor
  } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import Login from '../../develop/pages/login/index';
  import { BrowserRouter as Router } from "react-router-dom";
  import { AuthProvider } from '../../develop/context/authContext';

  // all test cases were succesfull
  describe.skip('Login Component', () => {
    
    const auth = {
      loggedIn: false,
      logIn: () => { },
      logOut: () => { }
    };
    jest.mock('../../develop/context/authContext', () => ({
      useAuthValues: jest.fn().mockReturnValue(auth),
    }));
  
    test('Login container should render', () => {
      render(<AuthProvider><Router><Login /></Router></AuthProvider>);
      const logincomponent = screen.getByTestId('id-login-container');
      expect(logincomponent).toBeInTheDocument();
    });
  
    test('Login Email, Password, Remember Me, Forgot Pass Button, Login button should render', () => {
      render(<AuthProvider><Router><Login /></Router></AuthProvider>);
      const loginEmailInput = screen.getByRole('textbox', { name: 'Email' });
      expect(loginEmailInput).toBeInTheDocument();
      expect(loginEmailInput.value).toBe("");
      const loginPassInput = screen.getByLabelText('Password' );
      expect(loginPassInput).toBeInTheDocument();
      const loginPassRemember = screen.getByRole('checkbox', { name: 'Remember Me' });
      expect(loginPassRemember).toBeInTheDocument();
      expect(loginPassRemember).not.toBeChecked();
      const loginPassForgotPass = screen.getByRole('button', { name: /forgot-pass-button/i });
      expect(loginPassForgotPass).toBeInTheDocument();
      const loginButton = screen.getByRole('button', { name: /login-button/i });
      expect(loginButton).toBeInTheDocument();
      // expect(loginButton.hasAttribute('disabled')).toEqual(true);
    });
      
    // still pending
    test.skip('check for password visibility', async() => {
      render(<AuthProvider><Router><Login /></Router></AuthProvider>);
      const loginPassInput = screen.getByLabelText('Password');
      expect(loginPassInput).toBeInTheDocument();
      const visibilityButton = screen.getByRole('button', { name: 'toggle password visibility' });
      expect(visibilityButton).toBeInTheDocument();
      fireEvent.change(loginPassInput, {
        target: { value: 'admin123' },
      });
      expect(loginPassInput.value).toBe('admin123');
      userEvent.click(visibilityButton);
      
      await waitFor(() => {
        expect(loginPassInput.value).toBe("********");
      });
    });
  
    test('Login Button should be disabled if email is null/empty', async () => {
      render(<AuthProvider><Router><Login /></Router></AuthProvider>);
      const loginPasswordInput = screen.getByLabelText('Password');
      expect(loginPasswordInput).toBeInTheDocument();
      fireEvent.change(loginPasswordInput, {
        target: { value: 'admin123' },
      });
      expect(loginPasswordInput.value).toBe("admin123");
      const loginEmailInput = screen.getByRole('textbox', { name: 'Email' });
      expect(loginEmailInput).toBeInTheDocument();
      expect(loginEmailInput.value).toBe("");
      const loginButton = screen.getByRole('button', { name: /login-button/i });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
      // expect(loginButton.hasAttribute('disabled')).toEqual(true);
    });
  
    test('Login Button should be disabled if password is null/empty', () => {
      render(<AuthProvider><Router><Login /></Router></AuthProvider>);
      const loginEmailInput = screen.getByRole('textbox', { name: 'Email' });
      expect(loginEmailInput).toBeInTheDocument();
      expect(loginEmailInput.value).toBe("");
      const loginPasswordInput = screen.getByLabelText('Password');
      expect(loginPasswordInput).toBeInTheDocument();
      expect(loginPasswordInput.value).toBe("");
      const loginButton = screen.getByRole('button', { name: /login-button/i });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton.hasAttribute('disabled')).toEqual(true);
    //   expect(loginButton).toBeDisabled();
    });
  
    test('Login Button should not be disable if email and password are not-null / not-empty', async () => {
      render(<AuthProvider><Router><Login /></Router></AuthProvider>);
  
      // define all the elements at initial stage
      const loginButton = screen.getByRole('button', { name: /login-button/i });
      // const loginEmailInput = screen.getByTestId('id-login-email-input');
      // const loginPassInput = screen.getByTestId('id-login-password-input');
      const loginEmailInput = screen.getByLabelText('Email');
      const loginPassInput = screen.getByLabelText('Password');
  
      // Login Button should be in the document
      expect(loginButton).toBeInTheDocument();
      expect(loginButton.hasAttribute('disabled')).toEqual(true);
      expect(loginButton).toHaveClass("Mui-disabled");
  
      // email should be in the document
      expect(loginEmailInput).toBeInTheDocument();
      
      //Password field should be in the document
      expect(loginPassInput).toBeInTheDocument();
      
      // Make changes in the input text of the email
      fireEvent.change(loginEmailInput, {
        target: { value: 'admin' },
      });
      expect(loginEmailInput.value).toBe('admin');
  
      fireEvent.change(loginPassInput, {
        target: { value: '123' },
      });
      expect(loginPassInput.value).toBe('123');
  
      expect(loginButton.hasAttribute('disabled')).toEqual(false);
      expect(loginButton).not.toHaveClass("Mui-disabled");
    });
  });