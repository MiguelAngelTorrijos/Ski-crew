const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Nuevo evento',
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    min: 20,
    max: 350
  },
  imageEvent: {
    type: String,
  }
}, {
  timestamps: true
});

const Event = model("Event", eventSchema);

module.exports = Event;
