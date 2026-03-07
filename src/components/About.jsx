import React, { useState, useEffect } from "react";
import theme from "./ui/Theme";
import { AppBar, Typography, ThemeProvider, Link, Grid, Divider, Toolbar, Button, Avatar, Box, useMediaQuery } from '@mui/material';
import ResumeIco from '@mui/icons-material/Description';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import myImg from "../assets/My_Image.jpg";
import certification from "../assets/certif.png";
import education from "../assets/educa.png";
import intern from "../assets/internship-icon.png";
import profile from "../assets/user.png";
import axios from "axios";
import API_BASE_URL from "../config/api";

function About() {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [fadeTriggered, setFadeTriggered] = useState(false);
  const [about, setAbout] = useState({
    education: { degree: 'B.E - Computer Science and Engineering', college: 'Jerusalem College of Engineering, Chennai' },
    certifications: [
      { title: 'Python Programming', certId: 'UC-3feb850d-9a67-45d3-af9a-91d7f38651bf' },
      { title: 'Full Stack Web Development (MERN)', certId: 'UC-49654252-1482-47a6-bd4a-20bf2d1b478a' }
    ],
    internship: { company: 'Edify Techno Solutions', role: 'Full Stack Web Development (MERN)', duration: '1 month' },
    resumeLink: 'https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing'
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/about`).then(res => setAbout(res.data)).catch(() => { });
  }, []);

  useEffect(() => {
    const handleScroll = () => setFadeTriggered(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box id="about" height="auto" mt="60px">
          <Grid container justifyContent="center" alignItems="center">
            <Grid container item xs={10} lg={5} justifyContent="center" alignItems="center">
              <Fade in={fadeTriggered} timeout={500}>
                <Avatar alt="My-Image" src={`${myImg}`} sx={{ width: { xs: "300px", lg: "480px" }, height: { xs: "300px", lg: "480px" } }} />
              </Fade>
            </Grid>
            <Grid container item xs={10} lg={7} justifyContent={{ xs: "center", lg: "flex-start" }} mt={{ xs: "20px" }}>
              <Grow in={fadeTriggered} timeout={1000}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Avatar alt="profile" src={`${profile}`} />
                  <Typography variant="h4" color="text.secondary" fontWeight='bold' mr="10px">ABOUT ME</Typography>
                  {about.resumeLink && (
                    <Link href={about.resumeLink} target="_blank">
                      <ResumeIco fontSize="large" sx={{ color: "text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff' } }} />
                    </Link>
                  )}
                </Box>
              </Grow>

              {isLargeScreen && <Divider color="#B0BAC9" />}

              {/* Internship
              <Grow in={fadeTriggered} timeout={2500}>
                <Grid container pt="50px" pl={{ lg: "40px" }} display="flex" flexDirection="column" alignItems={{ xs: "center", lg: "flex-start" }} textAlign={{ xs: "center", lg: "left" }}>
                  <Grid item display="flex" flexDirection="row" alignItems="center">
                    <Avatar alt="Internship" src={`${intern}`} />
                    <Typography variant="h6" color="text.secondary" ml="5px">EXPERIENCE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="text.primary" ml={{ lg: "45px" }}>{about.internship?.company} - {about.internship?.role}</Typography>
                    <Typography color="text.primary" ml={{ lg: "45px" }}>Duration - {about.internship?.duration}</Typography>
                  </Grid>
                </Grid>
              </Grow> */}

              {/* Education */}
              <Grow in={fadeTriggered} timeout={1500}>
                <Grid container pt={{ xs: "30px", lg: "50px" }} pl={{ lg: "40px" }} display="flex" flexDirection="column" alignItems={{ xs: "center", lg: "flex-start" }} textAlign={{ xs: "center", lg: "left" }}>
                  <Grid item display="flex" flexDirection="row" alignItems="center">
                    <Avatar alt="Education" src={`${education}`} />
                    <Typography variant="h6" color="text.secondary" ml="5px">EDUCATION</Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="text.primary" ml={{ lg: "45px" }}>{about.education?.degree}.</Typography>
                    <Typography color="text.primary" ml={{ lg: "45px" }}>{about.education?.college}.</Typography>
                  </Grid>
                </Grid>
              </Grow>

              {/* Certifications */}
              <Grow in={fadeTriggered} timeout={2000}>
                <Grid container pt="50px" pl={{ lg: "40px" }} display="flex" flexDirection="column" alignItems={{ xs: "center", lg: "flex-start" }} textAlign={{ xs: "center", lg: "left" }}>
                  <Grid item display="flex" flexDirection="row" alignItems="center">
                    <Avatar alt="Certification" src={`${certification}`} />
                    <Typography variant="h6" color="text.secondary" ml="5px">CERTIFICATION</Typography>
                  </Grid>
                  <Grid item>
                    {about.certifications?.map((cert, i) => (
                      <Typography key={i} color="text.primary" ml={{ lg: "45px" }}>
                        {cert.title}{cert.certId ? ` - ${cert.certId}` : ''}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Grow>

            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default About;