'use strict';
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async(req, res, next) => {
  let message;
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if(credentials) {   
    const user = await User.findOne({ where: {emailAddress: credentials.name} });
    // Attempt to retrieve the user from the data store
    // by their username (i.e. the user's "key"
    // from the Authorization header).
    if(user) {
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
      // If a user was successfully retrieved from the data store...
      // Use the bcrypt npm package to compare the user's password
      // (from the Authorization header) to the user's password
      // that was retrieved from the data store.
      if(authenticated){
        // If the passwords match...
        // Store the retrieved user object on the request object
        // so any middleware functions that follow this middleware function
        // will have access to the user's information.
        console.log(`Authentication successful for username: ${user.username}`);
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }
  if(message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
}