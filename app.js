const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const students = require('./routes/students');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');

const app = express();

app.set('port', process.env.API_PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/students', students);
app.use('/teachers', teachers);
app.use('/subjects', subjects);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port 3000');
});
