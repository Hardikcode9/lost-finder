const Claim = require("../models/Claim");
const Item = require("../models/Item");
const Notification = require("../models/Notification");

// ==========================================
// Submit Claim
// POST /api/reports/claim/:itemId
// Private
// ==========================================
const submitClaim = async (req, res) => {
  try {
    const { message } = req.body;

    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check duplicate claim
    const alreadyClaimed = await Claim.findOne({
      user: req.user._id,
      item: item._id,
    });

    if (alreadyClaimed) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a claim.",
      });
    }

    const claim = await Claim.create({
      user: req.user._id,
      item: item._id,
      message,
      proofImage: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get My Claims
// GET /api/reports/my-claims
// Private
// ==========================================
const getMyClaims = async (req, res) => {
  try {

    const claims = await Claim.find({
      user: req.user._id,
    })
      .populate("item")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Cancel Claim
// DELETE /api/reports/:id
// Private
// ==========================================
const cancelClaim = async (req, res) => {
  try {

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claim.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await claim.deleteOne();

    res.status(200).json({
      success: true,
      message: "Claim cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Claims (Admin)
// GET /api/reports
// Private/Admin
// ==========================================
const getAllClaims = async (req, res) => {
  try {

    const claims = await Claim.find()
      .populate("user", "name email")
      .populate("item", "itemName category");

    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Claim Status
// PUT /api/reports/:id
// Private/Admin
// ==========================================
const updateClaimStatus = async (req, res) => {
  try {

    const { status, adminRemark } = req.body;

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    claim.status = status;
    claim.adminRemark = adminRemark || "";

    await claim.save();

    // Update Item Status
    if (status === "Approved") {

      await Item.findByIdAndUpdate(claim.item, {
        status: "Claimed",
      });

    }

    // Notification
    await Notification.create({
      user: claim.user,
      item: claim.item,
      claim: claim._id,
      title: `Claim ${status}`,
      message:
        status === "Approved"
          ? "Congratulations! Your claim has been approved."
          : "Sorry! Your claim has been rejected.",
      type: "Claim",
    });

    res.status(200).json({
      success: true,
      message: "Claim status updated successfully",
      claim,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitClaim,
  getMyClaims,
  cancelClaim,
  getAllClaims,
  updateClaimStatus,
};