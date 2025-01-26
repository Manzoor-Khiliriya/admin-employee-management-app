import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../header/Header';

export default function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [error, setError] = useState();
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: '',
        isActive: true
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });
                const result = await response.json();
                setEmployeeData(result.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
                setError('Failed to fetch employee data.');
            }
        };

        fetchEmployee();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox' && name === 'courses') {
            setEmployeeData(prevData => {
                const updatedCourses = prevData.courses.includes(value)
                    ? prevData.courses.filter(course => course !== value)
                    : [...prevData.courses, value];
                return { ...prevData, courses: updatedCourses };
            });
        } else {
            setEmployeeData({ ...employeeData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(file.name)) {
            setError('Please upload a valid image file (.jpg, .jpeg, .png).');
            e.target.value = '';
            return;
        } 
          
        setEmployeeData({ ...employeeData, image: file });
    
    };

    const toggleActiveStatus = () => {
        setEmployeeData(prevData => ({
            ...prevData,
            isActive: !prevData.isActive
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in employeeData) {
            formData.append(key, employeeData[key]);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.error || "Failed to update employee");
            } else {
                navigate('/employees');
            }
        } catch (error) {
            console.error(error.message);
            setError('Something went wrong while updating the employee.');
        }
    };

    return (
        <div>
            <Header />
            <div className="border rounded shadow-lg bg-light col-10 col-md-5 mx-auto mt-5 p-4">
                <h2 className="text-center mb-4">Employee Edit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={employeeData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={employeeData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Mobile No</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="mobile"
                            value={employeeData.mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile no"
                            required
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Designation</label>
                        <select
                            name="designation"
                            className="form-select"
                            value={employeeData.designation}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Designation</option>
                            <option value="hr">Hr</option>
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
                                    checked={employeeData.gender === "male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={employeeData.gender === "female"}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Course</label>
                        <div>
                            <label className="me-3">
                                MCA <input
                                    type="checkbox"
                                    name="courses"
                                    value="MCA"
                                    checked={employeeData.courses.includes("MCA")}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="me-3">
                                BCA <input
                                    type="checkbox"
                                    name="courses"
                                    value="BCA"
                                    checked={employeeData.courses.includes("BCA")}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                BSC <input
                                    type="checkbox"
                                    name="courses"
                                    value="BSC"
                                    checked={employeeData.courses.includes("BSC")}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    {employeeData.image && (
                        <div className="mb-3">
                            <img
                                src={`http://localhost:5000/${employeeData.image}`}
                                alt="Employee"
                                width="80"
                                height="80"
                                className="mb-2"
                            />
                        </div>
                    )}
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Img Upload</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept=".jpg,.png"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <button type="button" onClick={toggleActiveStatus} className="btn btn-primary me-2">
                            {employeeData.isActive ? "Mark as Inactive" : "Mark as Active"}
                        </button>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-success w-100 mb-2">Submit</button>
                    <button  className="btn btn-secondary w-100" onClick={() => {navigate('/employees')}}>Back to employees list</button>
                </form>
            </div>
        </div>
    );
}
