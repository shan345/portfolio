import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import theme from "./ui/Theme";
import { AppBar,ThemeProvider, Icon,Grid,Divider,Link, Toolbar, Button, Tabs, Tab, Box, useScrollTrigger, Slide, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import techSkill from "../assets/skill-development.png"
import simon from "../assets/simon.png"
import ser from "../assets/SER.png"
import portfolio from "../assets/portfolio.png"
import Grow from '@mui/material/Grow';
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
import calculator from "../assets/calculator.png";
import randomuserapi from "../assets/randomusrapi.png";


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

  const [fadeTriggered, setFadeTriggered] = useState(false);

    
    const handleScroll = () => {
        if (window.scrollY > 900) { 
        setFadeTriggered(true);
        } else {
        setFadeTriggered(false);
        }
    };

    
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
      
      console.log('Web Share API not supported');
      
    }
  };

  const projectsData = [
    {
      title: 'SIMON GAME',
      description:
        'The Simon game is a classic memory and pattern recognition game where players follow sequences of colors and sounds. It challenges players to remember and repeat longer sequences as the game progresses, testing their concentration and cognitive skills.',
      image: simon,
      more: {
        overview: "The Simon game project built with plain HTML and JavaScript is a classic memory game that challenges players to remember and repeat sequences of colors and sounds. The game typically consists of four colored buttons, each corresponding to a unique sound. At the start of each round, the game displays a sequence of colors by lighting up the corresponding buttons and playing their associated sounds. The player must then replicate this sequence by clicking on the buttons in the correct order. If the player succeeds, the game adds another color to the sequence and continues. However, if the player makes a mistake, the game ends, and the player's score is displayed.",
        techstack:"HTML, CSS and Java Script",
        live:"https://shan345.github.io/simon",
        git:"https://github.com/shan345/simon"
          },
      transitionTime: 4000,
    },
    {
      title: 'HUMAN SPEECH EMOTION RECOGNITION',
      description:
        'Human speech emotion recognition is a technology that analyzes vocal cues to detect and classify emotions in spoken language, aiding in understanding and responding to human emotions effectively. It utilizes machine learning algorithms to process audio features and identify emotional states.',
      image: ser,
      more: {
        overview: "The Human Speech Emotion Recognition project integrates cutting-edge technologies to analyze and interpret emotions from speech data. The frontend, developed using React and Material-UI components, provides a user-friendly interface for interacting with the system. Users can upload audio files, which are then processed by Python machine learning modules trained for emotion recognition. The React frontend communicates seamlessly with a Python Flask backend, where the heavy lifting of ML model inference and emotion prediction occurs. This backend architecture ensures efficient handling of audio data, allowing for real-time or batch emotion analysis depending on the user's needs. The project aims to deliver accurate emotion insights, enhancing applications in mental health monitoring, customer sentiment analysis, and interactive user experiences. In terms of functionality, the React frontend offers features such as file upload capabilities, real-time feedback on emotion analysis, and interactive visualizations of emotional insights. Material-UI components are utilized for a cohesive and modern UI design, enhancing user engagement and usability. On the backend, Python ML modules leverage advanced algorithms for speech feature extraction, model training, and emotion classification. Flask enables robust API endpoints for data transmission between the frontend and backend, ensuring secure and efficient communication. Overall, this project amalgamates frontend interactivity, backend processing power, and machine learning capabilities to create a sophisticated system for human speech emotion recognition.",
        techstack: "React (Material UI), Python (Machine Learning Modules), Python (Flask)",
        live:"",
        git:"",
          },
      transitionTime: 4500,
    },
    {
      title: 'PORTFOLIO',
      description:
        'This project showcases my skills and experience in web development, particularly with React.js and Material-UI components. Through this portfolio, I aim to demonstrate my ability to create responsive and visually appealing web applications. Explore the various components and features to get a glimpse of my coding style and design aesthetics.',
      image: portfolio,
      more: {
        overview:"My portfolio website, built with React and Material-UI components, focuses on showcasing my projects and skills in a sleek and interactive manner. The front end is designed for optimal user experience, featuring components like AppBar for navigation, Typography for content display, and Grid for responsive layout management. The use of ThemeProvider ensures consistent styling across the site, enhancing visual appeal and usability. Additionally, interactive elements like icons, Avatars, Buttons, Tabs, and Tab components are integrated to engage visitors effectively. For the backend, I leverage Node.js with Express.js to handle server-side functionalities such as routing, API handling, and managing application logic. This setup allows for efficient communication between the front end and back end, ensuring seamless performance. While not utilizing a database, the backend architecture focuses on serving static content and handling dynamic requests efficiently, providing a robust foundation for the portfolio website's functionality.",
        techstack: "React (Material UI), Node.js (Express.js)",
        live:"https://www.shantechworld.com",
        git:"https://github.com/shan345/portfolio",
      },
      transitionTime: 5000,
    },

    {
      title: 'Calculator',
      description:
        'It is a Simple basic arithmetic Calculator',
      image: calculator,
      more: {
        overview:"The calculator project is designed to provide a user-friendly interface for basic arithmetic operations. The HTML structure includes buttons for numbers 0-9, decimal point, and operations such as addition, subtraction, multiplication, and division. CSS styling is applied to create a clean and modern appearance, with a responsive layout that adapts well to different screen sizes. JavaScript functionality is implemented to handle user input, perform calculations based on the selected operations, and display the results dynamically on the calculator screen. The project aims to offer a practical and interactive tool for performing calculations conveniently within a web browser.",
        techstack: "HTML, CSS and JAVA SCRIPT",
        live:"https://shan345.github.io/calculator/",
        git:"https://github.com/shan345/calculator",
      },
      transitionTime: 5500,
    },

    {
      title: 'RandomUser API',
      description:
        'Random User API with Typescript',
      image: randomuserapi,
      more: {
        overview:"The project integrates React with TypeScript and Material-UI to create a user interface that interacts with the Random User API. The user interface includes components such as cards to display randomly generated user profiles fetched from the API. TypeScript is leveraged to ensure type safety and enhance code readability, making it easier to manage data structures and API responses. Material-UI components are used for styling and layout, providing a polished and responsive design for the user interface. The project aims to showcase integration of modern technologies like React, TypeScript, and Material-UI while utilizing external data from the Random User API to create a dynamic and engaging application.",
        techstack: "React(Material UI, Typescript)",
        live:"https://shan345.github.io/randomuserapi/",
        git:"https://github.com/shan345/randomuserapi",
      },
      transitionTime: 6000,
    }
    
  ];

  return (

    <React.Fragment>
      
    <ThemeProvider theme={theme}> 
      <Box mt="60px">
        <Grid container justifyContent="center">
          <Grow in={fadeTriggered} timeout={3500}>
          <Grid item xs={12} mb="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Avatar alt="Tech Skill"  src={`${techSkill}`}></Avatar>
              <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight= 'bold'>PROJECTS</Typography>
          </Grid>
          </Grow>

              <Grid container spacing={3} xs={12} md={10} lg={8} justifyContent={{xs:"center", md:"flex-start"}}>
                {projectsData.map((project, index) => (
                  <Grid item xs={10} md={4} lg={4} >
                    <Grow in={fadeTriggered} timeout={project.transitionTime}>
                    <Card key={index} sx={{bgcolor:"#1B324BDC"}}>
                      <CardMedia component="img" height="194" src={project.image} alt={project.title} />
                      <CardContent>
                          <Typography color="#ffffff" sx={{ fontWeight: 'bold' }}>{project.title} </Typography>
                          <Typography variant="body1" color="text.primary"> {project.description} </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                          <IconButton aria-label="share" onClick={handleShareClick}>
                              <ShareIcon sx={{ color: "#B0BAC9" }}/>
                          </IconButton>
                          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                              <ExpandMoreIcon sx={{ color: "#B0BAC9" }}/>
                          </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                              <Typography paragraph>OVERVIEW: {project.more.overview}</Typography>
                              <Typography paragraph>TECH STACK: {project.more.techstack} </Typography>
                              <Typography paragraph>LIVE AT: <Link color="inherit" href={project.more.live}> {project.more.live} </Link></Typography>
                              <Typography paragraph>REPOSITORY: <Link color="inherit" href={project.more.git}> {project.more.git} </Link></Typography>
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
 