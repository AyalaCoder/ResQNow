const User = require("../models/User");


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const createNewUser = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role || role !== "volunteer") {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const newUser = await User.create({ name, phone, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err.message });
  }
};


const getUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.phone = phone;
    user.email = email;
    user.password = password;
    user.role = role;
    user.updatedAt = new Date();

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: `User '${user.name}' ID ${user._id} deleted` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
};
