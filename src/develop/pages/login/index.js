import React from 'react';
import { Stack } from '@mui/material';
import Login from '../../templates/login';
import '../../../index.css';
import './styles.css';

const LoginPage = (props) => {

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
                        <Login />
                    </div>
                </Stack>
            </Stack>
        </div>
    );
}

export default LoginPage;