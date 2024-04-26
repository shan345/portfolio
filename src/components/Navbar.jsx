import React from "react"
import {useState} from "react"
import { AppBar, Typography,ThemeProvider, Grid, Toolbar, Button, Avatar, Tabs, Tab, Box,  Slide } from '@mui/material'
import PropTypes from 'prop-types';
import theme from "./ui/Theme";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 25, right: 20 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


function Navbar(props){

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    
    return(
    <React.Fragment>
      
      <ThemeProvider theme={theme}> 
      <HideOnScroll {...props}>  
        <AppBar position="fixed" sx={{ backgroundColor:"#15124CAF"}} >
            <Toolbar>
                <Grid container justifyContent="center">
                    <Grid container item xs={12} lg={12} justifyContent="center">
                        <Tabs value={value} onChange={handleChange} textColor="#ffffff"  indicatorColor= "secondary">
                          <Tab label="HOME" onClick={() => scrollToSection("home")}/>
                          <Tab label="ABOUT" onClick={() => scrollToSection("about")}/>
                          <Tab label="SKILLS" onClick={() => scrollToSection("tech-skills")}/>
                          <Tab label="PROJECTS" onClick={() => scrollToSection("projects")}/>
                          <Tab label="CONTACT" onClick={() => scrollToSection("contact")}/>
                        </Tabs> 
                    </Grid>      
                </Grid>       
            </Toolbar>
        </AppBar>
      </HideOnScroll>
      
      <Box id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      
      </ThemeProvider> 
      {/* <div sx={{ toolbarMargin: "...theme.mixins.toolbar"}}/> */}
    </React.Fragment>
    );
}

export default Navbar; 