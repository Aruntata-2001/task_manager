const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
} = require('../controllers/taskController');

// All routes require authentication
router.use(auth);

// Task routes
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskStatus);

module.exports = router; 