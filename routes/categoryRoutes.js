const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Get all categories with user selections
router.get('/', authenticateUser, categoryController.getAllCategoriesWithSelections);

// Select categories
router.post('/select', authenticateUser, categoryController.selectCategories);

module.exports = router;
