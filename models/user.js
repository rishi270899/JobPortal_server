const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
      trim: true,
    },
    email: {
      type: String,
      Required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      Required: true,
      trim: true,
    },

    phone: {
      type: Number,
      Required: true,
      trim: true,
    },
    role: {
      type: String,
      Required: true,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", Userschema);
module.exports = UserModel;
