const AdminCategory = require('../../models/AdminCategory');
const cloudinary = require('../../middleware/cloudinary');

// Add Category
const addCategory = async (req, res) => {
  const { name, description, status, image } = req.body;

  if (!name || !description || !status || !image) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required including image',
    });
  }

  try {
    // Upload image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(image, {
      folder: 'categories',
    });

    const newCategory = new AdminCategory({
      name,
      description,
      status,
      image: uploaded.secure_url,
    });

    await newCategory.save();
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await AdminCategory.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, image } = req.body;

  try {
    const category = await AdminCategory.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // If image is provided and is a base64 string, upload new image
    if (image && image.startsWith('data:')) {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: 'categories',
      });
      category.image = uploaded.secure_url;
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.status = status || category.status;

    await category.save();
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message,
    });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await AdminCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message,
    });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
