import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Navbar from "./Navbar"; // Import Navbar

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Your clientId for Google OAuth
  const clientId = "129918661046-d2clhgd3f911q94n9l3pr10cjf545bpv.apps.googleusercontent.com";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    // Set loading to true to indicate the process is ongoing
    setLoading(true);

    // API URL for your project beyond back end
    const apiUrl = "https://project-beyond-back.vercel.app/api/auth/createuser";

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Store token in localStorage after successful user creation
        localStorage.setItem('token', json.authtoken);
        // Redirect to login page after successful registration
        navigate("/login");
        props.showAlert("Account Created successfully. Please login.", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      props.showAlert("An error occurred. Please try again.", "danger");
    } finally {
      // Set loading to false once the process is complete
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle Google Signup Success
  const handleGoogleSuccess = (response) => {
    console.log("Google signup successful:", response);
    localStorage.setItem('token', response.credential);
    props.showAlert("Google signup successful", "success");
    navigate("/login");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <Navbar /> {/* Add Navbar here */}
        <h1 className="create-account-header">Create an Account For BeyondChats</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onChange} minLength={5} required />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="cpassword" onChange={onChange} minLength={5} required />
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Or Sign Up with Google</h3>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => props.showAlert("Google signup failed", "danger")}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }} disabled={loading}>
            {loading ? "Please wait..." : "Submit"}
          </button>
          <p style={{ marginTop: "15px" }}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>

        {/* Show loading indicator if the form is submitting */}
        {loading && <div className="loading-indicator">Processing your request...</div>}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
