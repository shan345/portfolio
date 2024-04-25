import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import theme from "./ui/Theme";
import { AppBar,ThemeProvider, Icon,Grid,Divider, Toolbar, Button, Tabs, Tab, Box, useScrollTrigger, Slide, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import techSkill from "../assets/skill-development.png"
import simon from "../assets/simon.png"
import ser from "../assets/SER.png"
import portfolio from "../assets/portfolio.png"


import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Project() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shan-Portfolio',
          text: 'Check out my awesome projects!',
          url: window.location.href,
        });
        console.log('Successfully shared');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Web Share API not supported');
      // You can provide a fallback sharing method here, such as opening a modal with sharing options
    }
  };

  const projectsData = [
    {
      title: 'SIMON GAME',
      description:
        'The Simon game is a classic memory and pattern recognition game where players follow sequences of colors and sounds. It challenges players to remember and repeat longer sequences as the game progresses, testing their concentration and cognitive skills.',
      image: simon,
      more: 'more abt simon',
    },
    {
      title: 'HUMAN SPEECH EMOTION RECOGNITION',
      description:
        'Human speech emotion recognition is a technology that analyzes vocal cues to detect and classify emotions in spoken language, aiding in understanding and responding to human emotions effectively. It utilizes machine learning algorithms to process audio features and identify emotional states.',
      image: ser,
      more: 'more abt SER',
    },
    {
      title: 'PORTFOLIO',
      description:
        'This project showcases my skills and experience in web development, particularly with React.js and Material-UI components. Through this portfolio, I aim to demonstrate my ability to create responsive and visually appealing web applications. Explore the various components and features to get a glimpse of my coding style and design aesthetics.',
      image: portfolio,
      more: 'more abt portfolio',
    },
    
  ];

  return (

    <React.Fragment>
      
    <ThemeProvider theme={theme}> 
      <Box mt="60px">
        <Grid container justifyContent="center">
          <Grid item xs={12} mb="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Avatar alt="Tech Skill"  src={`${techSkill}`}></Avatar>
              <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight= 'bold'>PROJECTS</Typography>
          </Grid>

              <Grid container spacing={3} xs={12} md={10} lg={8} justifyContent="center">
                {projectsData.map((project, index) => (
                  <Grid item xs={10} md={4} lg={4} >
                    <Card key={index} sx={{bgcolor:"#1B324BDC"}}>
                      <CardMedia component="img" height="194" src={project.image} alt={project.title} />
                      <CardContent>
                          <Typography color="#ffffff" sx={{ fontWeight: 'bold' }}>{project.title} </Typography>
                          <Typography variant="body2" color="text.primary"> {project.description} </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                          <IconButton aria-label="share" onClick={handleShareClick}>
                              <ShareIcon />
                          </IconButton>
                          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                              <ExpandMoreIcon />
                          </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                              <Typography paragraph>{project.more}</Typography>
                          </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ))}

              </Grid>
          </Grid>

      </Box>
    </ThemeProvider> 
    
  </React.Fragment>
  );
}
 