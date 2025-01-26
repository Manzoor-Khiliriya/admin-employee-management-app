import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../header/Header';

export default function DeleteEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [employeeData, setEmployeeData] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch employee data');
                }

                const result = await response.json();
                setEmployeeData(result.data);
            } catch (err) {
                console.error(err.message);
                setError('Failed to fetch employee data.');
            }
        };

        fetchEmployee();
    }, [id, token]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete employee "${employeeData?.name}"?`
        );

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (!response.ok) {
                    setError(result.error || 'Failed to delete employee');
                } else {
                    alert('Employee deleted successfully');
                    navigate('/employees');
                }
            } catch (err) {
                console.error(err.message);
                setError('Something went wrong while deleting the employee.');
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="border rounded shadow-lg bg-light col-10 col-md-5 mx-auto mt-5 p-4">
                <h2 className="text-center mb-4">Delete Employee</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {employeeData ? (
                    <>
                        <p><strong>Name:</strong> {employeeData.name}</p>
                        <p><strong>Email:</strong> {employeeData.email}</p>
                        <p><strong>Mobile:</strong> {employeeData.mobile}</p>
                        <p><strong>Designation:</strong> {employeeData.designation}</p>
                        <p><strong>Active:</strong> {employeeData.isActive ? 'Yes' : 'No'}</p>
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
                        <button
                            className="btn btn-danger w-100 mb-2"
                            onClick={handleDelete}
                        >
                            Delete Employee
                        </button>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => navigate('/employees')}
                        >
                            Back to Employees List
                        </button>
                    </>
                ) : (
                    <p>Loading employee details...</p>
                )}
            </div>
        </div>
    );
}
