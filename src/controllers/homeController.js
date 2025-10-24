const userModel = require('../models/userModel');

exports.index = (req, res) => {
  res.render('index', { title: 'Express Learning Project', users: userModel.list() });
};

exports.usersPage = (req, res) => {
  res.render('users', { title: 'Users', users: userModel.list() });
};
