import React, { useState, useEffect } from "react";
import theme from "./ui/Theme";
import { Typography, ThemeProvider, Grid, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import techSkill from "../assets/tech skill 2.png";
import Grow from '@mui/material/Grow';
import axios from "axios";
import API_BASE_URL from "../config/api";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1B324BDC',
    border: "1px solid rgba(59, 74, 89, 0.2)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

function Skills() {
    const [fadeTriggered, setFadeTriggered] = useState(false);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/skills`)
            .then(res => setSkills(res.data))
            .catch(() => {
                // Fallback hardcoded skills
                setSkills([
                    { _id: '1', name: 'PYTHON', gridSize: 8 },
                    { _id: '2', name: 'C', gridSize: 4 },
                    { _id: '3', name: 'JAVA SCRIPT', gridSize: 6 },
                    { _id: '4', name: 'MONGO DB', gridSize: 6 },
                    { _id: '5', name: 'EXPRESS JS', gridSize: 4 },
                    { _id: '6', name: 'REACT JS', gridSize: 8 },
                    { _id: '7', name: 'HTML & CSS', gridSize: 8 },
                    { _id: '8', name: 'NODE JS', gridSize: 4 },
                    { _id: '9', name: 'SQL', gridSize: 2 },
                    { _id: '10', name: 'GIT', gridSize: 3 },
                    { _id: '11', name: 'API', gridSize: 2 },
                    { _id: '12', name: 'ETHICAL HACKING', gridSize: 5 },
                ]);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => setFadeTriggered(window.scrollY > 600);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Box mt="70px">
                    <Grid container justifyContent="center">
                        <Grow in={fadeTriggered} timeout={3000}>
                            <Grid item xs={12} marginBottom="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <Avatar alt="Tech Skill" src={`${techSkill}`} />
                                <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight='bold'>TECHNICAL SKILLS</Typography>
                            </Grid>
                        </Grow>
                        <Grow in={fadeTriggered} timeout={3500}>
                            <Grid container spacing={2} xs={12} sm={10} lg={5} md={7}>
                                {skills.map((skill) => (
                                    <Grid item xs={skill.gridSize} key={skill._id}>
                                        <Item>{skill.name}</Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grow>
                    </Grid>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default Skills;