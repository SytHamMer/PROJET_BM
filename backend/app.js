const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

const userRoutes = require('./routes/user');
const spendingRoutes = require('./routes/spending');
const categoryRoutes = require('./routes/category');



const url = 'mongodb://mlebon:info734@193.48.125.44/Les<3bestiiiies?authMechanism=DEFAULT&authSource=admin';

  mongoose.connect(url,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/spending', spendingRoutes);
app.use('/api/category',categoryRoutes);

  

module.exports = app;