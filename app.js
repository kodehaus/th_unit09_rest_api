'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// setup morgan which gives us http request logging
app.use(morgan('dev'));
const db = require('./models/index');

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database successful!');
    await db.sequelize.sync({ force: false });
  } catch (err) {
    console.log('error loading db: ' + err.message);
  }
})();
const users = require('./routes/users');
const courses = require('./routes/courses');

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});
app.use('/api/users', users);
app.use('/api/courses', courses);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Resource Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  let errorMessages = null;
  if(err.errors){
    errorMessages = err.errors.map((erroObj) => {return {"message": erroObj.message}})
  } else {
    errorMessages = err.message;
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: errorMessages,
  });

});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`listening on port ${server.address().port}`);
});
