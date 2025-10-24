// Import the user model, which handles user data (e.g., listing users)
const userModel = require('../models/userModel');

/**
 * Controller method for the home page ('/').
 * - Renders the 'index' view/template.
 * - Passes a title and the list of users from the user model to the view.
 */
exports.index = (req, res) => {
  res.render('index', { 
    title: 'Express Learning Project',  // Page title displayed in the view
    users: userModel.list()             // List of users fetched from the model
  });
};

/**
 * Controller method for the users page ('/users').
 * - Renders the 'users' view/template.
 * - Passes a title and the list of users from the user model to the view.
 */
exports.usersPage = (req, res) => {
  res.render('users', { 
    title: 'Users',                     // Page title displayed in the view
    users: userModel.list()             // List of users fetched from the model
  });
};
