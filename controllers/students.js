/*jslint node: true */
'use strict';

let Student = require('../models/Student');

class StudentController {

  static get(req, res) {

    if (!req.params.id) return res.sendStatus(400);
    var student = Student.getById(req.params.id);

    if (!student) return res.sendStatus(404);

    return res.json(student);
  }

  static getAll(req, res) {
    let all = Student.all();

    return res.json(all);
  }

  static create(req, res) {
    var body = req.body;

    var valid = Student.validate(body);

    if (!valid) return res.sendStatus(400);
    if (Student.getById(body.id)) return res.sendStatus(409);

    var student = new Student(body);

    student.save();

    return StudentController.getAll(req, res);
  }

  static update(req, res) {
    var body = req.body;

    if (!req.params.id) return res.sendStatus(400);

    var valid = Student.validate(body);

    if (!valid) return res.sendStatus(400);

    var student = new Student(Student.getById(req.params.id));

    if (!student.modify(body)) return res.sendStatus(500);

    return StudentController.getAll(req, res);
  }

  static delete(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    if (!Student.remove(req.params.id)) return res.sendStatus(404);

    return StudentController.getAll(req, res);
  }
}

module.exports = StudentController;
