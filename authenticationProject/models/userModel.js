const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (username, password) {
  //validation
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]+$/;
  if (!username || !password) {
    throw Error("All fields must be filled");
  }
  // Check username length
  if (username.length < 6 || username.length > 12) {
    throw new Error("Username must be between 6 and 12 characters");
  }
  // Check if the username contains only alphanumeric characters
  if (!alphanumericRegex.test(username)) {
    throw new Error("Username must contain only alphanumeric characters");
  }
  // Check password length
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if the password matches the regex pattern
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password may only contain alphabets, numbers, and special characters"
    );
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  //validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
