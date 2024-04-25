import React from "react";
import theme from "./ui/Theme";
import { AppBar, Typography,ThemeProvider, Link, Icon,Grid,Divider, Toolbar, Button, Avatar, Tabs, Tab, Box, useScrollTrigger, Slide, Container, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import myImg from "../assets/My_Image.jpg";
import certification from "../assets/certif.png";
import education from "../assets/educa.png";
import intern from "../assets/internship-icon.png";
import profile from "../assets/user.png";
import ResumeIco from '@mui/icons-material/Description';





const steps = [
  {
    label: 'EDUCATION',
    description: 'B.E - Computer Science and Engineering,\n Jerusalem College of Engineering.'
  },
  {
    label: 'CERTIFICATIONS',
    description: 'sisisis'
  },
  {
    label: 'ACHIEVEMENTS',
    description: 'jfhjfjwjebfbwkwe'
  }
  ];

function About(){

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  
  return(
    <React.Fragment>
      
      <ThemeProvider theme={theme}> 
        <Box id="about" height="auto" mt="60px">
            <Grid container justifyContent="center" alignItems="center">
                <Grid container item xs={12} lg={5} justifyContent="center" alignItems="center">
                    <Avatar alt="My-Image" position="fixed" src={`${myImg}`} sx={{ width: {xs:"400px",lg:"480px"}, height: {xs:"400px", lg:"480px"}}}/>
                </Grid>

                <Grid container item xs={12} lg={7} justifyContent={{xs: "center", lg:"flex-start"}} mt={{xs:"20px"}}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Avatar alt="profile" src={`${profile}`}></Avatar>
                      <Typography variant="h4" color="text.secondary" fontWeight= 'bold' mr="10px">ABOUT ME</Typography>
                      <Link href="https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing"><ResumeIco fontSize="large" sx={{color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/> </Link>
                    </Box>
                    {isLargeScreen && <Divider color="#B0BAC9"/>}

                    <Grid container pt={{xs:"30px", lg: "50px"}} pl={{lg: "40px"}} display="flex" flexDirection="column" alignItems={{xs:"center", lg:"flex-start"}} textAlign={{xs:"center", lg:"left" }}>
                      <Grid item display="flex" flexDirection="row" alignItems="center" >
                        <Avatar alt="My-Image" src={`${education}`}></Avatar>
                        <Typography color="text.secondary" ml="5px">EDUCATION</Typography>                     
                      </Grid>
                      <Grid item  >
                        <Typography color="text.primary" ml={{lg:"45px"}}>B.E - Computer Science and Engineering.</Typography>
                        <Typography color="text.primary" ml={{lg:"45px"}}>Jerusalem College of Engineering, Chennai.</Typography>                     
                      </Grid>
                    </Grid>
                    
                    <Grid container pt="50px" pl={{lg: "40px"}} display="flex" flexDirection="column" alignItems={{xs:"center", lg:"flex-start"}} textAlign={{xs:"center", lg:"left" }}>
                      <Grid item display="flex" flexDirection="row" alignItems="center" >
                        <Avatar alt="My-Image" src={`${certification}`}></Avatar>
                        <Typography color="text.secondary" ml="5px">CERTIFICATION</Typography>                     
                      </Grid>
                      <Grid item  >
                        <Typography color="text.primary" ml={{lg:"45px"}}>Python Programming - UC-3feb850d-9a67-45d3-af9a-91d7f38651bf</Typography>
                        <Typography color="text.primary" ml={{lg:"45px"}}>Full Stack Web Development (MERN) - UC-49654252-1482-47a6-bd4a-20bf2d1b478a</Typography>                     
                      </Grid>
                    </Grid>

                    <Grid container pt="50px" pl={{lg: "40px"}} display="flex" flexDirection="column" alignItems={{xs:"center", lg:"flex-start"}} textAlign={{xs:"center", lg:"left" }}>
                      <Grid item display="flex" flexDirection="row" alignItems="center" >
                        <Avatar alt="My-Image" src={`${intern}`}></Avatar>
                        <Typography color="text.secondary" ml="5px">INTERNSHIP</Typography>                     
                      </Grid>
                      <Grid item  >
                        <Typography color="text.primary" ml={{lg:"45px"}}>Edify Techno Solutions - Full Stack Web Development (MERN)</Typography>
                        <Typography color="text.primary" ml={{lg:"45px"}}>Duration - 1 month</Typography>                     
                      </Grid>
                    </Grid>



                </Grid>
                
            </Grid>

        </Box>
      </ThemeProvider> 
      
    </React.Fragment>
  );
}

export default About; 