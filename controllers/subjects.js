/*jslint node: true */
'use strict';

let Subject = require('../models/Subject');

class SubjectController {

  static get(req, res) {

    if (!req.params.id) return res.sendStatus(400);
    var subject = Subject.getById(req.params.id);

    if (!subject) return res.sendStatus(404);

    return res.json(subject);
  }

  static getAll(req, res) {
    let all = Subject.all();

    return res.json(all);
  }

  static create(req, res) {
    var body = req.body;

    var valid = Subject.validate(body);

    if (!valid) return res.sendStatus(400);
    if (Subject.getById(body.id)) return res.sendStatus(409);

    var subject = new Subject(body);

    subject.save();

    return SubjectController.getAll(req, res);
  }

  static update(req, res) {
    var body = req.body;

    if (!req.params.id) return res.sendStatus(400);

    var valid = Subject.validate(body);

    if (!valid) return res.sendStatus(400);

    var subject = new Subject(Subject.getById(req.params.id));

    if (!subject.modify(body)) return res.sendStatus(500);

    return SubjectController.getAll(req, res);
  }

  static delete(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    if (!Subject.remove(req.params.id)) return res.sendStatus(404);

    return SubjectController.getAll(req, res);
  }
}

module.exports = SubjectController;
