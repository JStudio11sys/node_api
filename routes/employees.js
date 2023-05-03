var express = require('express');
var router = express.Router();

let employees = [
    { id: 1, firstName: "Juan", lastName: "Dela Cruz", age: 24, gender: "male", jobTitle: "Manager" },
    { id: 2, firstName: "Anna", lastName: "Salvador", age: 21, gender: "female", jobTitle: "Junior Dev" },
    { id: 3, firstName: "Mark", lastName: "Bautista", age: 28, gender: "male", jobTitle: "Senior Fullstack Dev" },
    { id: 4, firstName: "Micheal", lastName: "Garcia", age: 31, gender: "male", jobTitle: "CEO" },
];


router.get("/", (req, res, next) => { //default call
    res.send(employees);
});

router.get("/count/all", (req, res) => { //count all items
    res.status(200).send({ total: employees.length });
});

router.get("/:id", (req, res) => { // find items by id
    const { id } = req.params;
    let employee = employees.find((item) => item.id === Number(id));
    res.status(200).send(employee ?? "Record not found!");
});

router.get("/name/:keyword", (req, res) => { //search by keyword
    const { keyword } = req.params;
    let list = employees.filter((item) =>
    (item.firstName.toLowerCase().includes(keyword)
        || item.lastName.toLowerCase().includes(keyword)));
    res.status(200).send(list.length > 0 ? list : keyword + " is not found!");
});

router.post('/:id', (req, res) => {
    let employeeDetail = {
        id: employees.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        jobTitle: req.body.jobTitle,
    }
    employees.push(employeeDetail);
    res.status(200).send(employeeDetail);

});

router.put('/:id', (req, res) => {
    let id = req.params;
    //const {firstName, lastName, code, age, gender, course, birthdate} = req.body;

    let employeeDetail = employees.find((item) => item.id === Number(req.body.id));

    employeeDetail.firstName = req.body.firstName;
    employeeDetail.lastName = req.body.lastName;
    employeeDetail.age = req.body.age;
    employeeDetail.gender = req.body.gender;
    employeeDetail.jobTitle = req.body.jobTitle;

    res.status(200).send(employeeDetail);

});

router.delete('/:id', (req, res) => {
    employees = employees.filter((item) => item.id !== Number(req.body.id));
    res.status(200).send({ message: "Record " + req.body.id + " has been deleted." });

});



module.exports = router;