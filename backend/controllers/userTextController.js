const UserText = require('../models/UserText');

// Save user text
exports.saveText = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id; // This will come from auth middleware

    const userText = new UserText({
      userId,
      text
    });

    await userText.save();
    res.status(201).json({ message: 'Text saved successfully', userText });
  } catch (error) {
    res.status(500).json({ message: 'Error saving text', error: error.message });
  }
};

// Get user's texts
exports.getUserTexts = async (req, res) => {
  try {
    const userId = req.user._id; // This will come from auth middleware
    const texts = await UserText.find({ userId }).sort({ createdAt: -1 });
    res.json(texts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching texts', error: error.message });
  }
}; 