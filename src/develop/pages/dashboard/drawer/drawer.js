import React, { useState, useEffect, } from 'react';
import { Drawer, styled, Typography, Stack, IconButton, Divider, FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio, Switch } from '@mui/material';
import { Close } from '@mui/icons-material';
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import ToggleWithRightCheck from '../../../components/toggleWithRightCheck';
import '../styles.css';

const DrawerWithContent = (props) => {
    const { toggleTheme, setColorSelected, showDrawer, onClose, setType } = props;
    // const [showDrawerPage, toggleDrawerPage] = useState(true);
    const [buttonIndex, setButtonIndex] = useState(0);

    const correspondingIndexColors = ['green', 'purple', 'tomato', 'orange', 'skyblue'];
    const theme = useTheme();

    const onClickSelected = (props) => {
        console.log('inside onClickSelected', props)
        setButtonIndex(props);
        setColorSelected(correspondingIndexColors[props]);
    }

    // const CustomDrawer = styled(Drawer)({
    //     '& .MuiDrawer-root': {
    //         transition: {
    //             enter: 2000
    //         },
    //     },
    //     '& .MuiDrawer-paper': {
    //         width: 400
    //     }
    // });
    const themeTitleStyles = { 
        width: '100%', 
        fontSize: 20, 
        lineHeight: 0.8, 
        fontWeight: 500, 
        textAlign: 'left' 
    }
    const subTitleStyles = {
        width:'100%',
        // fontSize: 16,
        textAlign: 'left',
    }

    const CustomRadio = styled(Radio)({
        '&.Mui-checked': {
            color: theme.palette.primary,
        },
    });

    const CustomFormControlLabel = styled(FormControlLabel)({
        '.MuiFormControlLabel-label': {
            color: 'rgba(58, 53, 65, 0.68)',
            fontSize: 15,
        }
    });

    // new theme for switch element
    const customTheme = createTheme({
        components: {
          MuiSwitch: {
            styleOverrides: {
              switchBase: {
                // Controls default (unchecked) color for the thumb
                // color: "red" // -> initial default color
              },
              colorPrimary: {
                "&.Mui-checked": {
                  // Controls checked color for the thumb
                    color: correspondingIndexColors[buttonIndex],
                }
              },
              track: {
                // Controls default (unchecked) color for the track
                opacity: 0.2,
                backgroundColor: "rgb(58, 53, 65, 1)",
                ".Mui-checked.Mui-checked + &": {
                  // Controls checked color for the track
                  opacity: 0.7,
                  backgroundColor: correspondingIndexColors[buttonIndex],
                }
              }
            }
          }
        }
    });

    return(
        <div style={{ position: 'relative', width:'100%', height: '100%' }}>
            <Drawer
                anchor='right'
                open={showDrawer}
                variant='persistent'
                transitionDuration={{ enter: 400 }}
                hideBackdrop
                PaperProps={{
                    sx: { width: 380, padding: 2.5, position: 'absolute' },
                }}
                // unmountOnExit={true}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ marginBottom: 10 }}
                >
                    <div>
                        <Typography 
                            sx={themeTitleStyles} 
                            // color="text.secondary" 
                            gutterBottom
                            variant="h2"
                        >
                            THEME CUSTOMIZER
                        </Typography>
                        <Typography 
                            sx={subTitleStyles} 
                            // color="text.secondary" 
                            gutterBottom
                            variant="h3"
                        >
                            Customize & Preview in Real Time
                        </Typography>
                    </div>
                    <IconButton size='medium' color="secondary" aria-label="add an alarm"
                        // sx={{ color: 'rgb(58, 53, 65, 0.68)' }}
                        onClick={onClose}
                    >
                        <Close />
                    </IconButton>
                </Stack>
                <Divider />

                <div className='theme-container'>
                    <Typography 
                        sx={{
                            ...subTitleStyles, 
                            fontSize: 12, 
                            // color: 'rgba(58, 53, 65, 0.4)'
                        }} 
                        gutterBottom
                        variant="h4"
                    >
                        THEMING
                    </Typography>

                    <FormControl sx={{ marginTop: 2 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label"
                            // sx={{ '&.Mui-focused': { color: 'rgb(58, 53, 65, 0.74)' } }}
                        >
                            Skin
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            {/* <CustomFormControlLabel value="default" control={<CustomRadio />} label="Default" />
                            <CustomFormControlLabel value="bordered" control={<CustomRadio />} label="Bordered" />
                            <CustomFormControlLabel value="semidark" control={<CustomRadio />} label="SemiDark" /> */}
                            <FormControlLabel 
                                value="default" 
                                control={<CustomRadio />} 
                                label="Default" 
                                onChange={() => setType('elevation')}
                            />
                            <FormControlLabel 
                                value="bordered" 
                                control={<CustomRadio />} 
                                label="Bordered" 
                                onChange={() => setType('outlined')}
                            />
                            <FormControlLabel 
                                value="semidark" 
                                control={<CustomRadio />} 
                                label="SemiDark"
                                onChange={() => setType('semidark')} 
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }} component="fieldset">
                        <FormLabel id="demo-row-radio-buttons-group-label" component="legend"
                            // sx={{ '&.Mui-focused': { color: 'rgb(58, 53, 65, 0.74)' } }}
                        >
                            Mode
                        </FormLabel>
                        <FormControlLabel
                            value="Dark"
                            sx={{ marginLeft: 0 }}
                            control={
                                <Switch sx={{ 
                                    color: 'rgb(58, 53, 65, 0.74)',
                                    '&.MuiSwitch-root': {
                                        '& .Mui-checked': {
                                            color: theme.palette.primary,
                                        },
                                    },
                                    }} 
                                    onClick={toggleTheme}
                                />
                            }
                            label="Dark Mode"
                            labelPlacement="start"
                        />
                        {/* <ThemeProvider theme={customTheme}>
                            <FormControlLabel
                                value="start"
                                control={<Switch onClick={toggleTheme}/>}
                                label="Start"
                                labelPlacement="start"
                                sx={{ marginLeft: 0 }}
                            />
                        </ThemeProvider> */}
                    </FormControl>
                    <br />
                    <FormControl fullWidth={true} sx={{ marginTop: 2 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label"
                            sx={{ '&.Mui-focused': { color: 'rgb(58, 53, 65, 0.74)' } }}
                        >
                            Primary color
                        </FormLabel>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            // fullWidth={true}
                            sx={{ marginTop: 1.6 }}
                        >
                            <ToggleWithRightCheck 
                                index={0}
                                showCheck={buttonIndex === 0}
                                backgroundColor='rgb(86, 202, 0)'
                                onClickSelected={onClickSelected}
                            />
                            <ToggleWithRightCheck 
                                index={1}
                                showCheck={buttonIndex === 1}
                                backgroundColor='rgb(145, 85, 253)'
                                onClickSelected={onClickSelected} 
                            />
                            <ToggleWithRightCheck
                                index={2} 
                                showCheck={buttonIndex === 2}
                                backgroundColor='rgb(255, 76, 81)'
                                onClickSelected={onClickSelected} 
                            />
                            <ToggleWithRightCheck
                                index={3}
                                showCheck={buttonIndex === 3}
                                backgroundColor='rgb(255, 180, 0)'
                                onClickSelected={onClickSelected} 
                            />
                            <ToggleWithRightCheck
                                index={4}
                                showCheck={buttonIndex === 4}
                                backgroundColor='rgb(22, 177, 255)'
                                onClickSelected={onClickSelected} 
                            />
                        </Stack>
                    </FormControl>
                </div>

            </Drawer>

            {/* <CustomDrawer
                anchor='right'
                open={showDrawer}
                variant='temporary'
                hideBackdrop
                // transitionDuration={{ enter: 400 }}
            >
            </CustomDrawer> */}
        </div>
    );
}

export default DrawerWithContent;