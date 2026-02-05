📘 Mini CRM – MERN Stack

A Mini CRM (Customer Relationship Management) web application built using the MERN stack, designed to manage leads, companies, and tasks with JWT-based authentication and assignment-based authorization.

🚀 Features
🔐 Authentication

Login using email & password

Secure JWT-based authentication

Protected routes (frontend + backend)

📊 Dashboard

Total Leads

Qualified Leads

Tasks Due Today

Completed Tasks
(All metrics powered by backend aggregation APIs)

🧾 Leads Management

Create new leads

Edit existing leads

Search & filter by status

Assign leads to users

Associate leads with companies

Soft delete (deleted leads are hidden, not removed)

🏢 Companies

View list of companies

View company details

See all leads associated with a company

✅ Tasks Management

Create tasks for leads

Assign tasks to users

Set due dates

Only the assigned user can update task status

Frontend disables actions for unauthorized users

Backend enforces authorization again (secure by design)

🧠 Authorization Logic (Important)

All users share the same role

Authorization is enforced based on task assignment

Only the assigned user can mark a task as completed

🛠 Tech Stack
Frontend

React (Vite)

Material UI (MUI)

React Router

Axios

Context API (Auth)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt

🔁 Application Flow
UI → API → Controller → Database → Response → UI


Example:

User logs in → JWT generated

Dashboard loads → aggregation API returns stats

User creates task → assigns to another user

Assigned user logs in → can update task status

👤 Demo Users (Seeded)

All users share the same password:

password123

Name	Email
John Doe	john@crm.com

Ravi Kumar	ravi@crm.com

Priya Sharma	priya@crm.com

Amit Verma	amit@crm.com

Sneha Iyer	sneha@crm.com
🏢 Seeded Companies

ABC Technologies – Chennai

NextGen Solutions – Bangalore

BlueWave Corp – Hyderabad

FinSmart Pvt Ltd – Mumbai

HealthPlus Systems – Delhi

🧪 Setup Instructions
Backend
cd backend
npm install
npm run dev


Seed data:

node src/utils/seedUsers.js
node src/utils/seedCompanies.js

Frontend
cd frontend
npm install
npm run dev

🔐 API Security

JWT token is required for all protected routes

Passwords are hashed using bcrypt

Sensitive fields are never exposed in responses

📌 Notes

No signup page (users are pre-seeded as per assignment scope)

Company creation UI is intentionally omitted

Focus is on core CRM workflows, not UI over-design

🎯 Assignment Focus

This project demonstrates:

Full-stack MERN development

Real-world authorization logic

Clean API design

Backend-driven aggregation

Practical React architecture

👨‍💻 Author

Deepan Y
MERN Stack Developer