'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

const pg = require('pg')

let app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));



app.get('/', function (req, res) {

  res.status(200).send('hello sheyab')
});


app.get('*', (req, res) => {
  // console.log('this is for checking ', req);
  res.status(404).render('./pages/error', { erorr: '404 NOT FOUND' })
});

const client = new pg.Client(process.env.DATABASE_URL);

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Host : ${PORT}`);
    })
  })