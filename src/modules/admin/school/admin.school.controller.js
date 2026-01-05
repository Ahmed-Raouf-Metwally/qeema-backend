const service = require("./admin.school.service");

const getSchoolProfile = async (req, res, next) => {
    try {
        const school = await service.getSchoolProfile();
        res.status(200).json({ success: true, data: school });
    } catch (error) {
        next(error);
    }
};

const updateSchoolProfile = async (req, res, next) => {
    try {
        const school = await service.updateSchoolProfile(req.body);
        res.status(200).json({ success: true, data: school });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSchoolProfile, updateSchoolProfile };
