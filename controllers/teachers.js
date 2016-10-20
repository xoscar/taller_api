/*jslint node: true */
'use strict';

let Teacher = require('../models/Teacher');

class TeacherController {

  static get(req, res) {

    if (!req.params.id) return res.sendStatus(400);
    var teacher = Teacher.getById(req.params.id);

    if (!teacher) return res.sendStatus(404);

    return res.json(teacher);
  }

  static getAll(req, res) {
    let all = Teacher.all();

    return res.json(all);
  }

  static create(req, res) {
    var body = req.body;

    var valid = Teacher.validate(body);

    if (!valid) return res.sendStatus(400);
    if (Teacher.getById(body.id)) return res.sendStatus(409);

    var teacher = new Teacher(body);
    teacher.save();

    return TeacherController.getAll(req, res);
  }

  static update(req, res) {
    var body = req.body;

    if (!req.params.id) return res.sendStatus(400);

    var valid = Teacher.validate(body);

    if (!valid) return res.sendStatus(400);

    var teacher = new Teacher(Teacher.getById(req.params.id));

    if (!teacher.modify(body)) return res.sendStatus(500);

    return TeacherController.getAll(req, res);
  }

  static delete(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    if (!Teacher.remove(req.params.id)) return res.sendStatus(404);

    return TeacherController.getAll(req, res);
  }
}

module.exports = TeacherController;
