import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Alert from "./Components/Alert";
import SetupOrganization from "./Components/SetupOrganization";
import { GoogleOAuthProvider } from "@react-oauth/google"; // OAuth Provider
import Home from "./Components/Home";

// Google Client ID
const clientId = "129918661046-d2clhgd3f911q94n9l3pr10cjf545bpv.apps.googleusercontent.com";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 5000); // Clear alert after 5 seconds
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Alert alert={alert} /> {/* Ensure Alert component correctly displays the message */}
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/setuporganization" element={<SetupOrganization showAlert={showAlert} />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
