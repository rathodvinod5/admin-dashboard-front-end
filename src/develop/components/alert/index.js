import React from 'react';
import { IconButton, Alert, Collapse } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';


const AlertMessage = ({ open, errorMessage, setOpen }) => {
    return (
        <Collapse in={open}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setOpen(false)}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {errorMessage}
            </Alert>
        </Collapse>
    );
}

export default AlertMessage;

AlertMessage.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    errorMessage: PropTypes.string
}
  
AlertMessage.defaultProps = {
    open: false,
    setOpen: () => {},
    errorMessage: 'Please try after sometimes!',
}