import User from "../model/User.js";

export const createUser = async (req, res) => {
  console.log("hitting post");
  // query the db to find all user instances
  try {
    const users = await User.find({});
    // happe path: send structured predictable production grade response
    res.status(200).json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
