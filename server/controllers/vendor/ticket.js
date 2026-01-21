const Ticket = require('../../models/TicketSupport');
const cloudinary = require('../../middleware/cloudinary');
// @desc Add a new ticket
// @route POST /api/vendor/addTicket
// @access Admin only
const addTicket = async (req, res) => {
  const { categoryname, servicename, orderId, image, description } = req.body;
  if (!categoryname || !servicename || !orderId || !image || !description) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }


  try {
     // Upload image to Cloudinary
        const uploaded = await cloudinary.uploader.upload(image, {
          folder: 'categories',
        });
    
    const newTicket = new Ticket({
        user: req.user._id,
      categoryname,
      servicename,
      orderId,
      image: uploaded.secure_url,
      description,
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket added successfully',
      ticket: newTicket,
    });
  } catch (error) {
    console.error('Error adding ticket:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// @desc Get tickets (admin: all, vendor: own)
// @route GET /api/vendor/getTickets
// @access Protected
const getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.isAdmin) {
      // Admin gets all tickets
      tickets = await Ticket.find().populate('user', 'name').sort({ createdAt: -1 });
    } else {
      // Vendor gets only their own tickets
      tickets = await Ticket.find({ user: req.user._id }).populate('user', 'name').sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


module.exports = {addTicket, getTickets}