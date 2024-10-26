import User from "../models/User.js";

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateUserInfo = async (req, res) => {
  const userId = req.user.userId;
  const { fullName } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { fullName }, { new: true }).select("-password");
    res.json({ success: true, message: "User information updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getUserInfo, updateUserInfo }