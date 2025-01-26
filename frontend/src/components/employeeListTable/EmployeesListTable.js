import React from "react";

const EmployeeTable = ({ employees, deleteEmployee, navigate }) => {

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "short", year: "2-digit" };
        return new Date(dateString).toLocaleDateString("en-GB", options).replace(/ /g, "-");
    };

    return (
        <div className="table-responsive my-3">
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp._id}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000/${emp.image}`}
                                    alt={emp.name}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            </td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.courses.join(', ')}</td>
                            <td>{formatDate(emp.createdDate)}</td>
                            <td>{emp.isActive ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button
                                    className="btn btn-primary m-1"
                                    onClick={() => navigate(`/update-employee/${emp._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger m-1"
                                    onClick={() => navigate(`/delete-employee/${(emp._id)}`)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
