const express = require("express");

const router = express.Router();

const {
  createItem,
  getAllItems,
  getSingleItem,
  getMyItems,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// =======================================
// Public Routes
// =======================================

// Get All Items
// GET /api/items
router.get("/", getAllItems);

// Get Single Item
// GET /api/items/:id
router.get("/:id", getSingleItem);

// =======================================
// Protected Routes
// =======================================

// Create New Item
// POST /api/items
router.post("/", protect, upload.single("image"), createItem);

// Get Logged-in User's Reports
// GET /api/items/my-items
router.get("/my-items", protect, getMyItems);

// Update Item
// PUT /api/items/:id
router.put("/:id", protect, upload.single("image"), updateItem);

// Delete Item
// DELETE /api/items/:id
router.delete("/:id", protect, deleteItem);

module.exports = router;