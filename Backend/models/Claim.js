const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    // User who is claiming the item
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Item being claimed
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    // Proof / Message
    message: {
      type: String,
      required: [true, "Please provide proof of ownership"],
      trim: true,
    },

    // Supporting Image (optional)
    proofImage: {
      type: String,
      default: "",
    },

    // Claim Status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Admin Remarks
    adminRemark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Claim", claimSchema);