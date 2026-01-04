const service = require("./admin.dashboard.service");

const getStats = async (req, res, next) => {
    try {
        const stats = await service.getStats();

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getStats };
