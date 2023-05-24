const express = require('express');
const path = require('path');
require('dotenv').config();

const configServer = require('./configs/configServer');
const initWebRoute = require('./router/webRoute');
const AuthRoute = require('./router/auth');
const adminRoute = require('./router/adminRoute')
const connectDB = require('./db');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

// setup view engine
configServer(app, __dirname);
// init web route
initWebRoute(app);
// init auth route
AuthRoute(app);
// init auth route
adminRoute(app);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
})