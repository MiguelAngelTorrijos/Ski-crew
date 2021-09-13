const { Schema, model } = require("mongoose");

const stationsSchema = new Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  },
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  zone: String,
  description: {
    type: String,
    min: 20,
    max: 350
  },
  dateOpen: {
    type: Date,
    default: Date.now
  },
  dateClose: {
    type: Date,
    default: Date.now
  },
  stationInfo: {
    kmSlopes: Number,
    numberOfslopes: Number,
    snowpark: String,
    mapSlopes: String,
    slopesLevel: {
      blueSlopes: Number,
      greenSlopes: Number,
      redSlopes: Number,
      blackSlopes: Number,
    },
    cote: {
      maxCote: Number,
      minCote: Number
    },
    priceDay: Number,
    capacity: Number
  },
  imgbackground: String,
  Carrousel: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
}, {
  timestamps: true
})

stationsSchema.index({ location: '2dsphere' })

const Stations = model("Stations", stationsSchema);

module.exports = Stations;
