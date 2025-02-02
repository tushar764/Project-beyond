import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Hook to get the current route
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  const isSignupPage = location.pathname === "/signup";
  const isSetupPage = location.pathname === "/setuporganization";

  const handleLogout = () => {
    // Clear the token and redirect to home
    localStorage.removeItem("token");
    window.location.href = "/"; // You can also use navigate("/"); if you're using useNavigate()
  };

  return (
    <header className="navbar">
      <nav className="navbar-nav">
        <Link to="/" className="logo">
          BeyondChats
        </Link>
        <ul>
          {/* Disable links based on the current page */}
          {!isSignupPage && !isSetupPage && !isLoggedIn && (
            <li><Link to="/signup">Get Started</Link></li>
          )}
          {!isSetupPage && !isLoggedIn && (
            <li><Link to="/login">Login</Link></li>
          )}
          {isLoggedIn && isSetupPage && (
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
