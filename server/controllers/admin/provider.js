const Provider = require('../../models/Provider');

// @desc    Add a new provider
// @route   POST /api/providers
// @access  Public or Protected (based on your app)
const addProvider = async (req, res) => {
  try {
    const { name, apiurl, apikey, balance, syncservices, status } = req.body;

    // Basic validation
    if (!name || !apiurl || !apikey || balance === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const newProvider = new Provider({
      name,
      apiurl,
      apikey,
      balance,
      syncservices,
      status
    });

    const savedProvider = await newProvider.save();

    res.status(201).json({ success: true, data: savedProvider });
  } catch (error) {
    console.error('Error adding provider:', error.message);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, data: providers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch providers', error: error.message });
  }


};

// PUT /api/admin/updateProviderStatus/:id
const updateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Provider.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    res.status(200).json({ success: true, message: 'Status updated successfully', provider: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};




module.exports = {
  addProvider,
  getAllProviders,
  updateProviderStatus
};
