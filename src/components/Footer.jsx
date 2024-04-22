import React from "react"
import {Box, Grid, Typography,ThemeProvider, Button, Divider, fabClasses} from '@mui/material'
import theme from "./ui/Theme";
import {BrowserRouter,Link, Routes, Route} from "react-router-dom"


function Footer() {


  return (
    <React.Fragment>
      <ThemeProvider theme={theme}> 
      
        <Box position="static" mt="80px" pb="10px">
          <Grid container>
            <Grid item xs={12}>
            <Typography variant="body2" color="white" align="center">
              {"❤️ Developed by Shan. "}            
              {new Date().getFullYear() + ""}
              
              </Typography>
            </Grid>
            
          </Grid>
        
        </Box>
      </ThemeProvider>

    </React.Fragment>
  );
}

export default Footer;