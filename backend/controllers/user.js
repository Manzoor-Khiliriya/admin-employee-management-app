const usersRepositories = require('../repositories/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { createJwt } = require('../utils/jwtHelper');
const { compareWithHashedPassword, hashPassword } = require('../utils/passwordHelper');


const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new ErrorResponse('All fields are required', 400));
    }

    const existingUser = await usersRepositories.getUserByUsername(username);
    if (existingUser) {
        return next(new ErrorResponse('Username is already in use. Please choose a different one.', 400));
    }

    const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    if (!isValidEmail(email)) {
        return next(new ErrorResponse('Please provide a valid email address.', 400));
    }

    const userByEmail = await usersRepositories.getUserByEmail(email);
    if (userByEmail) {
        return next(new ErrorResponse('Email already registered.', 400));
    }
    
    const isValidPassword = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if (!isValidPassword(password)) {
        return next(new ErrorResponse('Password must be at least 8 characters, include letters, numbers, and a special character.', 400
        ));
    }


    const hashedPassword = await hashPassword(password);

    const newUser = await usersRepositories.createUser({
        username,
        email,
        password: hashedPassword,
    });

    const token = createJwt(newUser._id);

    res.status(201).json({
        success: true,
        data: {
            token,
            username: newUser.username,
        },
    });
});


const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorResponse('Username and password required', 400));
    }

    const user = await usersRepositories.getUserByUsername(username);

    if (!user) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const isMatch = compareWithHashedPassword(password, user.password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const token = createJwt(user._id);
    res.status(200).json({ success: true, data: { token, username } });
})




module.exports = {
    createUser,
    loginUser
}