const { getUserRoleByUserid } = require("../repositories/user");
const { verifyToken } = require("../utils/jwtHelper");


const verifyTokenHandler = async (req, res, next) => {
    var token = req.header('authorization');
    if (token && token.includes('Bearer')) {
        try {
            const result = await verifyToken(token);
            const userId = result.userId;
            req.userId = userId;
            return next()
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' })
        }

    } else {
        res.status(401).json({ message: 'No token provided' })
    }
}

const verifyRoles = (roles) => {
    return async (req, res, next) => {
        const userId = req.userId;
        const userRoles = await getUserRoleByUserid(userId);

        if (roles.includes(userRoles.role)) {
            return next();
        } else {
            return res.status(401).json({ message: "You don't have permission" });
        }
    };
}

module.exports = {
    verifyTokenHandler,
    verifyRoles
}