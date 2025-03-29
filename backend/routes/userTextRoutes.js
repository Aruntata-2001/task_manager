const express = require('express');
const router = express.Router();
const { saveText, getUserTexts } = require('../controllers/userTextController');
const auth = require('../middleware/auth');

// Save text
router.post('/save', auth, saveText);

// Get user's texts
router.get('/texts', auth, getUserTexts);

module.exports = router; 