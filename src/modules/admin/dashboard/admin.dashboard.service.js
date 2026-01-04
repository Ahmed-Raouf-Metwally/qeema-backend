const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getStats = async () => {
    const [students, lessons, favorites] = await Promise.all([
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.lesson.count(),
        prisma.favorite.count(), // bonus
    ]);

    return {
        totalStudents: students,
        totalLessons: lessons,
        totalFavorites: favorites,
    };
};

module.exports = { getStats };
