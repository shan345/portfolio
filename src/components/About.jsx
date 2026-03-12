import React, { useState, useEffect } from "react";
import theme from "./ui/Theme";
import { AppBar, Typography, ThemeProvider, Link, Grid, Divider, Toolbar, Button, Avatar, Box, useMediaQuery, Chip, Skeleton } from '@mui/material';
import ResumeIco from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/WorkOutline';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import myImg from "../assets/My_Image.jpg";
import certification from "../assets/certif.png";
import education from "../assets/educa.png";
import profile from "../assets/user.png";
import axios from "axios";
import API_BASE_URL from "../config/api";

function About() {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [fadeTriggered, setFadeTriggered] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hero holds the profile image
  const [hero, setHero] = useState(null);

  const [about, setAbout] = useState({
    education: { degree: 'B.E - Computer Science and Engineering', college: 'Jerusalem College of Engineering, Chennai' },
    certifications: [
      { title: 'Python Programming', certId: 'UC-3feb850d-9a67-45d3-af9a-91d7f38651bf' },
      { title: 'Full Stack Web Development (MERN)', certId: 'UC-49654252-1482-47a6-bd4a-20bf2d1b478a' }
    ],
    experiences: [],
    resumeLink: 'https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing'
  });

  useEffect(() => {
    // Fetch both about details and hero for the profile image
    const p1 = axios.get(`${API_BASE_URL}/api/about`).then(res => setAbout(res.data)).catch(() => {});
    const p2 = axios.get(`${API_BASE_URL}/api/hero`).then(res => setHero(res.data)).catch(() => {});
    Promise.allSettled([p1, p2]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setFadeTriggered(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const employmentColors = {
    'Full-time': '#6366f1',
    'Part-time': '#f59e0b',
    'Internship': '#10b981',
    'Freelance': '#ec4899',
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box id="about" height="auto" mt="60px">
          <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item xs={10} lg={5} display="flex" justifyContent="center">
              <Skeleton variant="circular" sx={{ width: { xs: 300, lg: 480 }, height: { xs: 300, lg: 480 }, bgcolor: 'rgba(255,255,255,0.06)' }} />
            </Grid>
            <Grid item xs={10} lg={7}>
              <Skeleton variant="text" width="40%" height={50} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
              <Skeleton variant="text" width="80%" height={28} sx={{ bgcolor: 'rgba(255,255,255,0.04)', mt: 3 }} />
              <Skeleton variant="text" width="70%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              <Skeleton variant="text" width="40%" height={50} sx={{ bgcolor: 'rgba(255,255,255,0.06)', mt: 4 }} />
              <Skeleton variant="text" width="75%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              <Skeleton variant="text" width="65%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box id="about" height="auto" mt="60px">
          <Grid container justifyContent="center" alignItems="center">
            <Grid container item xs={10} lg={5} justifyContent="center" alignItems="center">
              <Fade in={fadeTriggered} timeout={500}>
                <Avatar
                  alt="My-Image"
                  src={(hero && hero.profileImage) ? hero.profileImage : myImg}
                  sx={{ width: { xs: "300px", lg: "480px" }, height: { xs: "300px", lg: "480px" } }}
                />
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

              {/* Experience */}
              {about.experiences && about.experiences.length > 0 && (
                <Grow in={fadeTriggered} timeout={2000}>
                  <Grid container pt="50px" pl={{ lg: "40px" }} display="flex" flexDirection="column" alignItems={{ xs: "center", lg: "flex-start" }} textAlign={{ xs: "center", lg: "left" }}>
                    <Grid item display="flex" flexDirection="row" alignItems="center" mb="12px">
                      <Avatar sx={{ bgcolor: '#80A8EB', width: 40, height: 40 }}>
                        <WorkIcon sx={{ color: '#252525ff', fontSize: 22 }} />
                      </Avatar>
                      <Typography variant="h6" color="text.secondary" ml="5px">EXPERIENCE</Typography>
                    </Grid>
                    {about.experiences.map((exp, i) => (
                      <Grid item key={i} ml={{ lg: "45px" }} mb="16px" width="100%">
                        <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} alignItems={{ xs: "center", lg: "flex-start" }} gap="8px" mb="4px">
                          <Typography color="text.primary" fontWeight={700} fontSize="1rem">
                            {exp.company}
                          </Typography>
                          {exp.employmentType && (
                            <Chip
                              label={exp.employmentType}
                              size="small"
                              sx={{
                                fontSize: '0.65rem',
                                height: 20,
                                bgcolor: `${employmentColors[exp.employmentType] || '#6366f1'}22`,
                                color: employmentColors[exp.employmentType] || '#6366f1',
                                border: `1px solid ${employmentColors[exp.employmentType] || '#6366f1'}55`,
                              }}
                            />
                          )}
                        </Box>
                        <Typography color="text.secondary" fontSize="0.92rem" fontWeight={500}>
                          {exp.role}
                        </Typography>
                        {(exp.startDate || exp.endDate) && (
                          <Typography color="text.primary" fontSize="0.82rem" sx={{ opacity: 0.7 }}>
                            {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                            {exp.totalDuration ? ` · ${exp.totalDuration}` : ''}
                          </Typography>
                        )}
                        {exp.location && (
                          <Typography color="text.primary" fontSize="0.8rem" sx={{ opacity: 0.6 }}>
                            📍 {exp.location}
                          </Typography>
                        )}
                        {exp.description && (
                          <Typography color="text.primary" fontSize="0.85rem" mt="4px" sx={{ opacity: 0.8 }}>
                            {exp.description}
                          </Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Grow>
              )}

              {/* Certifications */}
              <Grow in={fadeTriggered} timeout={2500}>
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