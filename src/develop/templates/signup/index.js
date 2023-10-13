import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Stack, InputAdornment, IconButton, Checkbox, Button, FormControlLabel,
    Typography, Divider,
    // Alert, Snackbar
} from '@mui/material';
import { Visibility, VisibilityOff, FacebookRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthValues } from '../../context/authContext';
import AlertMessage from '../../components/alert';
import '../../../App.css';


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

// const AlertComponent = React.forwardRef(function Alert(props, ref) {
//     return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
// });


const SignUp = (props) => {
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [userNameError, setUserNameError] = React.useState(false);
    const [password, setPassword] = React.useState('123');
    const [passwordError, setPasswordError] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checkBox, setCheckBox] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const auth = useAuthValues();
    const { signUp } = auth;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    };
    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
        setUserNameError(false);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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

    let navigate = useNavigate();
    const { state } = useLocation();

    const validateEmailAndPassword = () => {
        console.log('inside validateEmailAndPassword: ', username, email, password)
        if(username !== '' && email !== '' && password !== '' && validateEmail()){
            try{
                const signUpData = {
                    username: username,
                    email: email,
                    password: password,
                }
                console.log('before signup: ', signUpData)
                signUp(signUpData).then((res) => {
                    navigate(`${state?.path}` || '/dashboard');
                }).catch(err => {
                    setErrorMessage(err);
                    setOpen(true);
                });
            }catch(e){
                console.log('error: ', e)
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
                Adventure starts here 🚀
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
                Make your app management easy and fun!
            </Typography>
            <br />

            <CssTextField 
                error={userNameError}
                id="outlined-error-helper-text-username"
                helperText={userNameError ? "Enter username" : ''}
                label="Username" 
                fullWidth={true} 
                value={username}
                onChange={handleUserNameChange}
                inputProps={{ "data-testid": "id-login-username-input" }}
            />
            <br />

            <CssTextField 
                error={emailError}
                id="outlined-error-helper-text-email"
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
                    label="I agree to privacy policy & terms"
                    sx={{
                        '.MuiFormControlLabel-label': {
                            color: 'rgba(58, 53, 65, 0.68)',
                            fontSize: 14,
                        }
                    }}
                />
                <div />
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
                disabled={email === '' && password === '' && username === ''}
            >
                SiGN UP
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
                        Already have an account?
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
                            navigate('/login');
                        }}
                    >
                        Sign in instead
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

export default SignUp;