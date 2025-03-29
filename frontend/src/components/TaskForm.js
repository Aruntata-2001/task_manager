import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    dueDate: '',
    status: 'pending'
  });
  const [newTag, setNewTag] = useState('');
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping', 'Health', 'Other']);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        console.error('No user found');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          'user-id': user._id
        }
      });

      // Extract unique categories and combine with default categories
      const existingCategories = response.data.map(task => task.category).filter(Boolean);
      const uniqueCategories = [...new Set([...categories, ...existingCategories])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Keep default categories if fetch fails
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            label="Category"
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select a category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <TextField
            fullWidth
            label="Add Tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAddTag}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save Task
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default TaskForm; 