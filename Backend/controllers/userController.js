const User = require("../models/User");

// ==========================================
// Get Logged-in User Profile
// GET /api/users/profile
// Private
// ==========================================
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
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
// Update User Profile
// PUT /api/users/profile
// Private
// ==========================================
const updateUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.course = req.body.course || user.course;

    // Email can also be updated
    if (req.body.email) {
      user.email = req.body.email;
    }

    // Student ID can also be updated
    if (req.body.studentId) {
      user.studentId = req.body.studentId;
    }

    // Profile Image
    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        studentId: updatedUser.studentId,
        phone: updatedUser.phone,
        course: updatedUser.course,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};