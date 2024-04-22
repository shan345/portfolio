import React from "react"
import {useState} from "react"
import { AppBar, Typography,ThemeProvider, Grid, Toolbar, Button, Avatar, Tabs, Tab, Box,  Slide } from '@mui/material'
import PropTypes from 'prop-types';
import theme from "./ui/Theme";
import useScrollTrigger from '@mui/material/useScrollTrigger';


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
                <Grid container>
                    <Grid item container xs={12} justifyContent="center">
                        <Tabs value={value} onChange={handleChange}  sx={{}} textColor="#ffffff"  indicatorColor= "secondary">
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
      
      </ThemeProvider> 
      {/* <div sx={{ toolbarMargin: "...theme.mixins.toolbar"}}/> */}
    </React.Fragment>
    );
}

export default Navbar; 