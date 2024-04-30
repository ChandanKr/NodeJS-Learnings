const mongoose = require("mongoose");

// Schema Creation
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // it will not insert if firstName is not provided
    },
    lastName: {
      type: String,
      required: false, // it will insert anyhow, lastName is provided or not
    },
    email: {
      type: String,
      required: true,
      unique: true, // same entries is not allowed in our database
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model Creation
const User = mongoose.model("user", userSchema);

module.exports = User;
