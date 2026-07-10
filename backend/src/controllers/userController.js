import User from "../model/User.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // 🔥 Handle known Mongo errors natively
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const err = new Error(`${field} already exists`);
      err.statusCode = 400;
      return next(err);
    }
    // 🔥 Unknown errors → global handler
    next(error);
  }
};
export const getAllUsers = async (req, res) => {
  try {
  } catch (error) {}
};
export const getUser = async (req, res) => {
  try {
  } catch (error) {}
};
export const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};
export const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};
