/*jslint node: true */
'use strict';

let dataPath = './data/subjects.json';
let Base = require('./Base');

var requiredKeys = ['id', 'name', 'hour', 'classroom', 'teacher_id'];

var Teacher = require('./Teacher');

class Subject extends Base {
  constructor(body) {
    super(dataPath);

    this.id = body.id;
    this.name = body.name;
    this.hour = body.hour;
    this.classroom = body.classroom;

    this.teacher = Teacher.getById(body.teacher_id);

    this.carrer = body.carrer || this.teacher.carrer;
    this.students = [];
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      hour: this.hour,
      classroom: this.classroom,
      teacher: this.teacher.id,
      students: this.students,
    };
  }

  modify(body) {
    this.id = body.id;
    this.name = body.name;
    this.hour = body.hour;
    this.classroom = body.classroom;

    this.teacher = Teacher.getById(body.teacher_id);

    return super.save();
  }

  static validate(body) {
    var valid = true;
    requiredKeys.forEach(function (key) {
      if (!body[key] || body[key] === '') valid = false;
    });

    return valid;
  }

  static getStorage() {
    Base.getStorage(dataPath);
  }

}

Subject.getStorage();

module.exports = Subject;
