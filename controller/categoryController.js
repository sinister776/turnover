const categoryService = require('../service/categoryService');

const getAllCategoriesWithSelections = async (req, res) => {

  try {
    const userEmail = req.user.email;
    const categories = await categoryService.getAllCategoriesWithSelections(userEmail);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const selectCategories = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { category } = req.body;
    await categoryService.selectCategories(userEmail, category);
    res.status(200).json({ message: 'Categories selected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { getAllCategoriesWithSelections, selectCategories };
