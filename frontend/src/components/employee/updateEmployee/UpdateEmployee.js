import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../header/Header';
import { getEmployeeById, updateEmployee } from '../../../services/employeeApi';

export default function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');

    const [error, setError] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: '',
        isActive: true,
    });

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const data = await getEmployeeById(id, token);
                setEmployeeData(data);
            } catch (err) {
                console.error("Failed to fetch employee:", err);
                setError("Failed to fetch employee data.");
            }
        }
        fetchEmployee();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'courses') {
            const updatedCourses = checked
                ? [...employeeData.courses, value]
                : employeeData.courses.filter((course) => course !== value);

            setEmployeeData({ ...employeeData, courses: updatedCourses });
        } else {
            setEmployeeData({ ...employeeData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowed = /\.(jpg|jpeg|png)$/i;

        if (file && !allowed.test(file.name)) {
            setError("Please upload a valid image file (JPG, JPEG, PNG).");
            e.target.value = '';
            return;
        }

        setError(null);
        setEmployeeData({ ...employeeData, image: file });
    };

    const toggleActiveStatus = () => {
        setEmployeeData((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(id, employeeData, token, navigate);
        } catch (err) {
            setError(err.message || "Update failed");
        }
    };

    return (
        <div>
            <Header />
            <div className="container my-5">
                <div className="bg-light shadow rounded p-4 mx-auto col-12 col-md-8 col-lg-6">
                    <h3 className="text-center mb-4">Update Employee</h3>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={employeeData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter full name"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={employeeData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile No</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="mobile"
                                value={employeeData.mobile}
                                onChange={handleChange}
                                pattern="\d{10}"
                                required
                                placeholder="Enter 10-digit mobile number"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Designation</label>
                            <select
                                className="form-select"
                                name="designation"
                                value={employeeData.designation}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Designation</option>
                                <option value="hr">HR</option>
                                <option value="manager">Manager</option>
                                <option value="sales">Sales</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label me-3">Gender</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={employeeData.gender === 'male'}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={employeeData.gender === 'female'}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label">Female</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label d-block">Courses</label>
                            {["MCA", "BCA", "BSC"].map((course) => (
                                <div className="form-check form-check-inline" key={course}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="courses"
                                        value={course}
                                        checked={employeeData.courses.includes(course)}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">{course}</label>
                                </div>
                            ))}
                        </div>

                        {typeof employeeData.image === 'string' && employeeData.image && (
                            <div className="mb-3">
                                <label className="form-label d-block">Current Image</label>
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}/${employeeData.image}`}
                                    alt="Employee"
                                    className="img-thumbnail"
                                    width="80"
                                    height="80"
                                />
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Upload New Image</label>
                            <input
                                type="file"
                                name="image"
                                className="form-control"
                                onChange={handleFileChange}
                                accept=".jpg,.jpeg,.png"
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                type="button"
                                onClick={toggleActiveStatus}
                                className="btn btn-outline-primary"
                            >
                                {employeeData.isActive ? 'Mark as Inactive' : 'Mark as Active'}
                            </button>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <button type="submit" className="btn btn-success w-100 mb-2">
                            Update Employee
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-100"
                            onClick={() => navigate('/employees')}
                        >
                            Back to Employee List
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 