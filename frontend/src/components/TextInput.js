import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TextInput = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [savedTexts, setSavedTexts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user || !user._id) {
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      fetchTexts(user._id);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const fetchTexts = async (userId) => {
    try {
      const response = await axios.get('http://localhost:5000/api/text/texts', {
        headers: {
          'user-id': userId
        }
      });
      setSavedTexts(response.data);
    } catch (error) {
      console.error('Error fetching texts:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userStr);
      if (!user || !user._id) {
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/text/save', 
        { text },
        {
          headers: {
            'user-id': user._id
          }
        }
      );
      setMessage(response.data.message);
      setText('');
      fetchTexts(user._id); // Refresh the list
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error saving text');
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Text Input
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Enter your text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!text.trim()}
          >
            Save Text
          </Button>
        </Box>

        {message && (
          <Typography color="primary" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}

        <Typography variant="h6" gutterBottom>
          Saved Texts
        </Typography>
        
        <List>
          {savedTexts.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText 
                primary={item.text}
                secondary={new Date(item.createdAt).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TextInput; 