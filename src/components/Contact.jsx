import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { Typography, ThemeProvider, Grid, Link, Avatar, Box } from '@mui/material'
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
import API_BASE_URL from '../config/api';

const ContactForm = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [social, setSocial] = useState({
    instagram: 'https://www.instagram.com/jamnishan/',
    github: 'https://github.com/shan345',
    linkedin: 'https://www.linkedin.com/in/shan345/',
    youtube: 'https://www.youtube.com/@shantechworld',
    twitter: 'https://twitter.com/jamnishan'
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/social`).then(res => setSocial(res.data)).catch(() => { });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/contacts`, formData);
      setShowSuccessDialog(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#B0BAC9' },
      '&:hover fieldset': { borderColor: '#ffffff' },
      '&.Mui-focused fieldset': { borderColor: '#1B324B' },
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box mt="60px">
          <Grid container justifyContent="center">
            <Grid item xs={12} mb="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Avatar alt="Mail us" src={`${MailIcon}`} />
              <Typography textAlign="center" variant="h4" color="text.secondary" fontWeight='bold'>PING ME</Typography>
            </Grid>
            <Grid item xs={10} md={6}>
              <form onSubmit={handleSubmit}>
                <TextField name="name" label="Name" required value={formData.name} onChange={handleChange} fullWidth margin="normal" sx={inputSx} />
                <TextField name="email" label="Email" required type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" sx={inputSx} />
                <TextField name="message" label="Message" required multiline rows={4} value={formData.message} onChange={handleChange} fullWidth margin="normal" sx={inputSx} />
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} color="primary" /> : 'Send'}
                  </Button>
                  <Typography color="text.primary" ml="10px" mr="10px">or</Typography>
                  <Link href="mailto:shan345.dev@gmail.com">
                    <Button variant="contained" color="primary">Mail Me</Button>
                  </Link>
                </Box>
              </form>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" mt="100px">
            <Grid container item alignItems="center" justifyContent="center" xs={11} md={12}>
              <Link href={social.instagram}><InstagramIcon fontSize='large' sx={{ color: "text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff' } }} /></Link>
              <Link href={social.github}><GitHubIcon fontSize='large' sx={{ ml: { xs: "40px", lg: "100px" }, color: "text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff' } }} /></Link>
              <Link href={social.linkedin}><LinkedInIcon fontSize='large' sx={{ ml: { xs: "40px", lg: "100px" }, color: "text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff' } }} /></Link>
              <Link href={social.youtube}><YouTubeIcon fontSize='large' sx={{ ml: { xs: "40px", lg: "100px" }, color: "text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff' } }} /></Link>
              <Link href={social.twitter}><XIcon fontSize='large' sx={{ ml: { xs: "40px", lg: "100px" }, color: "text.primary", transition: 'color 0.3s ease-in-out', '&:hover': { color: '#ffffff' } }} /></Link>
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
