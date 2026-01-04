// Dependencies
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get my profile service
const getMyProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      phone: true,
      class: true,
      year: true,
      role: true,
      createdAt: true,
      profileImage: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Update my profile service
const updateMyProfile = async (userId, data) => {
  const { fullName, class: studentClass, year, phone, profileImage } = data;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
      class: studentClass,
      year,
      phone,
      profileImage,
    },
    select: {
      id: true,
      fullName: true,
      phone: true,
      class: true,
      year: true,
      profileImage: true,
    },
  });

  return updatedUser;
};

// Export
module.exports = {
  getMyProfile,
  updateMyProfile,
};
