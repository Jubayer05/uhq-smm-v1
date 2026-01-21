// controllers/messageController.js
const Message = require('../../models/Messages');

const createMessage = async (req, res) => {
  const { title, description, audience, users } = req.body;

  if (!title || !description || !audience || !users) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newMessage = new Message({
      title,
      description,
      audience,
      users,
    });

    const saved = await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message created successfully',
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create message',
      error: error.message,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: err.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message', error: err.message });
  }
};
const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { title, description, audience, users } = req.body;

  if (!title || !description || !audience || !users) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    const updated = await Message.findByIdAndUpdate(
      id,
      { title, description, audience, users },
      { new: true } // return the updated document
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({ success: true, message: 'Message updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message', error: err.message });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  deleteMessage,
  updateMessage
};
