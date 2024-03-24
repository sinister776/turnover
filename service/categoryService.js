const UserCategory = require('../models/UserCategory');


const getAllCategoriesWithSelections = async (userEmail) => {
  try {
    // Query categories with the specified userEmail
    const categories = await UserCategory.findAll({
      where: { userEmail: userEmail },
    });

    // Extract category names from the retrieved categories
    const categoryNames = categories.map(category => category.category);

    return categoryNames;
  } catch (error) {
    console.error('Error retrieving categories with selections:', error);
    throw new Error('Failed to retrieve categories with selections');
  }
};

const selectCategories = async (userEmail, categories) => {
  try {
    // Delete existing user categories for the specified user
    await UserCategory.destroy({ where: { userEmail } });

    // Create new user category entry for each category
    const userCategoryRecords = categories.map(categoryName => ({
      userEmail,
      category: categoryName
    }));
    await UserCategory.bulkCreate(userCategoryRecords);

    return true; // Indicate success
  } catch (error) {
    console.error('Error selecting categories:', error);
    throw new Error('Failed to select categories');
  }
};




module.exports = { getAllCategoriesWithSelections, selectCategories };
