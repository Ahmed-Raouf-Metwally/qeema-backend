const service = require("./admin.students.service");

// list students
const getStudents = async (req, res, next) => {
    try {
        const result = await service.getStudents(req.query);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// create student
const createStudent = async (req, res, next) => {
    try {
        const student = await service.createStudent(req.body);

        res.status(201).json({
            success: true,
            data: student,
        });
    } catch (err) {
        next(err);
    }
};

// update student
const updateStudent = async (req, res, next) => {
    try {
        const student = await service.updateStudent(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (err) {
        next(err);
    }
};

// delete student
const deleteStudent = async (req, res, next) => {
    try {
        await service.deleteStudent(req.params.id);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};
