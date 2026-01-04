// Dependencies
const profileService = require("./profile.service");

// Get my profile controller
const getMyProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getMyProfile(req.user.userId);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// Update my profile controller
const updateMyProfile = async (req, res, next) => {
  try {
    const updatedProfile = await profileService.updateMyProfile(
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

// Export
module.exports = {
  getMyProfile,
  updateMyProfile,
};
