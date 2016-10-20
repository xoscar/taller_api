/*jslint node: true */
'use strict';

let dataPath = './data/teachers.json';
let Base = require('./Base');

var requiredKeys = ['id', 'name', 'carrer'];

class Teacher extends Base {
  constructor(body) {
    super(dataPath);

    this.id = body.id;
    this.name = body.name;
    this.carrer = body.carrer;
  }

  modify(body) {
    this.name = body.name;
    this.carrer = body.carrer;

    return super.save();
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      carrer: this.carrer,
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

Teacher.getStorage();

module.exports = Teacher;
