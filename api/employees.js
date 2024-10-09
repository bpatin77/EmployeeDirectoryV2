const express = require("express");
const router = express.Router();
module.exports = router;

const employees = require("./data/employees");

router.get("/employees", (req, res) => {
  res.json(employees);
});

router.post("/", (req, res, next) => {
  //^ When a POST request is made to this route, it receives the request (req), the response object (res), and a next function for error handling.
  const { name } = req.body; //destructures the name property from req.body, which contains the data sent in the body of the request.
  if (name) {
    //^If name is provided:
    const newEmployee = { id: employees.length + 1, name }; //A new employee object is created with a unique id (calculated based on the current length of the employees array) and the provided name
    employees.push(newEmployee); //This new employee object is added to the employees array.
    res.status(201).json(newEmployee); //The server responds with a status code of 201 (indicating successful creation) and sends back the newly created employee as JSON.
  } else {
    //^If name is not provided:
    next({ status: 400, message: "New employee must have a name." }); //It calls the next function with an error object, setting the status to 400 (indicating a bad request) and providing a message indicating that a name is required.
  }
});


router.get("/employees/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});
