import React  from 'react';
import { Link } from 'react-router-dom';
// import './Homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="navbar">
        <nav className="navbar-nav">
          <Link to="/" className="logo">
            BeyondChats
          </Link>
          <ul>
            <li><Link to="/signup">Get Started</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h1>"Welcome to BeyondChats! You can also use bot for more info

          
        </h1>
        <p>The easiest way to set up a chatbot for your business</p>
        <Link to="/signup" className="cta-btn">Get Started</Link>
      </section>

      <section className="steps">
        <h2>Steps to Get Started</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Register</h3>
            <p>Sign up with your email or continue with Google</p>
          </div>
          <div className="step">
            <h3>2. Setup Organization</h3>
            <p>Enter company details and auto-fetch meta description</p>
          </div>
          <div className="step">
            <h3>3. Chatbot Integration</h3>
            <p>Test and integrate the chatbot on your website</p>
          </div>
        </div>
      </section>

      <section className="chatbot">
        <h2>Need Help? Chat with our Assistant!</h2>
        <div className="chatbot-ui">
          {/* Placeholder for the chatbot UI */}
          <button className="chatbot-btn">Talk to Bot</button>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 BeyondChats | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
