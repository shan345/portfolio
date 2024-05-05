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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CircularProgress } from '@mui/material';


const ContactForm = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      await axios.post('https://portfolio-server-ruby.vercel.app/send-email', formData);
      setShowSuccessDialog(true); // Show the success dialog
      setFormData({ name: '', email: '', message: '' }); // Clear form fields
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <React.Fragment>
       <ThemeProvider theme={theme}>
          <Box mt="60px">
            <Grid container justifyContent="center">
              <Grid item xs={12} mb="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                  <Avatar alt="Mail us"  src={`${MailIcon}`}></Avatar>
                  <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight= 'bold'>PING ME</Typography>
              </Grid>
              <Grid item xs={10} md={6}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    label="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0BAC9' }, '&:hover fieldset': { borderColor: '#ffffff' }, '&.Mui-focused fieldset': { borderColor: '#1B324B' }, }, }}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    required
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
                    required
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0BAC9' }, '&:hover fieldset': { borderColor: '#ffffff' }, '&.Mui-focused fieldset': { borderColor: '#1B324B' }, }, }}
                  />
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                      {isSubmitting ? <CircularProgress size={24} color="primary" /> : 'Send'}
                    </Button>
                    <Typography color="text.primary" ml="10px" mr="10px" >or</Typography>
                    <Link href="mailto:jamnishan345@gmail.com"><Button variant="contained" color="primary">
                      Mail Me
                    </Button></Link>
                  </Box>
                </form>
              </Grid>
            </Grid>

            <Grid container justifyContent="center" mt="100px">
              <Grid container item alignItems="center" justifyContent="center" xs={11} md={12}>
                <Link href="https://www.instagram.com/jamnishan/"><InstagramIcon fontSize='large' sx={{color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://github.com/shan345"><GitHubIcon fontSize='large' sx={{ml:{xs:"40px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://www.linkedin.com/in/shan345/"><LinkedInIcon fontSize='large' sx={{ml:{xs:"40px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://www.youtube.com/@shantechworld"><YouTubeIcon fontSize='large' sx={{ml:{xs:"40px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
                <Link href="https://twitter.com/jamnishan"><XIcon fontSize='large' sx={{ml:{xs:"40px", lg:"100px"}, color:"text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff',}}}/></Link>
              </Grid>
            </Grid>

            <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
              <DialogContent>
                <Typography color="primary" variant="h6">Message sent successfully!</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowSuccessDialog(false)} color="primary">Close</Button>
              </DialogActions>
            </Dialog>            

          </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ContactForm;
