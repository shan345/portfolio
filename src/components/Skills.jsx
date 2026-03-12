import React, { useState, useEffect } from "react";
import theme from "./ui/Theme";
import { Typography, ThemeProvider, Grid, Avatar, Box, Skeleton } from '@mui/material';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/skills`)
            .then(res => { setSkills(res.data); setLoading(false); })
            .catch(() => {
                setLoading(false);
                // Fallback hardcoded skills
                setSkills([
                    // Row 1: Languages
                    { _id: '1', name: 'JavaScript', gridSize: 4 },
                    { _id: '2', name: 'TypeScript', gridSize: 4 },
                    { _id: '3', name: 'Python', gridSize: 4 },
                    // Row 2: Backend
                    { _id: '4', name: 'Node.js', gridSize: 4 },
                    { _id: '5', name: 'Express.js', gridSize: 4 },
                    { _id: '6', name: 'NestJS', gridSize: 4 },
                    // Row 3: Frontend
                    { _id: '7', name: 'React', gridSize: 3 },
                    { _id: '8', name: 'Next.js', gridSize: 3 },
                    { _id: '9', name: 'Redux', gridSize: 3 },
                    { _id: '10', name: 'HTML & CSS', gridSize: 3 },
                    // Row 4: Databases
                    { _id: '11', name: 'MongoDB', gridSize: 4 },
                    { _id: '12', name: 'PostgreSQL', gridSize: 4 },
                    { _id: '13', name: 'Redis', gridSize: 4 },
                    // Row 5: API Protocols
                    { _id: '14', name: 'REST API', gridSize: 3 },
                    { _id: '15', name: 'gRPC', gridSize: 3 },
                    { _id: '16', name: 'GraphQL', gridSize: 3 },
                    { _id: '17', name: 'WebSocket', gridSize: 3 },
                    // Row 6: ORM / API Tools
                    { _id: '18', name: 'Prisma', gridSize: 4 },
                    { _id: '19', name: 'Sequelize', gridSize: 4 },
                    { _id: '20', name: 'Swagger / OpenAPI', gridSize: 4 },
                    // Row 7: More Backend
                    { _id: '21', name: 'Django', gridSize: 4 },
                    { _id: '22', name: 'Flask', gridSize: 4 },
                    { _id: '23', name: 'WordPress', gridSize: 4 },
                    // Row 8: DevOps & Cloud
                    { _id: '24', name: 'Docker', gridSize: 3 },
                    { _id: '25', name: 'AWS', gridSize: 3 },
                    { _id: '26', name: 'DigitalOcean', gridSize: 6 },
                    // Row 9: Tools
                    { _id: '27', name: 'Git', gridSize: 3 },
                    { _id: '28', name: 'Postman', gridSize: 3 },
                    { _id: '29', name: 'Figma', gridSize: 3 },
                    { _id: '30', name: 'Linux', gridSize: 3 },
                    // Row 10: Auth & Integrations
                    { _id: '31', name: 'SSO / OAuth', gridSize: 4 },
                    { _id: '32', name: 'Twilio / MSG91', gridSize: 4 },
                    { _id: '33', name: 'Email Integration', gridSize: 4 },
                    // Row 11: Security
                    { _id: '34', name: 'RBAC & Security', gridSize: 6 },
                    { _id: '35', name: 'Ethical Hacking', gridSize: 6 },
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
                                {loading
                                    ? Array.from({ length: 12 }).map((_, i) => (
                                        <Grid item xs={i % 3 === 0 ? 4 : 4} key={i}>
                                            <Skeleton variant="rounded" height={38} sx={{ bgcolor: 'rgba(255,255,255,0.07)', borderRadius: '6px' }} />
                                        </Grid>
                                    ))
                                    : skills.map((skill) => (
                                        <Grid item xs={skill.gridSize} key={skill._id}>
                                            <Item>{skill.name}</Item>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grow>
                    </Grid>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default Skills;