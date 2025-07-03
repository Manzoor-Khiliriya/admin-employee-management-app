const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    image: {
        type: String,
        require : true
    },
    name: {
        type: String,
        require : true
    },
    email: {
        type: String,
        require : true
    },
    mobile: {
        type: String,
        require : true
    },
    designation: {
        type: String,
        require : true
    },
    gender: {
        type: String,
        require : true
    },
    courses: {
        type: [String],
        require : true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;