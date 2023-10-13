import React, { useState } from 'react';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Typography,
     } from '@mui/material';
import { MailOutline, ChatBubbleOutline, CalendarMonth, Receipt, NavigateNext,
    PersonOutline, LockOutlined, HomeOutlined } from '@mui/icons-material';
import { createTheme, styled } from "@mui/material/styles";
import { getPrimaryColor, getGradientColor } from '../../../theme/Theme';
import { NavLink } from 'react-router-dom';
import '../../../../App.css';

const MainMenu = (props) => {
    const { toggleDrawer, selectedColor } = props;
    // const [anchorEl, setAnchorEl] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const themeTitleStyles = { 
        width: '100%', 
        fontSize: 20, 
        lineHeight: 0.8, 
        fontWeight: 500, 
        textAlign: 'left', 
        fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }

    const menuTheme = createTheme({
        typography: {
            fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        components: {
            MuiMenuItem: {
              styleOverrides: {
                root: {
                    height: 45,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    ':hover': {
                        // backgroundColor: 'red',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'green'
                    }
                }
              }
            }
        }
    });

    const CustomMenuItem = styled(MenuItem)({
        height: 45,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 8,
        '&.Mui-selected': {
            background: "linear-gradient(to right, " + `${getGradientColor(selectedColor, 'light')}` + ', ' + `${getGradientColor(selectedColor, 'dark')}` + ")",
        },
        '&.Mui-selected:hover': {
            // backgroundColor: theme.palette.primary.main
            backgroundColor: getPrimaryColor(selectedColor)
        },
        '&.Mui-active': {
            // backgroundColor: 'transparent',
        },
    });

    const onClickMaterio = (event) => {
        event.preventDefault();
        toggleDrawer(true);
    }

    return(
        <div title="title-main-menu-list" data-testid="id-main-menu-list">
        {/* <ThemeProvider theme={menuTheme}>
        <CssBaseline /> */}

            <MenuList>
                <MenuItem onClick={toggleDrawer} disableRipple
                    sx={{
                        ':hover': {
                            backgroundColor: '#ffffff'
                        }
                    }}
                >
                    <ListItemText>
                        <Typography 
                            gutterBottom
                            variant='h2'
                            sx={{
                                ...themeTitleStyles,
                                ':hover': {
                                    color: getPrimaryColor(selectedColor)
                                }
                            }}
                        >
                            MATERIO
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <NavLink 
                    to="" 
                    className='navlink-class'
                >
                    <CustomMenuItem title="title-dashboard" selected={currentIndex === 0} onClick={(event) => setCurrentIndex(0)}>
                        <ListItemIcon onClick={(event) => console.log('button cliked')}>
                            <HomeOutlined fontSize="medium" color='' />
                        </ListItemIcon>
                        <ListItemText>Dashboards</ListItemText>
                    </CustomMenuItem>
                </NavLink>
                <br />

                <Divider textAlign="left">APPS</Divider>

                <NavLink 
                    to="email"
                    className='navlink-class'
                    // data-testid="id-menu-list-email"
                >
                    <CustomMenuItem
                        data-testid="id-menu-list-email"
                        selected={currentIndex === 1} onClick={(event) => setCurrentIndex(1)}
                    >
                        <ListItemIcon>
                            <MailOutline fontSize="small" color='' />
                        </ListItemIcon>
                        <ListItemText>Email</ListItemText>
                    </CustomMenuItem>
                </NavLink>

                <NavLink 
                    to="chat"
                    className='navlink-class'
                    // aria-label="id-menu-list-chat"
                >
                    <CustomMenuItem
                        data-testid="id-menu-list-chat"
                        selected={currentIndex === 2}
                        onClick={(event) => setCurrentIndex(2)}
                    >
                        <ListItemIcon>
                            <ChatBubbleOutline fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Chat</ListItemText>
                    </CustomMenuItem>
                </NavLink>
                <CustomMenuItem selected={currentIndex === 3} onClick={(event) => setCurrentIndex(3)}>
                    <ListItemIcon>
                        <CalendarMonth fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Calendar</ListItemText>
                </CustomMenuItem>
                <CustomMenuItem selected={currentIndex === 4} onClick={(event) => setCurrentIndex(4)}>
                    <ListItemIcon>
                        <Receipt fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Invoice</ListItemText>
                    <ListItemIcon>
                        <NavigateNext fontSize="medium" />
                    </ListItemIcon>
                </CustomMenuItem>
                <CustomMenuItem selected={currentIndex === 5} onClick={(event) => setCurrentIndex(5)}>
                    <ListItemIcon>
                        <PersonOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>User</ListItemText>
                    <ListItemIcon>
                        <NavigateNext fontSize="medium" />
                    </ListItemIcon>
                </CustomMenuItem>
                <CustomMenuItem selected={currentIndex === 6} onClick={(event) => setCurrentIndex(6)}>
                    <ListItemIcon>
                        <LockOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Roles and Permission</ListItemText>
                </CustomMenuItem>
            </MenuList>
        {/* </ThemeProvider> */}
        </div>
    );
}

export default MainMenu;