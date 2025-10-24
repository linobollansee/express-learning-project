const userModel = require('../models/userModel');

exports.list = (req, res) => {
  res.json(userModel.list());
};

exports.getById = (req, res, next) => {
  const id = Number(req.params.id);
  const user = userModel.get(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

exports.create = (req, res) => {
  const { name, email } = req.body;
  const user = userModel.create({ name, email });
  res.status(201).json(user);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;
  const updated = userModel.update(id, changes);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const removed = userModel.remove(id);
  if (!removed) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
};
