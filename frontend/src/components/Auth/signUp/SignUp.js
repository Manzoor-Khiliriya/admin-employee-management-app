import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../logo.png";
import { signUpUser } from "../../../services/authApi";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const errors = {};
    if (!signUpData.username.trim()) errors.username = "Username is required.";
    if (!signUpData.email.trim()) errors.email = "Email is required.";
    if (!signUpData.password) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await signUpUser(signUpData, navigate);
    } catch (err) {
      setError(err.message || "Sign-up failed. Please try again.");
    } finally {
      setIsLoading(false);
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
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                className={`form-control ${fieldErrors.username ? 'is-invalid' : ''}`}
                value={signUpData.username}
                onChange={handleChange}
                autoFocus
                required
                aria-invalid={!!fieldErrors.username}
              />
              {fieldErrors.username && (
                <div className="invalid-feedback">{fieldErrors.username}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                value={signUpData.email}
                onChange={handleChange}
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && (
                <div className="invalid-feedback">{fieldErrors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                value={signUpData.password}
                onChange={handleChange}
                required
                aria-describedby="passwordHelp"
                aria-invalid={!!fieldErrors.password}
              />
              <div id="passwordHelp" className="form-text">
                * Minimum 8 characters with letters, numbers & special characters.
              </div>
              {fieldErrors.password && (
                <div className="invalid-feedback">{fieldErrors.password}</div>
              )}
            </div>

            {/* Global error */}
            {error && (
              <div className="alert alert-danger" role="alert" aria-live="assertive">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100 mt-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Navigation Button */}
            <button
              type="button"
              className="btn btn-primary w-100 mt-2"
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Back to Login"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
