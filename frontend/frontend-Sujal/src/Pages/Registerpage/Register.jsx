import React, { useState } from "react";
import { registerUserApi } from "../../Api/Api";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastname = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Validation
  const validate = () => {
    let isValid = true;

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (firstName.trim() === "") {
      setFirstNameError("Firstname is required");
      isValid = false;
    }

    if (lastName.trim() === "") {
      setLastNameError("Lastname is required");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "" || !emailRegex.test(email)) {
      setEmailError("A valid email is required");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  // For button
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const isValid = validate();
    if (!isValid) {
      return;
    }

    // Making API request
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerUserApi(data)
      .then((res) => {
        if (res?.data?.success === false) {
          toast.error(res.data.message);
        } else {
          debugger;
          navigate("/login");
          toast.success(res.data.message);
          // localStorage.setItem("token", res.data.token);
          const convertData = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertData);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm">
        <h1 className="text-center mb-4">Create an Account!</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Firstname
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={handleFirstname}
              type="text"
              className={`form-control ${firstNameError ? "is-invalid" : ""}`}
              placeholder="Enter your firstname"
            />
            {firstNameError && (
              <div className="invalid-feedback">{firstNameError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Lastname
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={handleLastname}
              type="text"
              className={`form-control ${lastNameError ? "is-invalid" : ""}`}
              placeholder="Enter your lastname"
            />
            {lastNameError && (
              <div className="invalid-feedback">{lastNameError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              value={email}
              onChange={handleEmail}
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              placeholder="Enter your email address"
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={handlePassword}
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Enter your password"
            />
            {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              type="password"
              className={`form-control ${
                confirmPasswordError ? "is-invalid" : ""
              }`}
              placeholder="Enter your confirm password"
            />
            {confirmPasswordError && (
              <div className="invalid-feedback">{confirmPasswordError}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
