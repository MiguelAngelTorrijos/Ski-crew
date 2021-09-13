const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  photoProfile: {
    type: String,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Stations'
  }],
}, {
  timestamps: true
})

const User = model("User", userSchema);

module.exports = User;



