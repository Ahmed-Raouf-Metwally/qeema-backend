const service = require("./favorites.service");

const addToFavorites = async (req, res, next) => {
    try {
        const fav = await service.addToFavorites(
            req.user.userId,
            req.params.lessonId
        );

        res.status(201).json({
            success: true,
            data: fav,
        });
    } catch (err) {
        next(err);
    }
};

const removeFromFavorites = async (req, res, next) => {
    try {
        await service.removeFromFavorites(
            req.user.userId,
            req.params.lessonId
        );

        res.status(200).json({
            success: true,
            message: "Removed from favorites",
        });
    } catch (err) {
        next(err);
    }
};

const getMyFavorites = async (req, res, next) => {
    try {
        const favorites = await service.getMyFavorites(req.user.userId);

        res.status(200).json({
            success: true,
            data: favorites,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addToFavorites,
    removeFromFavorites,
    getMyFavorites,
};
