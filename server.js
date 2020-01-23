/* eslint-disable no-undef */
/* eslint-disable no-console */
'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');
const request = require('request');

const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

const pg = require('pg');

let app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, }));

app.get('/', function (req, res) {
  res.status(200).send('hello sheyab');
});
app.get('/test', function (req, res) {

  var options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    qs: { q: 'shihab', },
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': 'b7c9ddf4dcmsh3fed6859a77bf85p11dd80jsn396438f74ee5',
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let jsonData = JSON.parse(body);
    res.status(200).send(jsonData);

    console.log(body);
  });
});


app.get('*', (req, res) => {
  res.status(404).render('./pages/error', { erorr: '404 NOT FOUND', });
});

const client = new pg.Client(process.env.DATABASE_URL);
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Host : ${PORT}`);
    });
  });