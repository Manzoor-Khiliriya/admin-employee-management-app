import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../logo.png";

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
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!signUpData.username.trim()) {
      errors.username = "Username is required.";
    }
    if (!signUpData.email.trim()) {
      errors.email = "Email is required.";
    }
    if (!signUpData.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({}); 
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/authenticate/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Sign-up failed. Please try again.");
        return;
      }

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      navigate("/home");
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Sign-up failed:", err);
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

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${fieldErrors.username ? 'is-invalid' : ''}`}
                value={signUpData.username}
                onChange={handleChange}
                required
                aria-label="Enter your username"
              />
              {fieldErrors.username && <div className="invalid-feedback">{fieldErrors.username}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                value={signUpData.email}
                onChange={handleChange}
                required
                aria-label="Enter your email"
              />
              {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                value={signUpData.password}
                onChange={handleChange}
                required
                aria-describedby="passwordHelpBlock"
                aria-label="Enter your password"
              />
              <div id="passwordHelpBlock" className="form-text">
              * Password must be at least 8 characters, include letters, numbers, and a special character.
              </div>
              {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
            </div>

            {error && (
              <div className="alert alert-danger mt-3" role="alert" aria-live="assertive">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 mt-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

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
