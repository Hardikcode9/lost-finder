// ============================================
// Admin Middleware
// Allows access only to Admin users
// ============================================

const adminOnly = (req, res, next) => {
  try {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Check role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admin only.",
      });
    }

    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminOnly,
};