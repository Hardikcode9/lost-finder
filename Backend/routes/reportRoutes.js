const express = require("express");

const router = express.Router();

const {
  submitClaim,
  getMyClaims,
  cancelClaim,
  getAllClaims,
  updateClaimStatus,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// ============================================
// Student Routes
// ============================================

// Submit Claim
// POST /api/reports/claim/:itemId
router.post(
  "/claim/:itemId",
  protect,
  upload.single("proofImage"),
  submitClaim
);

// Get Logged-in User Claims
// GET /api/reports/my-claims
router.get("/my-claims", protect, getMyClaims);

// Cancel Claim
// DELETE /api/reports/:id
router.delete("/:id", protect, cancelClaim);

// ============================================
// Admin Routes
// ============================================

// Get All Claims
// GET /api/reports
router.get("/", protect, adminOnly, getAllClaims);

// Approve / Reject Claim
// PUT /api/reports/:id
router.put("/:id", protect, adminOnly, updateClaimStatus);

module.exports = router;