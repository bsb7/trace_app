import User from "../model/User.js";

export const getAllUsersService = async ({ skip, limit }) => {
  return User.find()
    .select(`username email createdAt`)
    .skip(skip)
    .limit(limit)
    .lean();
};

export const getUserService = async (id) => {
  return User.findById(id).select("username email createdAt").lean();
};

export const createUserService = async (userData) => {
  return User.create(userData);
};

export const updateUserService = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
    runValidators: true,
  })
    .select("username email createdAt updatedAt")
    .lean();
};

export const deleteUserService = (id) => {
  return User.findByIdAndDelete(id);
};
