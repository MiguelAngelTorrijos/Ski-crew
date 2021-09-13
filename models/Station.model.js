const { Schema, model } = require("mongoose");
const { Comment } = require("./Comment.model")
const { Event } = require("./Event.model")

const stationsSchema = new Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  },
  location: String,
  description: {
    type: String,
    min: 20,
    max: 350
  },
  dateOpen: String,
  dateClose: String,
  kmSlopes: Number,
  numberOfslopes: Number,
  blueSlopes: Number,
  greenSlopes: Number,
  redSlopes: Number,
  blackSlopes: Number,
  maxCote: Number,
  minCote: Number,
  snowpark: Bolean,
  priceDay: Number,
  imgbackground: String,
  capacity: String,
  imageEvent: {
    type: String
  },
  imgCarrousel: {
    type: String
  },
  mapSlopes: String,
  comments: [Comment],
  events: [Event]
}, {
  timestamps: true
})

const Stations = model("Stations", stationsSchema);

module.exports = Stations;
