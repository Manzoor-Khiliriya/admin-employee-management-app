const employeesRepositories = require('../repositories/employees');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { getPaginationParams } = require('../utils/pagination');


const getAllEmployees = asyncHandler(async (req, res, next) => {
    const { limit, offset, page } = getPaginationParams(req.query, 5);
    const { employees, totalCount } = await employeesRepositories.getAllEmployees({ offset, limit });
    if (!employees || employees.length === 0) {
        return res.status(204).send();
    }
    res.status(200).json({ success: true, data: employees, pagination: { currentPage: page, pageSize: limit, totalCount } });
})

const getEmployeeById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const employee = await employeesRepositories.getEmployeeById(id);
    if (!employee) {
        return next(new ErrorResponse('Employee not found', 404));
    }
    res.status(200).json({ success: true, data: employee });
})

const createEmployee = asyncHandler(async (req, res, next) => {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const imagePath = req.file ? req.file.path : '';

    if (!name || !email || !mobile || !designation || !gender || !courses) {
        return next(new ErrorResponse('All fields are required', 400));
    }

    const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    if (!isValidEmail(email)) {
        return next(new ErrorResponse('Please provide a valid email address.'
        ));
    }

    const existingEmployee = await employeesRepositories.getEmployeeByEmail(email);
    if (existingEmployee) {
        return next(new ErrorResponse('Email already in use', 400));
    }

    const mobileRegex = /^[0-9]+$/;
    if (!mobileRegex.test(mobile) || mobile.length < 10 || mobile.length > 15) {
        return next(new ErrorResponse('Mobile number must be numeric and 10-15 digits long', 400));
    }


    const coursesArray = Array.isArray(courses) ? courses : courses.split(',').map(course => course.trim());


    const employeeData = {
        image: imagePath,
        name,
        email,
        mobile,
        designation,
        gender,
        courses: coursesArray
    };

    const employee = await employeesRepositories.createEmployee(employeeData);
    res.status(201).json({ success: true, data: employee });
});

const updateEmployee = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    if (!data.name || !data.email || !data.mobile || !data.designation || !data.gender || !data.courses) {
        return next(new ErrorResponse('All fields are required', 400));
    }

    const existingEmployee = await employeesRepositories.getEmployeeById(id);
    if (!existingEmployee) {
        return next(new ErrorResponse('Employee not found', 404));
    }

    const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    if (!isValidEmail(data.email)) {
        return next(new ErrorResponse('Please provide a valid email address.'
        ));
    }


    if (data.email !== existingEmployee.email) {
        const existingEmployeeByEmail = await employeesRepositories.getEmployeeByEmail(data.email);
        if (existingEmployeeByEmail) {
            return next(new ErrorResponse('Email already in use', 400));
        }
    }


    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(data.mobile)) {
        return next(new ErrorResponse('Mobile number must be numeric and 10-15 digits long', 400));
    }

    if (req.file) {
        data.image = req.file.path;
    } else {
        data.image = existingEmployee.image;
    }

    const updatedCourses = Array.isArray(data.courses) ? data.courses : data.courses.split(',').map(course => course.trim());

    await employeesRepositories.updateEmployee(id, { ...data, courses: updatedCourses });

    const updatedData = await employeesRepositories.getEmployeeById(id);
    res.status(200).json({ success: true, data: updatedData });
});

const deleteEmployee = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existingEmployee = await employeesRepositories.getEmployeeById(id);
    if (!existingEmployee) {
        return next(new ErrorResponse('Employee not found', 404));
    }

    await employeesRepositories.deleteEmployee(id);
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
});


module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}