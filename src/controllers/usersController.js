// Import the user model which handles data operations (CRUD) for users
const userModel = require('../models/userModel');

/**
 * Controller function: list
 * -------------------------
 * Returns a list of all users in JSON format.
 * This typically calls the `list()` method from the user model,
 * which retrieves all users from the data source.
 */
exports.list = (req, res) => {
  res.json(userModel.list());
};

/**
 * Controller function: getById
 * ----------------------------
 * Retrieves a single user by ID.
 * - Parses the `id` from the request parameters.
 * - Calls `userModel.get(id)` to find the user.
 * - If the user doesn't exist, returns a 404 (Not Found) error.
 * - Otherwise, responds with the user data in JSON format.
 */
exports.getById = (req, res, next) => {
  const id = Number(req.params.id);
  const user = userModel.get(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

/**
 * Controller function: create
 * ---------------------------
 * Creates a new user.
 * - Extracts `name` and `email` from the request body.
 * - Calls `userModel.create()` to add the new user to the data store.
 * - Returns the newly created user with a 201 (Created) status.
 */
exports.create = (req, res) => {
  const { name, email } = req.body;
  const user = userModel.create({ name, email });
  res.status(201).json(user);
};

/**
 * Controller function: update
 * ---------------------------
 * Updates an existing user's data.
 * - Parses `id` from the URL parameters.
 * - Takes `changes` from the request body.
 * - Calls `userModel.update(id, changes)` to modify the record.
 * - If the user doesn't exist, responds with 404.
 * - Otherwise, returns the updated user in JSON format.
 */
exports.update = (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;
  const updated = userModel.update(id, changes);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
};

/**
 * Controller function: remove
 * ---------------------------
 * Deletes a user by ID.
 * - Parses `id` from the request parameters.
 * - Calls `userModel.remove(id)` to delete the user.
 * - If the user doesn't exist, responds with 404.
 * - If the deletion is successful, sends a 204 (No Content) response.
 */
exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const removed = userModel.remove(id);
  if (!removed) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
};
