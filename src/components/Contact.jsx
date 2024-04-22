import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { AppBar, Typography,ThemeProvider, Grid, Link, Toolbar, Avatar, Tabs, Tab, Box,  Slide } from '@mui/material'
import theme from "./ui/Theme";
import MailIcon from "../assets/email.png"
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/send-email', formData);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form fields
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <React.Fragment>
       <ThemeProvider theme={theme}>
          <Box display= "flex" flexDirection= "column" justifyContent="center" alignItems="center" mt="60px">

            <Grid container justifyContent="center">
              <Grid item xs={12} mb="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                  <Avatar alt="Mail us"  src={`${MailIcon}`}></Avatar>
                  <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight= 'bold'>MAIL US</Typography>
              </Grid>
              <Grid item xs={10} md={6}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0BAC9' }, '&:hover fieldset': { borderColor: '#ffffff' }, '&.Mui-focused fieldset': { borderColor: '#1B324B' }, }, }}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0BAC9' }, '&:hover fieldset': { borderColor: '#ffffff' }, '&.Mui-focused fieldset': { borderColor: '#1B324B' }, }, }}
                  />
                  <TextField
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0BAC9' }, '&:hover fieldset': { borderColor: '#ffffff' }, '&.Mui-focused fieldset': { borderColor: '#1B324B' }, }, }}
                  />
                  <Box>
                    <Button type="submit" variant="contained" color="primary">
                      Send
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>

            <Grid container justifyContent="center" mt="100px">
              <Grid container item alignItems="center" justifyContent="center" xs={12}>
                <Link href="https://www.instagram.com/jamnishan/"><InstagramIcon fontSize='large' sx={{color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://github.com/shan345"><GitHubIcon fontSize='large' sx={{ml:{xs:"50px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://www.linkedin.com/in/shan345/"><LinkedInIcon fontSize='large' sx={{ml:{xs:"50px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://www.youtube.com/@shantechworld"><YouTubeIcon fontSize='large' sx={{ml:{xs:"50px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://twitter.com/jamnishan"><XIcon fontSize='large' sx={{ml:{xs:"50px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
              </Grid>
            </Grid>

          </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ContactForm;
