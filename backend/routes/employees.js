const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employees');
const { verifyTokenHandler, verifyRoles } = require('../middlewares/jwtHandler');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });

router.use(verifyTokenHandler);
router.use(verifyRoles(['admin']));

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', upload.single('image'), createEmployee);
router.put('/:id', upload.single('image'), updateEmployee);
router.delete('/:id', deleteEmployee)


module.exports = router;