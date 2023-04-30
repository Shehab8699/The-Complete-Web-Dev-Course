const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmiCalculator', (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);
  const result = weight / (height * height);
  res.send('the resault of calculation is ' + result);
});

app.listen('3000', () => {
  console.log('server started on port 3000');
});
