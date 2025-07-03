const User = require('../models/user');


const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }

}


const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserRoleByUserid = async (userId) => {
    try {
        const userRole = await User.findById(userId).populate('role')
        return userRole;
    } catch (error) {
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUserRoleByUserid,
    createUser
}