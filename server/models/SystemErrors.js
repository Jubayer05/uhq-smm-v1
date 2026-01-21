const mongoose = require('mongoose');

const systemErrorSchema = new mongoose.Schema({
  id: String,
  type: String,
  source: String,
  message: String,
  affectedApi: String,
  dateTime: String
});

module.exports = mongoose.model('SystemError', systemErrorSchema);
