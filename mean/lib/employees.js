const employeeDb = require('../database/employees');

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees(callback) {
    setTimeout(() => {
        callback(null, employeeDb);
    }, 500);
}

function getEmployee(employeeId, callback) {
    getEmployees((error, data) => {
        if (error) {
            return callback(error);
        }

        var result = data.find((item) => {
            return item.id === employeeId;
        });

        callback(null, result);
    });
}