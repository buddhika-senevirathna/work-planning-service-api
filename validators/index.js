const register = require('./registerValidator');
const login = require('./loginValidator');
const saveShiftValidation = require('./shiftValidator');
const assignShiftValidation = require('./assignShiftValidator');

module.exports = {
    register,
    login,
    saveShiftValidation,
    assignShiftValidation
}
