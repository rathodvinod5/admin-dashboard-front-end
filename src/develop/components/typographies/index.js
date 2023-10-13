import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const baseTitleStyles = {
    fontWeight: 500, 
    textAlign: 'left',
    fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
}

export const ChatText = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 15,
    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(58, 53, 65, 0.87)',
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 12,
    textOverflow: 'ellipsis', 
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize', 
    color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.68)' : 'rgba(58, 53, 65, 0.68)',
    // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(58, 53, 65, 0.87)',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 15,
    color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.68)' : 'rgba(58, 53, 65, 0.68)',
}));

// export default null;