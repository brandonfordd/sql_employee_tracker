# Unit 12 MySQL Homework: Employee Tracker

## Table of Contents
* [Description](#description)
* [Acceptance](#acceptance)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)

## Description

Design the following database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Key Topics

* MySQL Workbench

* MySQL command line prompt (MySQL Shell)

* Creating and dropping databases and tables

* schema.sql and seeds.sql files

* CRUD

* Primary and foreign keys

* Prepared statements

* Joins

* ACID

## Installation
Clone the repository to your local development environment.
```
git clone https://github.com/brandonfordd/sql_employee_tracker.git
```
Navigate to the developer-profile-generator folder using the command prompt.

Run npm install to install all dependencies. To use the application locally, run npm run start in your CLI.

## Usage 
```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Contributing
```
brandonfordd
```
## Tests
![GIF](https://github.com/brandonfordd/notetaker/blob/main/public/assets/gifs/notetaker_preview.gif?raw=true)

## Questions?
For any questions, please contact me with the information below:

GitHub: [@brandonfordd](https://api.github.com/users/brandonfordd)

Email: brandonford617@yahoo.com
  