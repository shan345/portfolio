import React from 'react';
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
    palette: {

        common:{
            black: "#000000",
            white: "#FFFFFF",
        },

        primary: {
        main: "#004654",
        },

        secondary: {
        main: "#408BD6",
        },

        background:{
            default: "#111418"
        },

        text:{
            primary: "#B0BAC9",
            secondary: "#74AAF1"            
        }
    },
  });

export default theme;
