import React from "react"
import Header from "../Header"
import Footer from "../Footer"
import Navbar from "../Navbar"
import Banner from "../Banner"
import About from "../About"
import Skills from "../Skills"
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material"
import Particle from "../Particle";
import Project from "../Project"
import Contact from "../Contact"


function Home() {
    return(
        <React.Fragment>
        <Box id="home">
            
            <Box>
                <Navbar/>
                <Banner/>
                {/* <Particle showParticles={true}/> */}
            </Box>
            <Box id="about"><About/></Box>
            <Box id="tech-skills"><Skills/></Box>
            <Box id="projects"><Project/></Box>
            <Box id="contact"><Contact/></Box>
            <Footer/>
            
        </Box>
        </React.Fragment>
    );
}

export default Home;