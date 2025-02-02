import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Navbar from "./Navbar"; // Import Navbar

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const clientId =
    "210272328636-a4p3fqumdj2lp8ls6832eqt2nd47q41g.apps.googleusercontent.com";

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      props.showAlert("Please verify your email before logging in.", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        props.showAlert("Login successful", "success");
        navigate("/setuporganization");
      } else {
        props.showAlert(json.error || "Invalid credentials", "danger");
      }
    } catch (error) {
      props.showAlert("Something went wrong. Please try again.", "danger");
      console.error("Login error:", error);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationCode: verificationCode,
        }),
      });

      const json = await response.json();

      if (json.success) {
        props.showAlert("Email verified successfully. You can now log in.", "success");
        setIsVerified(true); // Mark as verified
      } else {
        props.showAlert("Invalid verification code. Please try again.", "danger");
      }
    } catch (error) {
      props.showAlert("Something went wrong. Please try again.", "danger");
      console.error("Verification error:", error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);
    props.showAlert("Google login successful", "success");
    navigate("/setuporganization");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <Navbar /> {/* Add Navbar here */}
        <h2 className="login-header">
          Login to Continue Beyond Chats,<br />
          But First Verify with Code Sent to Your Email
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="verificationCode" className="form-label">
              Verification Code
            </label>
            <input
              type="text"
              className="form-control"
              value={verificationCode}
              onChange={onVerificationCodeChange}
              required
            />
          </div>

          <button
            type="button"
            className="btn btn-primary verify-btn"
            onClick={handleVerificationSubmit}
            style={{ marginTop: "10px" }}
          >
            Verify Code
          </button>

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={!isVerified} // Disable submit button if not verified
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>

          <div style={{ marginTop: "20px" }}>
            <h3>Or Sign In with Google</h3>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => props.showAlert("Google login failed", "danger")}
            />
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
