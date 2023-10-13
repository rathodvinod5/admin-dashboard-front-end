import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Stack, InputAdornment, IconButton, Checkbox, Button, FormControlLabel,
    Typography, Divider, Alert, Collapse } from '@mui/material';
import { Visibility, VisibilityOff, FacebookRounded, Close } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthValues } from '../../context/authContext';
import AlertMessage from '../../components/alert';
import '../../../App.css';

const userObject = {
    admin: {
        email: 'admin@gmail.com',
        password: 'admin123'
    },
    user: {
        email: 'user@gmail.com',
        password: 'user123'
    },
    dev: {
        email: 'dev@gmail.com',
        password: 'dev123'
    }
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'rgb(86, 202, 0)',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgb(86, 202, 50, 0.6)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(86, 202, 0)',
      },
    },
});

const CssCheckbox = styled(Checkbox)({
    '&.MuiCheckbox-root': {
        color: 'rgb(118, 118, 118)',
        '&.Mui-checked': {
            color: 'rgb(86, 202, 0)',
        }
    },
});

const Login = (props) => {

    const [password, setPassword] = React.useState('123');
    const [passwordError, setPasswordError] = React.useState();
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checkBox, setCheckBox] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const auth = useAuthValues();
    const { logIn } = auth;

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    };
    const validateEmail = () => {
        var re = /\S+@\S+\.\S+/;
        if(re.test(email)){
            setEmailError(false);
            return true;
        }else{
            setEmailError(true);
        }
        return false;
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    let navigate = useNavigate();
    const { state } = useLocation();

    const validateEmailAndPassword = () => {
        if(email !== '' && password !== '' && validateEmail()){
            try{
                // console.log('before try');
                // localStorage.setItem('token', JSON.stringify(email));
                // console.log('after try');
                // navigate('/dashboard', { replace: true })
                // const prevPathExists = state !== undefined && state.path !== undefined;
                const signUpData = {
                    email: email,
                    password: password,
                }
                logIn(signUpData).then((res) => {
                    console.log('inside callback of logIn: ', res)
                    navigate(`${state?.path}` || '/dashboard');
                }).catch(err => {
                    setErrorMessage(err);
                    setOpen(true);
                    console.log('error at login: ', err)
                });
            }catch(e){
                console.log('error at outer catch: ', e);
                setErrorMessage('setErrorMessage');
                setOpen(true);
            }
        }else if(email !== '' && password === ''){
            setPasswordError(true);
        }else if(email === '' && password !== ''){
            validateEmail();
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCheckBoxChange = (event) => {
        setCheckBox(event.target.checked);
    };

    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
          marginTop: theme.spacing(2),
        },
      }));

    return(
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            // spacing={2}
        >
            <AlertMessage open={open} errorMessage={errorMessage} setOpen={setOpen} />

            <Typography 
                sx={{ width: '100%', fontSize: 28, lineHeight: 0.8, fontWeight: 500, color: 'rgba(58, 53, 65, 0.87)', textAlign: 'left' }} 
                color="text.secondary" gutterBottom
            >
                Welcome
            </Typography>
            <Typography 
                sx={{ 
                    width: '100%', 
                    fontSize: 14, 
                    color: 'rgba(58, 53, 65, 0.68)', 
                    textAlign: 'left',
                }} 
                color="text.secondary" gutterBottom
            >
                Please sign-in to your account and start the adventure
            </Typography>
            <br />
            <CssTextField 
                error={emailError}
                id="outlined-error-helper-text"
                helperText={emailError ? "Enter valid email address" : ''}
                label="Email" 
                fullWidth={true} 
                value={email}
                onChange={handleEmailChange}
                inputProps={{ "data-testid": "id-login-email-input" }}
            />
            <br />
            <CssTextField 
                label="Password" 
                error={passwordError}
                helperText={emailError ? "Enter valid password" : ''}
                id="custom-css-outlined-input" 
                aria-label="custom-css-outlined-input1"
                fullWidth={true} 
                // required={true}
                type={showPassword ? "text" : "password"}
                // handleChange={handlePasswordChange}
                onChange={handlePasswordChange}
                InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    "data-testid": "id-login-password-input"
                }}
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ borderWidth: 1, borderColor: 'black', width: '100%' }}
                // spacing={2}
            >
                <FormControlLabel 
                    control={
                        <CssCheckbox onChange={handleCheckBoxChange} />
                    } 
                    label="Remember Me"
                    sx={{
                        '.MuiFormControlLabel-label': {
                            color: 'rgba(58, 53, 65, 0.68)',
                            fontSize: 14,
                        }
                    }}
                />
                <Button variant="text" disableRipple={true} aria-label="forgot-pass-button"
                    sx={{ 
                        color: 'rgb(86, 202, 0)',
                        ':hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        },
                        '&.MuiButton-text': {
                            fontSize: 14,
                            textTransform: 'capitalize',
                            fontWeight: 300
                        }
                    }}
                >
                    Forgot Password?
                </Button>
            </Stack>
            <br />
            <Button 
                sx={{ 
                    backgroundColor: 'rgb(86, 202, 0)',
                    '&:hover': {
                        backgroundColor: 'rgb(86, 202, 0)'
                    }
                }} 
                fullWidth 
                variant="contained"
                onClick={validateEmailAndPassword}
                aria-label="login-button"
                disabled={email === '' || password === ''}
            >
                LOGIN
            </Button>
            <br />
            <Root>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ borderWidth: 1, borderColor: 'black', width: '100%' }}
                    // spacing={2}
                >
                    <Typography 
                        sx={{ paddingTop: 0.6, width: '100%', fontSize: 14, color: 'rgba(58, 53, 65, 0.68)', textAlign: 'right' }} 
                        color="text.secondary" gutterBottom
                    >
                        New on our platform?
                    </Typography>
                    <Button variant="text" disableRipple={true} fullWidth={true}
                        sx={{ 
                            color: 'rgb(86, 202, 0)',
                            // fontSize: 12,
                            ':hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0)'
                            },
                            '&.MuiButton-text': {
                                fontSize: 14,
                                textTransform: 'capitalize',
                                textAlign: 'left',
                                width: '100%',
                                fontWeight: 300
                            }
                        }}
                        onClick={() => {
                            navigate('/signup');
                        }}
                    >
                        Create an account?
                    </Button>
                </Stack>
                <Divider>or</Divider>
            </Root>
            <br />
            <IconButton size='medium' color="secondary" aria-label="add an alarm"
                sx={{ color: 'rgb(86, 202, 0)' }}
            >
                <FacebookRounded />
            </IconButton>
        </Stack>        
    );
}

export default Login;