# 🔐 Two-Factor Authentication (2FA) System

![beyond1](https://github.com/user-attachments/assets/0917836d-f8c6-4e6c-addb-1e8794e9427c)

---

## 📌 Project Overview

This project implements a secure **Two-Factor Authentication (2FA)** system to verify users during registration using **email-based OTPs**.

> Users must verify their identity through a unique code sent via email before completing the signup process.

---

## ✨ Key Features

- 🔐 **Secure Authentication**: OTP-based validation before user access is granted  
- 📧 **Email Verification**: Auto-generated OTPs delivered via **Nodemailer**  
- 🧩 **Frontend–Backend Integration**: Built with **React.js** and **Node.js (Express.js)**  
- ☁️ **MongoDB Atlas**: Cloud-based data storage with encryption and validation  
- 🔑 **OAuth Login**: Supports **Google OAuth** for seamless social login  

---

## 🧱 Components Breakdown

### 👤 User Registration & Authentication
- Users sign up using email  
- OTP (One-Time Password) sent via email  
- Must verify OTP to complete registration  
- Supports login via **Google OAuth**

### 🧠 Backend Development (Node.js + Express.js)
- RESTful API endpoints for registration, verification, and login  
- OTP email sent using **Nodemailer**  
- Uses **bcrypt.js** for password hashing  
- Employs **JWT** for secure, token-based login sessions  
- Auth middleware ensures protected route access

### 🖥️ Frontend Development (React.js)
- Responsive and interactive UI with **React.js**  
- Dynamic form states for signup, OTP verification, and login  
- Uses local state and effects for UX flow  
- Optional dark/light UI mode for enhanced user experience

### 🗂️ Database (MongoDB Atlas)
- Cloud-hosted NoSQL database for storing:
  - User credentials
  - OTPs with expiry timestamps
- Enforces validation schemas and secure practices

### 🛡️ Security Features
- 🔐 Passwords hashed using `bcrypt.js`  
- 🔑 Auth managed via **JWT tokens**  
- 🔐 Middleware to verify tokens before allowing access  
- 🧱 Role-based access *(planned)*

---

## 🚀 Deployment & Hosting

- 🌐 **Frontend & Backend hosted on Vercel**  
- Easily portable to other platforms like:
  - 🔸 Netlify  
  - 🔹 Render  
  - 🔸 Firebase  
  - 🔹 Heroku  

---

## 🔭 Future Enhancements

- 📲 Add **SMS-based OTP verification** using Twilio or Firebase  
- 👥 Implement **multi-user roles** (admin, editor, viewer)  
- 🔁 OTP resend logic and rate limiting  
- 📊 Dashboard for login analytics and usage tracking

---

## 🔗 Live Project

👉 [Live Demo](https://project-beyond.vercel.app)

---

## 🧰 Tech Stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" alt="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" height="40" alt="Express.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" height="40" alt="MongoDB" />
  <img src="https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" width="40" height="40" alt="Vercel" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" alt="HTML" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" alt="CSS" />
</p>

---

## 📚 References

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)  
- [Node.js + Express Docs](https://expressjs.com/)  
- [Nodemailer Guide](https://nodemailer.com/about/)  
- [JWT (JSON Web Tokens)](https://jwt.io/introduction)  
- [bcrypt.js GitHub](https://github.com/kelektiv/node.bcrypt.js)  
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)  
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)  

---

## 🙋‍♂️ About the Developer

**Tushar Sain** — Full-stack developer with a focus on modern security, UI/UX, and scalable backend systems.

- 📧 Email: saintushar148@gmail.com  
- 💼 LinkedIn:www.linkedin.com/in/tushar-sain14
- 💻 GitHub: [github.com/tushar764](https://github.com/tushar764)

---

⭐️ *Star this repo if you find it helpful or use it in your projects!*
