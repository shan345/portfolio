import React, { useEffect, useState } from "react";
import theme from "./ui/Theme";
import {
  Typography,
  ThemeProvider,
  Grid,
  Link,
  Button,
  Box
} from "@mui/material";
import { keyframes } from "@mui/system";
import bg from "../assets/bg.png";
import mobbg from "../assets/bgmob.png";
import Typewriter from "typewriter-effect";
import ResumeIco from "@mui/icons-material/Description";
import axios from "axios";
import API_BASE_URL from "../config/api";

// Arrow animation
const arrowMovement = keyframes`
  0% { opacity: 0; transform: translateY(-10px) rotate(45deg); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(10px) rotate(45deg); }
`;

function Banner() {
  const [hero, setHero] = useState({
    greeting: "Hai there!",
    typewriterStrings: ["I'm Shan", "I'm a Software Engineer"],
    resumeLink: "https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing"
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/hero`)
      .then(res => setHero(res.data))
      .catch(() => { }); // fallback to defaults
  }, []);

  const typing = (typewriter) => {
    let tw = typewriter;
    hero.typewriterStrings.forEach((str, i) => {
      tw = tw.typeString(str).pauseFor(2000).deleteAll();
    });
    tw.start();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: "relative", overflow: "hidden", height: "700px" }}>
        <Box sx={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          clipPath: "polygon(50% 100%, 100% 85%, 100% 0, 0 0, 0 85%)",
          backgroundColor: "#06050956",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
        }}>
          <Box sx={{
            position: "absolute", width: "100%", height: "100%",
            backgroundImage: { xs: `url(${mobbg})`, md: `url(${bg})` },
            backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover", zIndex: -1
          }} />

          <Grid container sx={{
            backgroundColor: "#06050956", borderRadius: "16px", border: "1px solid #A0A0A03D",
            height: { xs: "40%", md: "50%" }, width: { xs: "80%", md: "40%" },
            alignItems: "center", justifyContent: "center", textAlign: "center"
          }}>
            <Grid item xs={12}>
              <Typography sx={{ color: "#EEFF00D2", fontWeight: "bold", fontSize: 50, fontFamily: "Dancing Script" }}>
                {hero.greeting}
              </Typography>

              <Typography sx={{ color: "#DEDEDE", fontWeight: "bold", fontSize: { xs: 35, lg: 50 }, fontFamily: "Segoe UI" }}>
                <Typewriter
                  key={hero.typewriterStrings.join(',')}
                  onInit={typing}
                  options={{ cursor: "/>", loop: true, deleteSpeed: 5 }}
                />
              </Typography>

              {hero.resumeLink && (
                <Link href={hero.resumeLink} target="_blank">
                  <Button variant="contained" color="primary" sx={{ mt: "30px" }} endIcon={<ResumeIco />} size="large">
                    RESUME
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>

          <Box sx={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
            {[0, 1, 2].map((delay, index) => (
              <Box key={index} sx={{
                width: "30px", height: "30px",
                borderBottom: "3px solid white", borderRight: "3px solid white",
                transform: "rotate(45deg)", margin: "10px",
                animation: `${arrowMovement} 3s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }} />
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Banner;