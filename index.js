//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table')

let connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  //Database
  database: "employeesDB"
});
  
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  firstPrompt();
});

// first function that runs after connection is made
function firstPrompt() {
    //inquirer to start a prompt
    inquirer.prompt({
        type: 'list',
        name: 'tasks',
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by there Roles",
            "Add New Employee",
            "Remove a Employee",
            "Update Employee Roles",
            "Add New Role",
            "Remove Role",
            "Change or Update Employee Mangers List",
            "All Done? Close Application"
        ]
    }).then(function ({tasks}) {
        //switch task bases on user input
        switch (tasks) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Employees by Department":
                viewEmployeesByDepartment();
                break;
            case "View All Employees by there Roles":
                viewEmployeesByRoles();
                break;
            case "Add New Employee":
                addEmployee();
                break;
            case "Remove a Employee":
                removeEmployee();
                break;
            case "Change or Update Employee Roles":
                changeRoles();
                break;
            case "Add New Role":
                addRole();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Update Employee Mangers List":
                changeManger();
                break;
            case "All Done? Lets Close the Application!":
                connection.end();
                break;
        };
    });
};

function viewEmployees() {

};

function viewEmployeesByDepartment() {

};

function viewEmployeesByRoles() {

};

function addEmployee() {

};

function removeEmployee() {

};

function changeRoles() {

};

function addRole() {

};

function removeRole() {

};

function changeManger() {

};
