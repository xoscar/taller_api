/*jslint node: true */
'use strict';

const fs = require('fs');

class Storage {
  constructor(path) {
    this.fs = fs;
    this.path = path;
    this.data = this.read();
  }

  read() {
    this.data = this.parse(this.fs.readFileSync(this.path));

    return this.data;
  }

  parse(data) {
    return JSON.parse(data.toString());
  }

  save() {
    try {
      this.fs.writeFileSync(this.path, JSON.stringify(this.data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}

module.exports = Storage;
