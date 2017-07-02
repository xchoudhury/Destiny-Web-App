const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World! This is my first node app! ' + process.env.TEST)
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})