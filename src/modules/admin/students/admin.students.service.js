const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

// list students
const getStudents = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const where = {
    role: "STUDENT",
    ...(search && {
      fullName: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [students, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        phone: true,
        class: true,
        year: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    students,
  };
};

// create student
const createStudent = async (data) => {
  const { fullName, phone, class: studentClass, year, password } = data;

  if (!fullName || !phone || !password) {
    throw new Error("Missing required fields");
  }

  const exists = await prisma.user.findUnique({ where: { phone } });
  if (exists) {
    throw new Error("Student already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await prisma.user.create({
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
      createdAt: true,
    },
  });

  return student;
};

// update student
const updateStudent = async (id, data) => {
  const student = await prisma.user.findUnique({
    where: { id },
  });

  if (!student || student.role !== "STUDENT") {
    throw new Error("Student not found");
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
  }
  else {
    delete data.password;
  }

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      fullName: true,
      phone: true,
      class: true,
      year: true,
    },
  });

  return updated;
};

// delete student
const deleteStudent = async (id) => {
  const student = await prisma.user.findUnique({
    where: { id },
  });

  if (!student || student.role !== "STUDENT") {
    throw new Error("Student not found");
  }

  await prisma.user.delete({
    where: { id },
  });
};

// export services
module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
