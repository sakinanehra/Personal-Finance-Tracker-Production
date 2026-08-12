create database finance_tracker;
use finance_tracker;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
create table categories (
category_id INT auto_increment primary key,
user_id INT NOT NULL ,
category_name varchar(50) not null ,
type enum('income' , 'expense' , 'savings') not null,
created_at timestamp default current_timestamp ,
 CONSTRAINT fk_category_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_category
        UNIQUE(user_id, category_name, type)
);

create table transactions(
transaction_id int auto_increment primary key ,
user_id int not null ,
category_id int not null ,
transaction_type enum('income' , 'expense' , 'savings') not null ,
amount decimal(12 , 2 ) not null ,
description varchar(255) ,
transaction_date date not null ,
created_at timestamp default current_timestamp , 
constraint fk_transcation_user
foreign key(user_id)
references users(user_id)
ON DELETE CASCADE,
    CONSTRAINT fk_transaction_category
        FOREIGN KEY(category_id)
        REFERENCES categories(category_id)
        ON DELETE RESTRICT
);

create table Budgets (
budget_id INT auto_increment primary key ,
    user_id INT NOT NULL,
    budget_month INT NOT NULL,
    budget_year INT NOT NULL,
    budget_amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_budget_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT unique_budget
        UNIQUE(user_id,budget_month,budget_year)
);

CREATE TABLE goals (
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    goal_name VARCHAR(100) NOT NULL,
    target_amount DECIMAL(12,2) NOT NULL,
    current_amount DECIMAL(12,2) DEFAULT 0,
    deadline DATE,
    status ENUM('ACTIVE','COMPLETED','CANCELLED')
        DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_goal_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE goal_transactions (
    goal_transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    goal_id INT NOT NULL,
    transaction_id INT NOT NULL,
    amount_used DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_goaltransaction_goal
        FOREIGN KEY(goal_id)
        REFERENCES goals(goal_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_goaltransaction_transaction
        FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE
);
INSERT INTO users(full_name,email,password)
VALUES
('Sakina Nehra','sakina@gmail.com','sakina123'),
('Nitika','ntika@gmail.com','nitika'),
('Abhlasha','abhilasha@gmail.com','abhilasha');
select * from users;

INSERT INTO categories(user_id,category_name,type)
VALUES
(1,'Salary','income'),
(1,'Freelancing','income'),
(1,'Food','expense'),
(1,'Shopping','expense'),
(1,'Travel','expense'),
(1,'Bills','expense'),
(1,'Health','expense'),
(1,'Entertainment','expense'),
(1,'Emergency Fund','savings'),
(1,'Vacation Fund','savings');

INSERT INTO categories(user_id,category_name,type)
VALUES
(2,'Salary','income'),
(2,'Food','expense'),
(2,'Shopping','expense'),
(2,'Emergency Fund','savings');

INSERT INTO categories(user_id,category_name,type)
VALUES
(3,'Salary','income'),
(3,'Travel','expense'),
(3,'Health','expense'),
(3,'Emergency Fund','savings');
select * from categories ;

INSERT INTO transactions
(user_id,category_id,transaction_type,amount,description,transaction_date)
VALUES
(1,11,'income',50000,'Monthly Salary','2026-07-01'),
(1,12,'income',12000,'Website Project','2026-07-05'),
(1,13,'expense',800,'Lunch','2026-07-02'),
(1,14,'expense',2500,'Shopping','2026-07-03'),
(1,15,'expense',1200,'Bus Tickets','2026-07-04'),
(1,16,'expense',1800,'Electricity Bill','2026-07-06'),
(1,17,'expense',1500,'Medicine','2026-07-08'),
(1,18,'expense',900,'Movie','2026-07-09'),
(1,19,'savings',5000,'Emergency Savings','2026-07-10'),
(1,20,'savings',3000,'Vacation Savings','2026-07-12');
select * from transactions;

INSERT INTO Budgets
(user_id,budget_month,budget_year,budget_amount)
VALUES
(1,7,2026,20000),
(2,7,2026,15000),
(3,7,2026,18000);

INSERT INTO goals
(user_id,goal_name,target_amount,current_amount,deadline,status)
VALUES
(1,'Buy Laptop',80000,5000,'2026-12-31','ACTIVE'),
(1,'Goa Trip',40000,3000,'2026-11-30','ACTIVE'),
(2,'Bike',120000,10000,'2027-03-31','ACTIVE');

INSERT INTO goal_transactions
(goal_id,transaction_id,amount_used)
VALUES
(1,19,5000),
(2,11,3000);
select * from goal_transactions;

SELECT c.category_name,
SUM(t.amount) AS total
FROM transactions t
JOIN categories c
ON t.category_id = c.category_id
WHERE t.transaction_type='expense'
AND t.user_id=1
GROUP BY c.category_name;

CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_type ENUM('BANK','CASH','CARD','EWALLET') NOT NULL,
    current_balance DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

INSERT INTO accounts
(user_id,account_name,account_type,current_balance)
VALUES
(1,'Cash','CASH',5000),
(1,'SBI Savings','BANK',80000),
(1,'Google Pay','EWALLET',6000),
(2,'HDFC Savings','BANK',55000),
(2,'Cash','CASH',3000),
(3,'ICICI Savings','BANK',90000);

ALTER TABLE transactions
ADD account_id INT;
ALTER TABLE transactions
ADD CONSTRAINT fk_transaction_account
FOREIGN KEY(account_id)
REFERENCES accounts(account_id);
UPDATE transactions
SET account_id=2
WHERE user_id=1
AND transaction_type='income';

CREATE TABLE recurring_transactions(
    recurring_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    frequency ENUM('DAILY','WEEKLY','MONTHLY','YEARLY'),
    next_due_date DATE,
    status ENUM('ACTIVE','PAUSED')
    DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),
    FOREIGN KEY(account_id)
    REFERENCES accounts(account_id),
    FOREIGN KEY(category_id)
    REFERENCES categories(category_id)
);

INSERT INTO recurring_transactions
(user_id,account_id,category_id,amount,frequency,next_due_date)
VALUES
(1,2,11,50000,'MONTHLY','2026-08-01'),
(1,2,16,1800,'MONTHLY','2026-08-06'),
(1,2,15,1500,'MONTHLY','2026-08-10');

CREATE TABLE transaction_attachments(
attachment_id INT AUTO_INCREMENT PRIMARY KEY,
transaction_id INT NOT NULL,
file_name VARCHAR(255),
file_path VARCHAR(255),
uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(transaction_id)
REFERENCES transactions(transaction_id)
ON DELETE CASCADE
);
SELECT transaction_id,description
FROM transactions;

INSERT INTO transaction_attachments
(transaction_id,file_name,file_path)
VALUES
(13,'lunch_bill.jpg','uploads/lunch_bill.jpg'),
(16,'electricity_bill.pdf','uploads/electricity_bill.pdf');

CREATE TABLE user_settings(
setting_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT UNIQUE NOT NULL,
currency VARCHAR(10)
DEFAULT 'INR',
theme ENUM('LIGHT','DARK')
DEFAULT 'LIGHT',
language VARCHAR(30)
DEFAULT 'English',
notification_enabled BOOLEAN
DEFAULT TRUE,
timezone VARCHAR(100)
DEFAULT 'Asia/Kolkata',
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(user_id)
REFERENCES users(user_id)
ON DELETE CASCADE);

INSERT INTO user_settings(user_id)
VALUES
(1),(2),(3);
describe users ;
describe transactions;
describe accounts;
select * from users;
select * from transactions ;
UPDATE transactions
SET account_id = 2
WHERE account_id IS NULL;
describe goals ;
select * from categories ;
SELECT user_id, category_name
FROM categories
ORDER BY category_id DESC;