const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Comentario de usuario',
  },
  description: {
    type: String,
    min: 20,
    max: 150
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
