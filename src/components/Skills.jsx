import React from "react";
import theme from "./ui/Theme";
import { AppBar, Typography,ThemeProvider, Icon,Grid,Divider, Toolbar, Button, Avatar, Tabs, Tab, Box, useScrollTrigger, Slide, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import techSkill from "../assets/tech skill 2.png"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#1B324BDC',
    border: "1px solid rgba(59, 74, 89, 0.2)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));

function About(){
  
  return(
    <React.Fragment>
      
      <ThemeProvider theme={theme}> 
        <Box mt="70px">
        
            <Grid container justifyContent="center">
                <Grid item xs={12} marginBottom="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                    <Avatar alt="Tech Skill"  src={`${techSkill}`}></Avatar>
                    <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight= 'bold'>TECHNICAL SKILLS</Typography>
                </Grid>
                <Grid container spacing={2} xs={10} sm={10} lg={5} md={7}>
                    <Grid item xs={8}>
                        <Item>PYTHON</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>C</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>JAVA SCRIPT</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>MONGO DB</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>EXPRESS JS</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>REACT JS</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>HTML & CSS</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>NODE JS</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>SQL</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>GIT</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>API</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>ETHICAL HACKING</Item>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
      </ThemeProvider> 
      
    </React.Fragment>
  );
}

export default About; 