const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://mlebon:info734@193.48.125.44/?authMechanism=DEFAULT&authSource=admin';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, options)
  .then(() => {
    console.log('Connecté à MongoDB !');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });
