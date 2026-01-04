// Dependencies
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get lessons service
const getLessons = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const where = search
    ? {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }
    : {};

  const [lessons, total] = await Promise.all([
    prisma.lesson.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.lesson.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    lessons,
  };
};

// Export
module.exports = { getLessons };
