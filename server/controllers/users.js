const bcrypt = require("bcrypt");
const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    throw new Error(error.message);
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("All fields are mandatory");
  }
  try {
    const foundEmailId = await User.findOne({ email });
    if (foundEmailId) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(registeredUser);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  try {
    const findUserInDatabase = await User.findOne({ email: email });
    if (!findUserInDatabase) {
      res.status(404);
      throw new Error("User not found. Register first");
    }
    const passwordMatched = await bcrypt.compare(
      password,
      findUserInDatabase.password
    );
    if (!passwordMatched) {
      return res.status(404).send("Incorrect Password");
    }
    res
      .status(200)
      .json({ message: "User Logged In", user: findUserInDatabase });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "Enter all fields" });
  }
  try {
    const emailFound = await User.findOne({ email: email });
    if (!emailFound) {
      return res.status(404).json({ message: "Email not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

const currentUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User Current" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  currentUser,
  updatePassword,
};
