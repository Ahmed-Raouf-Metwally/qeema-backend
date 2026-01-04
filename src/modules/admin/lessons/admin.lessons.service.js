// Dependencies
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create lesson
const createLesson = async (data) => {
  const { name, description, image, rating } = data;

  // basic validation (server-side)
  if (!name || !description || !image || !rating) {
    throw new Error("All fields are required");
  }

  const lesson = await prisma.lesson.create({
    data: {
      name,
      description,
      image,
      rating: Number(rating),
    },
  });

  return lesson;
};

// Update lesson
const updateLesson = async (id, data) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const updatedLesson = await prisma.lesson.update({
    where: { id },
    data,
  });

  return updatedLesson;
};

// Delete lesson
const deleteLesson = async (id) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  await prisma.lesson.delete({
    where: { id },
  });
};

// Export
module.exports = { createLesson, updateLesson, deleteLesson };