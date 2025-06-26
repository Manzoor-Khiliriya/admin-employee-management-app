import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../header/Header';
import { createEmployee } from '../../../services/employeeApi';

export default function CreateEmployee() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: null,
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'courses') {
            setEmployeeData((prev) => {
                const updated = checked
                    ? [...prev.courses, value]
                    : prev.courses.filter((c) => c !== value);
                return { ...prev, courses: updated };
            });
        } else {
            setEmployeeData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowed = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowed.exec(file.name)) {
            setError('Please upload a valid image file (.jpg, .jpeg, .png).');
            e.target.value = '';
            return;
        }
        setError(null);
        setEmployeeData((prev) => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(employeeData, token, navigate);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="border rounded shadow-lg bg-light col-10 col-md-5 mx-auto my-5 p-4">
                <h2 className="text-center mb-4">Create Employee</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            name="name"
                            value={employeeData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                            aria-label="Name"
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            name="email"
                            value={employeeData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            aria-label="Email"
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3" htmlFor="mobile">
                            Mobile No
                        </label>
                        <input
                            id="mobile"
                            type="tel"
                            className="form-control"
                            name="mobile"
                            value={employeeData.mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile no"
                            pattern="\d{10}"
                            title="Please enter a 10-digit mobile number."
                            required
                            aria-label="Mobile number"
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3" htmlFor="designation">
                            Designation
                        </label>
                        <select
                            id="designation"
                            name="designation"
                            className="form-select"
                            value={employeeData.designation}
                            onChange={handleChange}
                            required
                            aria-label="Designation"
                        >
                            <option value="" disabled>
                                Select Designation
                            </option>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="sales">Sales</option>
                        </select>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Gender</label>
                        <div>
                            <label className="me-3">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    required
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Courses</label>
                        <div>
                            <label className="me-3">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="MCA"
                                    onChange={handleChange}
                                />
                                MCA
                            </label>
                            <label className="me-3">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="BCA"
                                    onChange={handleChange}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="BSC"
                                    onChange={handleChange}
                                />
                                BSC
                            </label>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3" htmlFor="image">
                            Img Upload
                        </label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            required
                            className="form-control"
                            aria-label="Image upload"
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-success w-100 mb-2">
                        Submit
                    </button>
                    <button className="btn btn-secondary w-100" onClick={() => { navigate('/employees') }}>Back to employees list</button>
                </form>
            </div>
        </div>
    );
}
