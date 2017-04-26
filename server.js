const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const jsonfileName = "ugeplan.json";

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function (req, res) {
  jsonfile.readFile(jsonfileName, function(err, obj){
    if (err) res.send(err)
    res.render('index.ejs', {week:obj});
  })
});
app.get('/edit', function (req, res) {
  jsonfile.readFile(jsonfileName, function(err, obj){
    if (err) res.send(err)
    res.render('form.ejs', {week:obj});
  })
});

app.post('/save', function(req, res){
  jsonfile.writeFile(jsonfileName, req.body, {spaces: 2}, function(err){
    if (err) res.send(err);
  });
  res.redirect("/")
})

app.listen(3000);
