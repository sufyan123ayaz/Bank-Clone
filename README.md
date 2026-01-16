# 🏦 Secure Online Banking Website (Educational Cybersecurity Project)

## 📌 Overview
This project is a **secure online banking website clone** built strictly for **educational and cybersecurity demonstration purposes**.  
It simulates core banking functionalities while focusing on **secure web development, common attack scenarios, and their mitigations**.

⚠️ **Disclaimer:**  
This is **NOT a real banking system**. All accounts, balances, and transactions are **dummy and simulated**.

---

## 🎯 Project Objectives
- Demonstrate **secure web application development**
- Implement **real-world cybersecurity practices**
- Understand **authentication, authorization, and fraud detection**
- Simulate how online banking systems handle security threats

---

## 🛠️ Tech Stack

### Backend
- Python (Flask)
- SQLAlchemy (ORM)
- JWT Authentication
- bcrypt (Password Hashing)
- flask-limiter (Rate Limiting)

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Database
- SQLite / PostgreSQL

---

## 🔐 Security Features

### Authentication & Authorization
- Secure user registration and login
- Password hashing using **bcrypt**
- JWT-based authentication
- Role-Based Access Control (User / Admin)
- Session timeout and secure logout
- Account lock after multiple failed login attempts

### Web Application Security
- Input validation and sanitization
- Protection against:
  - SQL Injection
  - Cross-Site Scripting (XSS)
  - CSRF attacks
- Login rate limiting
- Secure session handling

### Transaction Security
- OTP verification for money transfers
- Secure transaction flow (simulation)
- Audit logging for sensitive actions
- IP-based login attempt tracking

### Fraud Detection (Rule-Based)
- Rapid transaction detection
- Large transaction flagging
- Suspicious activity logging

---

## 🏦 Banking Features (Simulation Only)

### User Features
- Secure login and logout
- User dashboard displaying:
  - Dummy account number
  - Fake balance
  - Recent transactions
- Money transfer between users (demo logic)
- OTP verification for transfers
- Transaction history with timestamps

### Admin Features
- Admin dashboard
- View all registered users
- Freeze / unfreeze user accounts
- Monitor audit logs
- Track suspicious activities

---

## 📂 Project Structure

secure-online-banking/
│
├── app.py
├── config.py
├── requirements.txt
├── README.md
│
├── templates/
│ ├── login.html
│ ├── register.html
│ ├── dashboard.html
│ ├── transfer.html
│ └── admin.html
│
├── static/
│ ├── css/
│ └── js/
│
├── models/
│ ├── user.py
│ ├── transaction.py
│ └── audit_logs.py
│
└── database/
└── bank.db

yaml
Copy code

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/secure-online-banking.git
cd secure-online-banking
2️⃣ Install Dependencies
bash
Copy code
pip install -r requirements.txt
3️⃣ Run the Application
bash
Copy code
python app.py
4️⃣ Open in Browser
cpp
Copy code
http://127.0.0.1:5000
🧪 Sample Test Accounts
Role	Email	Password
User	user@test.com	test123
Admin	admin@test.com	admin123

🚨 Attack Scenarios Demonstrated
Brute-force login attempts

Unauthorized admin access

Privilege escalation

Input-based attacks (SQLi, XSS)

Session misuse simulation

📚 Learning Outcomes
Secure authentication implementation

Banking-level access control

Secure transaction handling

Fraud detection logic

Logging and monitoring

Practical cybersecurity concepts

🚀 Future Enhancements
Two-Factor Authentication (2FA)

Email-based OTP delivery

Encrypted database fields

Machine learning fraud detection

Cloud deployment (AWS / Azure)

👨‍💻 Author
Muhammad Sufyan Ayaz & Ahmed Farzan
Bachelor’s in Cybersecurity
Secure Web Application Development Enthusiast

⭐ Final Note
This project is designed to showcase cybersecurity and secure development skills.
Ideal for:

University projects

Cybersecurity portfolios

Technical interviews

yaml
Copy code




**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
