import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [8, "Username must be at least 8 characters long"],
      maxlength: [15, "Username should not exceed 15 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [15, "Password should not exceed 15 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  // Skip hashing if the password hasn't changed
  if (!this.isModified("password")) return;

  // Generate a unique random salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password and replace the plain text password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
