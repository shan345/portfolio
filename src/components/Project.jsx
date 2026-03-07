import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import theme from "./ui/Theme";
import { ThemeProvider, Grid, Link, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import techSkill from "../assets/skill-development.png";
import Grow from '@mui/material/Grow';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest }),
}));

export default function Project() {
  const [expanded, setExpanded] = React.useState({});
  const [fadeTriggered, setFadeTriggered] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(() => { });
  }, []);

  useEffect(() => {
    const handleScroll = () => setFadeTriggered(window.scrollY > 900);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExpandClick = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Shan-Portfolio', text: 'Check out my awesome projects!', url: window.location.href });
      } catch (error) { console.error('Error sharing:', error); }
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box mt="60px">
          <Grid container justifyContent="center">
            <Grow in={fadeTriggered} timeout={3500}>
              <Grid item xs={12} mb="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Avatar alt="Tech Skill" src={`${techSkill}`} />
                <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight='bold'>PROJECTS</Typography>
              </Grid>
            </Grow>
            <Grid container spacing={3} xs={12} md={10} lg={8} justifyContent={{ xs: "center", md: "flex-start" }}>
              {projects.map((project, index) => (
                <Grid item xs={10} md={4} lg={4} key={project._id}>
                  <Grow in={fadeTriggered} timeout={4000 + index * 500}>
                    <Card sx={{ bgcolor: "#1B324BDC" }}>
                      {project.imageUrl && (
                        <CardMedia component="img" height="194" src={project.imageUrl} alt={project.title}
                          onError={e => { e.target.style.display = 'none'; }} />
                      )}
                      <CardContent>
                        <Typography color="#ffffff" sx={{ fontWeight: 'bold' }}>{project.title}</Typography>
                        <Typography variant="body1" color="text.primary">{project.description}</Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="share" onClick={handleShareClick}>
                          <ShareIcon sx={{ color: "#B0BAC9" }} />
                        </IconButton>
                        <ExpandMore expand={expanded[project._id]} onClick={() => handleExpandClick(project._id)}
                          aria-expanded={expanded[project._id]} aria-label="show more">
                          <ExpandMoreIcon sx={{ color: "#B0BAC9" }} />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded[project._id]} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>OVERVIEW: {project.overview}</Typography>
                          <Typography paragraph>TECH STACK: {project.techStack}</Typography>
                          {project.liveUrl && <Typography paragraph>LIVE AT: <Link color="inherit" href={project.liveUrl}>{project.liveUrl}</Link></Typography>}
                          {project.githubUrl && <Typography paragraph>REPOSITORY: <Link color="inherit" href={project.githubUrl}>{project.githubUrl}</Link></Typography>}
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}