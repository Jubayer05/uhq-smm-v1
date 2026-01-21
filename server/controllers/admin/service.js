const AdminService = require('../../models/admin/AdminService');

// @desc Add a new service
// @route POST /api/vendor/addService
// @access Admin only
const addService = async (req, res) => {
  const { name, amount, min, max, type, status, categoryId } = req.body;

  try {
    if (!name || !amount || !min || !max || !type || !categoryId) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const newService = new AdminService({
      name,
      amount,
      min,
      max,
      type,
      status: status || 'active',
      categoryId
    });

    await newService.save();
    res.status(201).json({
      success: true,
      message: 'Service added successfully',
      service: newService,
    });
  } catch (error) {
    console.error('Error adding service:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc Get all services
// @route GET /api/vendor/getAllServices
// @access Admin only
const getAllServices = async (req, res) => {
  try {
    const services = await AdminService.find().populate('categoryId', 'name description');
    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services', error: error.message });
  }
};

// @desc Update service by ID
// @route PUT /api/vendor/updateService/:id
// @access Admin only
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, amount, min, max, type, status } = req.body;

  try {
    const service = await AdminService.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    service.name = name || service.name;
    service.amount = amount || service.amount;
    service.min = min || service.min;
    service.max = max || service.max;
    service.type = type || service.type;
    service.status = status || service.status;

    await service.save();
    res.status(200).json({ success: true, message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating service', error: error.message });
  }
};

// @desc Delete service by ID
// @route DELETE /api/vendor/deleteService/:id
// @access Admin only
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await AdminService.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting service', error: error.message });
  }
};

// @desc Get services by category
// @route GET /api/vendor/getServiceByCategory?category=categoryId
// @access Admin only
const getServicesByCategory = async (req, res) => {
  const categoryId = req.query.category;

  if (!categoryId) {
    return res.status(400).json({ success: false, message: 'Category ID is required' });
  }

  try {
    const services = await AdminService.find({ categoryId }).populate('categoryId', 'name');
    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services by category',
      error: error.message,
    });
  }
};

const getPopularServices = async (req, res) => {
  try {
    const services = await AdminService.find({ status: 'active' })
      .sort({ soldCount: -1 }) // most sold first
      .limit(20); // or whatever limit you want

    res.status(200).json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  addService,
  getAllServices,
  getServicesByCategory,
  updateService,
  getPopularServices,
  deleteService,
};
