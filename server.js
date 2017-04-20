const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index')
});
app.get('/edit', function (req, res) {
  res.render('form')
});

app.post('/save', function(req, res){
  console.log(req);
  res.send("Attempted to POST data")
})

app.listen(3000);
