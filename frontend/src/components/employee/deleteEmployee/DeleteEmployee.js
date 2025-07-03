import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../header/Header';
import { getEmployeeById, deleteEmployeeById } from '../../../services/employeeApi';

export default function DeleteEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getEmployeeById(id, token);
        setEmployeeData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch employee data.');
      }
    })();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await deleteEmployeeById(id, token);
      setShowConfirm(false);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while deleting.');
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/employees');
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="bg-light border rounded shadow p-4 mx-auto col-12 col-md-6 col-lg-5">
          <h3 className="text-center mb-4 text-danger">Delete Employee</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          {employeeData ? (
            <>
              <p><strong>Name:</strong> {employeeData.name}</p>
              <p><strong>Email:</strong> {employeeData.email}</p>
              <p><strong>Mobile:</strong> {employeeData.mobile}</p>
              <p><strong>Designation:</strong> {employeeData.designation}</p>
              <p><strong>Status:</strong> {employeeData.isActive ? 'Active' : 'Inactive'}</p>

              {employeeData.image && (
                <div className="mb-3">
                  <img
                    src={`http://localhost:5000/${employeeData.image}`}
                    alt="Employee"
                    width="80"
                    height="80"
                    className="rounded"
                  />
                </div>
              )}

              <button
                className="btn btn-danger w-100 mb-2"
                onClick={() => setShowConfirm(true)}
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
            <p className="text-center">Loading employee details...</p>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete employee <strong>{employeeData?.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Deleted</h5>
              </div>
              <div className="modal-body">
                <p>Employee has been successfully deleted.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleClose}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
