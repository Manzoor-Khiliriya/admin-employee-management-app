import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../logo.png';
import { loginUser } from '../../../services/authApi';

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateFields = () => {
        const errors = {};
        if (!loginData.username.trim()) errors.username = 'Username is required.';
        if (!loginData.password) errors.password = 'Password is required.';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setLoading(false);
            return;
        }

        try {
            await loginUser(loginData, navigate);
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <header className="bg-primary-subtle p-3 text-center">
                <NavLink to="/" className="navbar-brand">
                    <img src={logo} alt="Logo" width="60" height="60" />
                </NavLink>
            </header>

            <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="col-11 col-md-6 col-lg-4 bg-white shadow rounded p-4">
                    <h2 className="text-center mb-4">Login</h2>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${fieldErrors.username ? 'is-invalid' : ''}`}
                                id="floatingInput"
                                name="username"
                                value={loginData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                style={{ backgroundColor: 'white' }}
                            />
                            <label htmlFor="floatingUsername">Username</label>
                            {fieldErrors.username && (
                                <div className="invalid-feedback">{fieldErrors.username}</div>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                id="floatingPassword"
                                name="password"
                                className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                            {fieldErrors.password && (
                                <div className="invalid-feedback">{fieldErrors.password}</div>
                            )}
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-3"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-success w-100 mt-2"
                            onClick={() => navigate('/sign-up')}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
