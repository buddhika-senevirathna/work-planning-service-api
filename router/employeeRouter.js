const express = require('express');
const empRouter = express.Router();

const { registerEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee  } = require('../controller/employeeController');

empRouter.post('/', registerEmployee);

empRouter.get('/:id', getEmployee);

empRouter.get('/all', getAllEmployees);

empRouter.put('/:id', updateEmployee);

empRouter.delete('/:id', deleteEmployee);

module.exports = empRouter;