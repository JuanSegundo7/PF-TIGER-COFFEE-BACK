const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  { _id: {type: String, required: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    favorites: [{type : mongoose.Schema.Types.ObjectId, ref: "Product"}],
    enabled: {type: Boolean, default: true},
    cart: [{
      _id: {type : mongoose.Schema.Types.ObjectId, /* ref: "Product" */},
      quantity: Number
    }],
    admin: {type: Boolean, default: false},
    picture: {type: String, default: ""}
  },
  {versionKey: false}
  );

const User = mongoose.model("User",UserSchema) 

module.exports = User;
