USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Terry", 1, 3), ("Chunk", "Chan", 2, 1), ("Roberta", "Rodriguez", 3, null), ("Darla", "Yee", 4, 3), ("Tommy", "Brown", 5, null), ("Dora", "Lourd", 2, null), ("Barry", "Allen", 4, 7), ("Audrey", "Dills", 1, 2)
