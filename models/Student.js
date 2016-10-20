/*jslint node: true */
'use strict';

let dataPath = './data/students.json';
let Base = require('./Base');

var requiredKeys = ['name', 'carrer', 'id', 'semester'];

class Student extends Base {
  constructor(body) {
    super(dataPath);

    this.id = body.id;
    this.name = body.name;
    this.carrer = body.carrer;
    this.semester = body.semester;
  }

  modify(body) {
    this.name = body.name;
    this.carrer = body.carrer;
    this.semester = body.semester;

    return super.save();
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      carrer: this.carrer,
      semester: this.semester,
    };
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

Student.getStorage();

module.exports = Student;
