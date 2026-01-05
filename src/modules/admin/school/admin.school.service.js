const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSchoolProfile = async () => {
    // Assuming single school for now
    return prisma.school.findFirst();
};

const updateSchoolProfile = async (data) => {
    const { name, phone, logo } = data;

    // Check if exists
    const existing = await prisma.school.findFirst();

    if (existing) {
        return prisma.school.update({
            where: { id: existing.id },
            data: { name, phone, logo }
        });
    } else {
        return prisma.school.create({
            data: { name, phone, logo }
        });
    }
};

module.exports = { getSchoolProfile, updateSchoolProfile };
