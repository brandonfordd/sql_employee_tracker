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
            "View Employees, Departments, Roles, or Managers",
            "Add New Employee",
            "Remove a Employee",
            "Update Employee Roles",
            "Add New Role",
            //"Remove Role",
            //"Update Employee Mangers List",
            "All Done? Close Application"
        ]
    }).then(function ({tasks}) {
        //switch task bases on user input
        switch (tasks) {
            case "View Employees, Departments, Roles, or Managers":
                view();
                break;
            case "Add New Employee":
                addEmployee();
                break;
            case "Remove a Employee":
                removeEmployees();
                break;
            case "Update Employee Roles":
                changeRoles();
                break;
            case "Add New Role":
                addRole();
                break;
            //case "Remove Role":
            //    removeRole();
            //    break;
            //case "Update Employee Mangers List":
            //    changeManger();
            //    break;
            case "All Done? Lets Close the Application!":
                connection.end();
                break;
        };
    });
};

function view() {
//function prompt to hold are viewing options
inquirer.prompt({
    type: 'list',
    name: 'view',
    message: 'What would you like to view?',
    choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View All Managers"
    ]
}).then(function ({view}){
        switch (view) {
            case  "View All Employees":
                viewEmployees();
                break;
            case  "View All Departments":
                viewDepartments();
                break;
            case  "View All Roles":
                viewRoles();
                break;
            case  "View All Managers":
                viewManagers();
                break;
        };
    });
};

function viewEmployees() {
    // query to the employees section of the database
    let query = "SELECT * FROM employee";
    //connection to the query then log employees, for each employee assign id, name, role id, and manager id.
    connection.query(query, function(err, res) {
        console.log(`EMPLOYEES:`)
    res.forEach(employee => {
        console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
    })
    //re-run start function
    firstPrompt();
    });
};

function viewDepartments() {
    //query to the department section of the database
    let query = "SELECT * FROM department";
    //connection to the query then log departments, for each department assign id and name.
    connection.query(query, function(err, res) {
      console.log(`DEPARTMENTS:`)
    res.forEach(department => {
        console.log(`ID: ${department.id} | Name: ${department.name}`)
    })
    //re-run start function
    firstPrompt();
    });
};

function viewRoles() {
    //query to the role section of the database
    let query = "SELECT * FROM role";
    //connection to the query then log roles, for each role assign id, title, salary, and department id.
    connection.query(query, function(err, res) {
        console.log(`ROLES:`)
    res.forEach(role => {
        console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
    })
    //re-run start function
    firstPrompt();
    });

};

async function addEmployee() {
    connection.query('SELECT * FROM role', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          }, 
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleName",
            type: "list",
            // is there a way to make the options here the results of a query that selects all departments?`
            message: "What role does the employee have?",
            choices: function() {
             rolesArray = [];
                result.forEach(result => {
                    rolesArray.push(
                        result.title
                    );
                })
                return rolesArray;
              }
          }
          ]) 
        // in order to get the id here, i need a way to grab it from the departments table 
        .then(function(answer) {
        console.log(answer);
        const role = answer.roleName;
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw (err);
            let filteredRole = res.filter(function(res) {
                return res.title == role;
            })
        let roleId = filteredRole[0].id;
        connection.query("SELECT * FROM employee", function(err, res) {
                inquirer
                .prompt ([
                    {
                        name: "manager",
                        type: "list",
                        message: "Who is your manager?",
                        choices: function() {
                            managersArray = []
                            res.forEach(res => {
                                managersArray.push(
                                    res.last_name)
                            })
                            return managersArray;
                        }
                    }
                ]).then(function(managerAnswer) {
                    const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', function(err, res) {
                if (err) throw (err);
                let filteredManager = res.filter(function(res) {
                return res.last_name == manager;
            })
            let managerId = filteredManager[0].id;
                    console.log(managerAnswer);
                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    let values = [answer.firstName, answer.lastName, roleId, managerId]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res, fields) {
                         console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                        })
                        viewEmployees();
                        })
                     })
                })
            })
        })
})
};

function removeEmployees() {
  console.log("Deleting an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);
    console.log("ArrayToDelete!\n");

    promptDelete(deleteEmployeeChoices);
  });
}

// User choose the employee list, then employee is deleted

function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
      // console.log(query.sql);
    });
}

function changeRoles() {
    connection.query('SELECT * FROM employee', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",
            // is there a way to make the options here the results of a query that selects all departments?`
            message: "Which employee's role is changing?",
            choices: function() {
             employeeArray = [];
                result.forEach(result => {
                    employeeArray.push(
                        result.last_name
                    );
                })
                return employeeArray;
              }
          }
          ]) 
        // in order to get the id here, i need a way to grab it from the departments table 
        .then(function(answer) {
        console.log(answer);
        const name = answer.employeeName;
        /*const role = answer.roleName;
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw (err);
            let filteredRole = res.filter(function(res) {
                return res.title == role;
            })
        let roleId = filteredRole[0].id;*/
        connection.query("SELECT * FROM role", function(err, res) {
                inquirer
                .prompt ([
                    {
                        name: "role",
                        type: "list",
                        message: "What is their new role?",
                        choices: function() {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)
                                
                            })
                            return rolesArray;
                        }
                    }
                ]).then(function(rolesAnswer) {
                    const role = rolesAnswer.role;
                    console.log(rolesAnswer.role);
                connection.query('SELECT * FROM role WHERE title = ?', [role], function(err, res) {
                if (err) throw (err);
                    let roleId = res[0].id;
                    let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                    let values = [roleId, name]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res, fields) {
                         console.log(`You have updated ${name}'s role to ${role}.`)
                        })
                        viewEmployees();
                        })
                     })
                })
            
            //})
       })
})
};

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
          }, 
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
          },
          {
            name: "departmentName",
            type: "list",
            // is there a way to make the options here the results of a query that selects all departments?`
            message: "Which department does this role fall under?",
            choices: function() {
                var choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
            }
        }
        ]) 
        // in order to get the id here, i need a way to grab it from the departments table 
        .then(function(answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
        
            if (err) throw (err);
                let filteredDept = res.filter(function(res) {
            return res.name == department;
        });

        let id = filteredDept[0].id;
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        let values = [answer.title, parseInt(answer.salary), id]
        console.log(values);
        connection.query(query, values,
            function(err, res, fields) {
            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
        })
            viewRoles()
            })
        })
    })
};

function viewManagers() {
    let query = "SELECT id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS managers FROM employee";
    connection.query(query, function(err, res) {
        console.log(`Managers:`)
    res.forEach(employee => {
        console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
    })
    //re-run start function
    firstPrompt();
    });
}