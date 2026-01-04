// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Registration function
const registerStudent = async (data) => {
  const { fullName, phone, class: studentClass, year, password } = data;

  const existingUser = await prisma.user.findFirst({ where: { phone } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      phone,
      class: studentClass,
      year,
      password: hashedPassword,
      role: "STUDENT",
    },
    select: {
      id: true,
      fullName: true,
      phone: true,
      class: true,
      year: true,
      role: true,
      createdAt: true,
    },
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user, token };
};

// Login function
const login = async (data) => {
  const { phone, password } = data;

  const user = await prisma.user.findFirst({ where: { phone } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const safeUser = {
    id: user.id,
    fullName: user.fullName,
    phone: user.phone,
    class: user.class,
    year: user.year,
    role: user.role,
    createdAt: user.createdAt,
  };

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { safeUser, token };
};

module.exports = { registerStudent, login };
