import React from 'react';
import { Badge, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

const AvatarWithActiveIcon = ({ title, isClickable, onClick, isActive, hideDot, styles }) => {

    const ActiveStyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: theme.palette.mode === 'dark' 
            ? `0 0 0 2px rgba(231, 227, 252, 0.68)`
            : `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
    }));

    const InActiveStyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: 'rgb(138, 141, 147);',
          color: 'rgb(138, 141, 147);',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
          },
        },
    }));

    const avatarSize = styles !== undefined ? styles : {};

    return(
        <IconButton
            // size="large"
            // edge="end"
            aria-haspopup="true"
            disabled={!isClickable}
            onClick={isClickable ? onClick : () => {}}
            // color="inherit"
        >
          {hideDot 
            ? <Avatar sx={{ bgcolor: deepOrange[500], width: 34, height: 34 }}>
                {title}
              </Avatar>
            : isActive ? (
                <ActiveStyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ bgcolor: deepOrange[500], ...avatarSize }}>{title}</Avatar>
                </ActiveStyledBadge>
              ) : (
                <InActiveStyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ bgcolor: deepOrange[500], ...avatarSize }}>{title}</Avatar>
                </InActiveStyledBadge>
              )
          }
        </IconButton>
    );
}
export default AvatarWithActiveIcon;