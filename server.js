const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const path = require('path');
const jsonfileName = path.resolve('ugeplan.json');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Date.prototype.getWeekNumber = function() {
  var d = new Date(+this);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
};

app.get('/', function(req, res) {
  jsonfile.readFile(jsonfileName, function(err, obj) {
    if (err) res.send(err);
    res.render('index.ejs', {
      week: obj,
      weeknumber: new Date().getWeekNumber()
    });
  });
});
app.get('/edit', function(req, res) {
  jsonfile.readFile(jsonfileName, function(err, obj) {
    if (err) res.send(err);
    res.render('form.ejs', {
      week: obj,
      weeknumber: new Date().getWeekNumber()
    });
  });
});

app.post('/save', function(req, res) {
  jsonfile.writeFile(jsonfileName, req.body, { spaces: 2 }, function(err) {
    if (err) res.send(err);
    res.redirect('/');
  });
});

app.listen(3000);
