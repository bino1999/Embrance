const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
  if (password.length < 6) throw "Password must be atleast 6 characters long.";

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "User with same email already exits.";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: "User [" + name + "] registered successfully!",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw "Email and Password did not match.";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "User logged in successfully!",
    token,
    userId: user.id
    
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name");
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// userController.js

exports.logout = async (req, res) => {
  try {
   
    const user = await User.findById(req.payload.id);
    if (user) {
      user.token = null;
      await user.save();
    }

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: "Failed to logout" });
  }
};

// userController.js

exports.checkLoginStatus = async (req, res) => {
  try {
    // Retrieve user information from the payload
    const user = await User.findById(req.payload.id);
    if (user) {
      // User is logged in
      res.json({ isLoggedIn: true });
    } else {
      // User is not logged in
      res.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error('Error checking login status:', error);
    res.status(500).json({ message: "Failed to check login status" });
  }
};

