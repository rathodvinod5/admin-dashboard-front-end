import React from 'react';
import { Stack } from '@mui/material';
import SignUp from '../../templates/signup/index';
import '../../../index.css';
import './styles.css';

const SignUpPage = (props) => {

    return(
        <div className='App' data-testid="id-login-container">
            {/* {user ? <Navigate to="/dashboard" replace={true} /> : null } */}
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                // spacing={2}
            >
                <div className='bg-left-container App bg'></div>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    // spacing={2}
                    className='login-comp-cont'
                >
                    <div style={{ width: '80%'}}>
                        <SignUp />
                    </div>
                </Stack>
            </Stack>
        </div>
    );
}

export default SignUpPage;