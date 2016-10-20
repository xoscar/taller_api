/*jslint node: true */
'use strict';

let Storage = require('../utils/storage');
let storage = null;

class Base {
  constructor(path) {
    if (!storage) throw Error('Storage not set.');
    this.id = null;
    this.storage = new Storage(path);
  }

  getData() {
    return {};
  }

  save() {
    var id = this.id;
    var modify = storage.data.filter(function (student) {
      return student.id === id;
    })[0];

    var data = this.getData();

    if (!modify) this.storage.data.push(data);
    else
      this.storage.data.forEach((element, index) => {
        if (element.id === id) this.storage.data[index] = data;
      });

    return this.storage.save();
  }

  static validate() {
    return true;
  }

  static getStorage(dataPath) {
    storage = new Storage(dataPath);
  }

  static all() {
    this.getStorage();

    return storage.data;
  }

  static getById(id) {
    this.getStorage();

    return storage.data.filter(function (student) {
      return student.id === id;
    })[0];
  }

  static remove(id) {
    this.getStorage();

    if(!this.getById(id)) return false;

    storage.data = storage.data.filter(function (student) {
      return student.id !== id;
    });

    return storage.save();
  }

}

module.exports = Base;
