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
export const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = req.pagination;

    const users = await User.find()
      .select("username email createAt")
      .skip()
      .limit()
      .lean();

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
    const user = await User.findById(id)
      .select("username email createdAt")
      .lean();
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
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .select("username email createdAt")
      .lean();
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

    const deletedUser = await User.findByIdAndDelete(id);

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
