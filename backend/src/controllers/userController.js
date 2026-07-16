import User from "../model/User.js";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "../services/userService.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);
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
      err.statusCode = 409;
      return next(err);
    }
    // 🔥 Unknown errors → global handler
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = req.pagination;
    const users = await getAllUsersService({ skip, limit });
    res.status(200).json({
      success: true,
      page,
      limit,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserService(id);
    if (!user) {
      const err = new Error(`User not found`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);
    if (!updatedUser) {
      const err = new Error(`User not found`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserService(id);

    if (!deletedUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
