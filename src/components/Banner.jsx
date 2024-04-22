import React from "react";
import theme from "./ui/Theme";
import { AppBar, Typography,ThemeProvider, Grid,Link, Toolbar, Button, Avatar, Tabs, Tab, Box, useScrollTrigger, Slide, Container } from '@mui/material';
import bg from "../assets/bg.png";
import mobbg from "../assets/bgmob.png";
import Typewriter from 'typewriter-effect';
import ResumeIco from '@mui/icons-material/Description';

function Banner(){

  const typing = (typewriter) => {
        typewriter.typeString("<I'm Shan")
        .pauseFor(2500)
        .deleteChars(4)
        typewriter.typeString("a developer")
        .pauseFor(2500)
        .start();
    }

  return(
    <React.Fragment>
      
      <ThemeProvider theme={theme}> 
        <Box sx={{position: "relative", overflow: "hidden", height: "700px"}}>
          <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: "polygon(50% 100%, 100% 85%, 100% 0, 0 0, 0 85%)",
                backgroundColor: "#06050956",
                display: "flex",
                flexDirection: "column",
                alignItems:"center",
                justifyContent: "center"
              }}>
          <Box sx={{position:"absolute", width:"100%", height: "100%", backgroundImage:{xs:`url(${mobbg})`, md:`url(${bg})`}, backgroundColor: "background.default", backgroundAttachment: "fixed",backgroundRepeat: "no-repeat", backgroundSize: "cover", zIndex: -1, }} />
              
              <Grid container sx={{backgroundColor: "#06050956", borderRadius: '16px', border:"1px solid #A0A0A03D", height: "50%", width:{xs:"80%", md:"40%"}, alignItems: "center", justifyContent: "center", textAlign: "center", }}  >

                  <Grid item xs={12} >
                      <Typography sx={{color: "#EEFF00D2", fontWeight: 'bold', fontSize: 50, fontFamily: "Dancing Script"}}>Hai there!</Typography>
                      <Typography sx={{color: "#DEDEDE", fontWeight: 'bold', fontSize: {xs:35, lg:50}, fontFamily: "Segoe UI"}} >
                          <Typewriter onInit={typing}   options={{cursor: "/>", loop: true, deleteSpeed: 5}}/>
                      </Typography>
                      <Link href="https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing"><Button variant="contained" color="primary" sx={{mt: "30px"}} endIcon={<ResumeIco/>} size="large">RESUME</Button></Link> 

                  </Grid>
              </Grid>
          </Box>
        </Box>
      </ThemeProvider> 
      
    </React.Fragment>
  );
}

export default Banner; 