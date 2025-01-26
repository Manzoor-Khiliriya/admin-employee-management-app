import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../logo.png';
import { API_URL } from '../../../utils/config';

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
        setFieldErrors({ ...fieldErrors, [name]: "" });
    };

    const validateFields = () => {
        const errors = {};
        if (!loginData.username.trim()) {
            errors.username = "Username is required.";
        }
        if (!loginData.password) {
            errors.password = "Password is required.";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/authenticate/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Login failed");
                setLoading(false);
                return;
            }

            localStorage.setItem('token', result.data.token);
            localStorage.setItem('username', result.data.username);
            navigate('/home');
        } catch (error) {
            console.error('Sign in failed', error.message);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const navigateToSignUp = () => {
        navigate('/sign-up');
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
                            />
                            <label htmlFor="floatingInput">Username</label>
                            {fieldErrors.username && (
                                <div className="invalid-feedback">{fieldErrors.username}</div>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                                id="floatingPassword"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPassword">Password</label>
                            {fieldErrors.password && (
                                <div className="invalid-feedback">{fieldErrors.password}</div>
                            )}
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-3"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Sign-Up Button */}
                        <button
                            type="button"
                            className="btn btn-success w-100 mt-2"
                            onClick={navigateToSignUp}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
