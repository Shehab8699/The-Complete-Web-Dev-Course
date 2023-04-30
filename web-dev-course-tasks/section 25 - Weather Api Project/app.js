const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  console.log(req.body.cityName);
  const apiKey = '69b0fee7bdaa22d89917c201692b7a23';
  const unit = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    unit;
  https.get(url, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      res.write('<p>The weather is currently ' + description + '</p>');
      res.write(
        '<p>The temperture in ' +
          query +
          ' is  ' +
          temp +
          ' degree Celcius.</h1>'
      );
      res.write('<img src=' + imageUrl + '>');
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
