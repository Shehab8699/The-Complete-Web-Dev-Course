const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = 'https://us9.api.mailchimp.com/3.0/lists/bd197ab21b';
  const options = {
    method: 'POST',
    auth: 'Shehab:563ff8600485e06a76936410a6ef40ee-us9',
  };
  const request = https.request(url, options, function (response) {
    response.on('data', function (data) {
      if (JSON.parse(data).total_created) {
        res.sendFile(__dirname + '/sucess.html');
      } else {
        res.sendFile(__dirname + '/failure.html');
      }
    });
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure.html', (req, res) => {
  res.redirect('/');
});
app.listen(process.env.PORT || 3000, () => {
  console.log('server is up');
});

// api key
// 563ff8600485e06a76936410a6ef40ee-us9

// list id
//bd197ab21b
