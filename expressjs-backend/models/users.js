const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
         trim: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    }
  }
);

module.exports = UserSchema;