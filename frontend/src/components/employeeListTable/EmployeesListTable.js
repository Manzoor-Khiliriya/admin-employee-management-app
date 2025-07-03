import React from "react";
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const EmployeeTable = ({ employees, navigate }) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };

  return (
    <div className="table-responsive my-4">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>UID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Courses</th>
            <th>Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td className="text-break">{emp._id}</td>
                <td>
                  <img
                    src={`${API_URL}/${emp.image}`}
                    alt={emp.name}
                    width="40"
                    height="40"
                    className="rounded-circle object-fit-cover"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.courses?.join(", ")}</td>
                <td>{formatDate(emp.createdDate)}</td>
                <td>
                  <span className={`badge ${emp.isActive ? "bg-success" : "bg-secondary"}`}>
                    {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-column gap-1">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/update-employee/${emp._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => navigate(`/delete-employee/${emp._id}`)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-muted text-center py-3">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
