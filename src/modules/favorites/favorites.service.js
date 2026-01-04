const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addToFavorites = async (userId, lessonId) => {
    // check lesson exists
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
    });

    if (!lesson) {
        throw new Error("Lesson not found");
    }

    // check duplicate
    const existing = await prisma.favorite.findUnique({
        where: {
            userId_lessonId: {
                userId,
                lessonId,
            },
        },
    });

    if (existing) {
        throw new Error("Lesson already in favorites");
    }

    return prisma.favorite.create({
        data: {
            userId,
            lessonId,
        },
    });
};

const removeFromFavorites = async (userId, lessonId) => {
    await prisma.favorite.delete({
        where: {
            userId_lessonId: {
                userId,
                lessonId,
            },
        },
    });
};

const getMyFavorites = async (userId) => {
    return prisma.favorite.findMany({
        where: { userId },
        include: {
            lesson: true,
        },
    });
};

module.exports = {
    addToFavorites,
    removeFromFavorites,
    getMyFavorites,
};
