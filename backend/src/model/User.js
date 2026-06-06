import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [4, `Username must be atleast 4 character long`],
      maxlength: [10, "Password should not exceed 10 character long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be atleast 8 character long"],
      maxlength: [15, "Password should not exceed 15 character long"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // generate uniqye random salt (10 processing rounds)
    const salt = await bcrypt.genSalt(10);

    // override plain text with secure, non-reversible cryptographic hash
    this.password = await bcrypt.hash(this.password, salt);

    // allow saving to the mongodb to finish saving
    next();
  } catch (error) {
    // safely pass runtime exceptions to express global error handler
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
