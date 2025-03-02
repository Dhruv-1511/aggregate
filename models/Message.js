const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: String,
  from: Object,
  socketid: String,
  time: String,
  date: String,
  to: Object
})

const Message = mongoose.model('aggregate_Message', MessageSchema);

module.exports = Message
