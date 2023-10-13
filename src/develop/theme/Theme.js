import { createTheme } from "@mui/material/styles";
// import { red, orange, yellow, green, lightBlue, grey } from "@mui/material/colors/red";

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
})

export const getPrimaryColor = (selectedColor) => {
  switch(selectedColor){
    case 'green' : return 'rgb(86, 202, 0)';
    case 'purple' : return 'rgb(145, 85, 253)';
    case 'tomato' : return 'rgb(255, 76, 81)';
    case 'orange' : return 'rgb(255, 180, 0)';
    case 'skyblue' : return 'rgb(22, 177, 255)';
    default: return 'rgb(86, 202, 0)';
  }
}

export const getGradientColor = (selectedColor, type) => {
  switch(selectedColor){
    case 'green' : return type === 'light' ? '#c8e6c9' : '#56CA00';
    case 'purple' : return type === 'light' ? '#d1c4e9' : '#9155FD';
    case 'tomato' : return type === 'light' ? '#ffccbc' : '#FF4C51';
    case 'orange' : return type === 'light' ? '#FFE198' : '#FFB400';
    case 'skyblue' : return type === 'light' ? '#A5DFFC' : '#16B1FF';
    default: return type === 'light' ? '#95F74A' : '#56CA00';
  }
}

const getDarkTheme = (selectedColor, type = 'default') => {

  const darkTheme = createTheme({
    // ...baseTheme,
    palette: {
      mode: "dark",
      primary: {
        main: getPrimaryColor(selectedColor),
        light: getGradientColor(selectedColor, 'light')
      },
      secondary: {
        main: "#fafafa"
      },
      background: {
        default: 'rgb(40, 36, 61)',
        paper: 'rgb(40, 36, 76)',
        dark: 'rgba(231, 227, 252, 0.87)',
      },
      text: {
        primary: '#ffffff'
      },
      loaderBackground: {
        main: 'rgba(231, 227, 252, 0.18)',
      }
    },
    typography: {
      fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 14,
      fontFamilySecondary: "'Roboto Condensed', sans-serif",
      h1: {
        color: 'rgba(231, 227, 252, 0.87)',
        // fontSize: '1rem'
      },
      h2: {
        color: 'rgba(231, 227, 252, 0.87)',
        // fontSize: '1rem'
      },
      h3: {
        color: 'rgba(231, 227, 252, 0.68)',
        fontSize: '1rem'
      },
      h4: {
        color: 'rgba(231, 227, 252, 0.68)',
      },
      h5: {
        color: 'rgba(231, 227, 252, 0.68)',
      },
    },
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '.MuiFormControlLabel-label': {
              color: 'rgba(231, 227, 252, 0.68)',
              fontSize: 15,
            }
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: 'rgba(231, 227, 252, 0.87)',
            // '&.MuiFormLabel-root': {
            //   color: 'rgba(231, 227, 252, 0.87);',
            // },
            '&.Mui-focused': {
              color: 'rgba(231, 227, 252, 0.87);',
            }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: 'rgba(231, 227, 252, 0.68)'
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            fontSize: 12,
            color: 'rgba(231, 227, 252, 0.68)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'rgba(231, 227, 252, 0.87)',
            backgroundColor: getPrimaryColor(selectedColor),
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          root: {
            body: getPrimaryColor(selectedColor),
            color: getPrimaryColor(selectedColor),
            backgroundColor: getPrimaryColor(selectedColor),
          }
        }
      },
    }
  });
  
  return darkTheme;
}

const getLightTheme = (selectedColor, type = 'default') => {

  const lightTheme = createTheme({
    // ...baseTheme,
    palette: {
      mode: "light",
      primary: {
        main: getPrimaryColor(selectedColor),
        light: getGradientColor(selectedColor, 'light')
      },
      secondary: {
        main: "#000000"
      },
      background: {
        default: 'rgba(244, 245, 250)',
        paper: '#ffffff',
        dark: 'rgba(58, 53, 65, 0.87)'
      },
      loaderBackground: {
        main: 'rgba(58, 53, 65, 0.50)', //
      }
    },
    gradient: {
      light: getGradientColor(selectedColor, 'light'),
      dark: getGradientColor(selectedColor, 'dark'),
    },
    typography: {
      fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 14,
      fontFamilySecondary: "'Roboto Condensed', sans-serif",
      h1: {
        color: 'rgba(58, 53, 65, 0.87)',
        // fontSize: '1rem'
      },
      h2: {
        color: 'rgba(58, 53, 65, 0.87)',
        fontWeight: 500,
        // fontSize: '1rem'
      },
      h3: {
        color: 'rgba(58, 53, 65, 0.68)',
        fontSize: '1rem'
      },
      h4: {
        color: 'rgba(58, 53, 65, 0.68)',
      },
      h5: {
        color: 'rgba(58, 53, 65, 0.68)',
      },
    },
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '.MuiFormControlLabel-label': {
              color: 'rgba(58, 53, 65, 0.68)',
              fontSize: 15,
            }
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            '&.MuiFormLabel-root': {
              color: 'rgb(58, 53, 65, 0.74)',
            },
            '&.Mui-focused': {
              color: 'rgb(58, 53, 65, 0.74)',
            },
          },
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: 'rgba(58, 53, 65, 0.68)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'teal',
            backgroundColor: 'teal',
            '.MuiMenuItem-root': {
              backgroundColor: 'teal',
              color: 'teal'
            }
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            fontSize: 12,
            color: 'rgba(58, 53, 65, 0.68)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'rgba(58, 53, 65, 0.87)',
            backgroundColor: getPrimaryColor(selectedColor)
          }
        }
      },
      // MuiCircularProgress: {
      //   styleOverrides: {
      //     root: {
      //       color: 'rgba(58, 53, 65, 0.87)',
      //       backgroundColor: getPrimaryColor(selectedColor)
      //     }
      //   }
      // },
      MuiCssBaseline: {
        styleOverrides: {
          root: {
            body: getPrimaryColor(selectedColor),
            color: getPrimaryColor(selectedColor),
            backgroundColor: getPrimaryColor(selectedColor),
          }
        }
      },
    }
  });

  return lightTheme;

}

export { getDarkTheme, getLightTheme }



// const commonPalette = {
//     mode: 'light',
//     primary: {
//       main: orange[500]
//     },
//     secondary: {
//       light: red[500],
//       main: red[700],
//       dark: red[900],
//       contrastText: grey[50]
//     },
//     error: {
//       light: red[400],
//       main: red[500],
//       dark: red[300],
//       contrastText: grey[800]
//     },
//     success: {
//       main: green[500]
//     },
//     warning: {
//       main: yellow[500],
//       contrastText: grey[800]
//     },
//     info: {
//       main: lightBlue[500]
//     },
//     text: {
//       primary: grey[900],
//       secondary: grey[700],
//       disabled: grey[500]
//     },
//     action: {
//       active: red[200],
//       activeOpacity: 1,
//       disabled: grey[700],
//       disabledBackground: grey[200],
//       hover: red[100],
//       hoverOpacity: 0.7,
//       focus: red[600],
//       focusOpacity: 1,
//       selected: red[300],
//       selectedOpacity: 1
//     },
//     background: {
//       default: orange[300],
//       paper: grey[200]
//     },
//     common: {
//       black: grey[900],
//       white: grey[200]
//     },
//     tonalOffset: 0.2
//   };