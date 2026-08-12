# 💰 Personal Finance Tracker

A full-stack personal finance management application designed to help users manage their finances in one place. The application allows users to manage accounts, track income and expenses, organize transactions using categories, create budgets, set financial goals, manage recurring transactions, and monitor their financial activity through an interactive dashboard.

## 🚀 Live Demo

**Frontend:**  
https://personal-finance-tracker-production.vercel.app/

**Backend API:**  
https://personal-finance-tracker-production-production.up.railway.app/

**GitHub Repository:**  
https://github.com/sakinanehra/Personal-Finance-Tracker-Production

---

## ✨ Features

- 🔐 User Registration and Login
- 💳 Account Management
- 💰 Income Tracking
- 💸 Expense Tracking
- 💵 Savings Tracking
- 🏷️ Transaction Categories
- 📊 Interactive Dashboard
- 📈 Financial Charts and Statistics
- 💰 Budget Management
- 🎯 Financial Goals
- 🔗 Goal Transactions
- 🔄 Recurring Transactions
- ✏️ Add, Edit and Delete Transactions
- 🗄️ Persistent MySQL Database
- 🔌 REST API Integration
- 🌐 Production Deployment
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js
- Fetch API

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

### Database

- MySQL

### Deployment & Tools

- Vercel – Frontend Deployment
- Railway – Backend Deployment
- Railway – MySQL Database
- GitHub – Version Control
- Git – Source Control
- VS Code – Development Environment
- XAMPP / MySQL – Local Development

---

## 🏗️ Application Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         │   Desktop / Mobile  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Vercel        │
                         │      Frontend       │
                         │ HTML / CSS / JS      │
                         └──────────┬──────────┘
                                    │
                              REST API Calls
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Railway        │
                         │   Spring Boot API   │
                         └──────────┬──────────┘
                                    │
                              JPA / Hibernate
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Railway MySQL    │
                         │      Database       │
                         └─────────────────────┘
```

---

## 📁 Project Structure

```text
Personal-Finance-Tracker-Production/
│
├── finance-tracker-improved/
│   ├── index.html
│   ├── style.css
│   ├── logic.js
│   ├── api-service.js
│   └── backend-integration.js
│
├── finance_tracker_api/
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw.cmd
│
├── database/
│   └── finance tracker database.sql
│
├── .gitignore
└── README.md
```

---

## 🗃️ Database

The application uses MySQL for persistent data storage.

### Main Database Tables

- `users`
- `accounts`
- `categories`
- `transactions`
- `budgets`
- `goals`
- `goal_transactions`
- `recurring_transactions`

The SQL database script is available inside the `database` directory.

---

## 🔌 REST API

The Spring Boot backend provides REST APIs for managing users, accounts, categories, transactions, budgets, goals and recurring transactions.

### Production API Base URL

```text
https://personal-finance-tracker-production-production.up.railway.app/api/v1
```

### Main API Resources

```text
/api/v1/users
/api/v1/accounts
/api/v1/categories
/api/v1/transactions
/api/v1/budgets
/api/v1/goals
/api/v1/recurring-transactions
```

The frontend communicates with the backend using JavaScript `Fetch API` requests.

---

## 📊 Application Modules

### 👤 User Management

Provides user registration and login functionality.

### 💳 Account Management

Users can manage different types of financial accounts including:

- Bank
- Card
- Cash
- E-wallet

### 💰 Transaction Management

Users can:

- Add income
- Add expenses
- Add savings
- Edit transactions
- Delete transactions
- Assign transactions to accounts
- Assign transactions to categories

### 🏷️ Category Management

Allows users to organize financial transactions using categories.

### 💵 Budget Management

Users can create and manage budgets based on their financial planning requirements.

### 🎯 Goal Management

Users can create financial goals and track their progress.

### 🔄 Recurring Transactions

Allows users to manage recurring financial activities.

### 📈 Dashboard

The dashboard provides an overview of financial activity using:

- Total income
- Total expenses
- Savings
- Account balances
- Financial statistics
- Charts and visualizations

---

## 💻 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sakinanehra/Personal-Finance-Tracker-Production.git
```

Navigate into the project:

```bash
cd Personal-Finance-Tracker-Production
```

---

### 2. Setup MySQL Database

Make sure MySQL is installed and running.

Create the local database:

```sql
CREATE DATABASE finance_tracker;
```

Execute the SQL script available at:

```text
database/finance tracker database.sql
```

---

### 3. Configure Backend

Navigate to:

```text
finance_tracker_api/
```

Open:

```text
src/main/resources/application.properties
```

Configure the local MySQL connection:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/finance_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.open-in-view=false

server.port=8081
```

Replace `YOUR_PASSWORD` with your local MySQL password.

> Never commit real production credentials to GitHub.

---

### 4. Run the Backend

From the `finance_tracker_api` directory:

```bash
mvn spring-boot:run
```

The backend will run locally at:

```text
http://localhost:8081
```

The local API base URL is:

```text
http://localhost:8081/api/v1
```

---

### 5. Run the Frontend

Navigate to:

```text
finance-tracker-improved/
```

Open the project using VS Code Live Server or another local development server.

The frontend communicates with the local Spring Boot backend through REST APIs.

---

## 🌐 Production Deployment

### Frontend – Vercel

The frontend is deployed on Vercel.

**Production URL:**

```text
https://personal-finance-tracker-production.vercel.app/
```

### Backend – Railway

The Spring Boot backend is deployed on Railway.

**Production Backend URL:**

```text
https://personal-finance-tracker-production-production.up.railway.app/
```

### Database – Railway

The production MySQL database is hosted on Railway and connected to the Spring Boot backend using Railway service variables.

---

## 🔄 Deployment Workflow

```text
Local Development
       │
       ▼
Local Testing
       │
       ▼
Git Add
       │
       ▼
Git Commit
       │
       ▼
Git Push
       │
       ▼
GitHub - main branch
       │
       ├──────────────────┐
       ▼                  ▼
    Vercel             Railway
   Frontend            Backend
                          │
                          ▼
                    Railway MySQL
```

Changes pushed to the `main` branch can automatically trigger new deployments through the connected Vercel and Railway services.

---

## 🔐 Security

Sensitive credentials should never be committed to GitHub.

Production configuration should be managed using environment variables.

Examples of sensitive database variables include:

```text
MYSQLHOST
MYSQLPORT
MYSQLDATABASE
MYSQLUSER
MYSQLPASSWORD
MYSQL_URL
MYSQL_PUBLIC_URL
MYSQL_ROOT_PASSWORD
```

Production database credentials are managed through Railway environment variables.

The `.gitignore` file is used to prevent unnecessary and sensitive files from being committed.

---

## 🧪 Testing

The application should be tested across the following workflows:

- User registration
- User login
- Account creation
- Account update
- Account deletion
- Category creation
- Transaction creation
- Transaction update
- Transaction deletion
- Budget creation
- Goal creation
- Goal transaction management
- Recurring transaction creation
- Dashboard calculations
- Chart updates
- Data persistence after refresh
- Logout and login
- Production API connectivity
- Frontend and backend integration

---

## 📱 Production Compatibility

The application has been deployed as a web application and can be accessed through:

- Desktop browsers
- Mobile browsers
- Incognito/private browsing
- Production Vercel URL

The frontend communicates with the production Spring Boot backend hosted on Railway.

---

## 🔮 Future Improvements

Potential future enhancements include:

- JWT-based Authentication
- Password Hashing
- Password Reset Functionality
- Role-Based Access Control
- Advanced Financial Reports
- CSV Export
- PDF Export
- Email Notifications
- Automated Unit Testing
- Integration Testing
- CI/CD Pipeline
- Advanced Financial Analytics
- Dark Mode
- Improved Mobile Responsiveness
- Financial Insights and Recommendations

---

## 👩‍💻 Author

**Sakina Nehra**

GitHub:  
https://github.com/sakinanehra

---

## 📄 License

This project is developed for educational, learning and portfolio purposes.
