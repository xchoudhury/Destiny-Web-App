const path = require('path');
const logger = require('morgan');
const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const app = express()

var base = require('./routes/base');
var users = require('./routes/users');
var destiny = require('./routes/destiny');


app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', base);
app.use('/users', users);
app.use('/destiny', destiny);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

module.exports = app;