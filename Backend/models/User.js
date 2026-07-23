const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Full Name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    // College Email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Password
   password: {
  type: String,
  required: true,
  minlength: 6,
  select: false,
},

    // Student ID
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },

    // Phone Number
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      trim: true,
    },

    // Course
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },

    // Profile Image
    profileImage: {
      type: String,
      default: "",
    },

    // User Role
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
  type: String,
  enum: ["student", "admin"],
  default: "student",
},

isActive: {
  type: Boolean,
  default: true,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);