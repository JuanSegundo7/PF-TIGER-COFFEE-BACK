const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  { 
    user: {type: String, required: true, ref: "User"},
    content: {type: String, required: true},
  },
  {versionKey: false}
  );

const Comment = mongoose.model("Comment",CommentSchema) 

module.exports = Comment;