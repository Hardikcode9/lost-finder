const User = require("../models/User");
const Item = require("../models/Item");
const Claim = require("../models/Claim");

// ==========================================
// Dashboard Statistics
// GET /api/admin/dashboard
// ==========================================
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalItems = await Item.countDocuments();

    const lostItems = await Item.countDocuments({
      type: "Lost",
    });

    const foundItems = await Item.countDocuments({
      type: "Found",
    });

    const pendingItems = await Item.countDocuments({
      status: "Pending",
    });

    const totalClaims = await Claim.countDocuments();

    const pendingClaims = await Claim.countDocuments({
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalItems,
        lostItems,
        foundItems,
        pendingItems,
        totalClaims,
        pendingClaims,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Users
// GET /api/admin/users
// ==========================================
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Block / Unblock User
// PUT /api/admin/users/:id
// ==========================================
const toggleUserStatus = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.isActive
        ? "User Activated Successfully"
        : "User Blocked Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete User
// DELETE /api/admin/users/:id
// ==========================================
const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Items
// GET /api/admin/items
// ==========================================
const getAllItems = async (req, res) => {
  try {

    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Item
// DELETE /api/admin/items/:id
// ==========================================
const deleteItem = async (req, res) => {
  try {

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getAllItems,
  deleteItem,
};