/**
 * User Model (In-Memory)
 * -----------------------
 * This is a simple in-memory data model used for demonstration purposes.
 * It simulates basic CRUD (Create, Read, Update, Delete) operations
 * for a "User" resource.
 * 
 * ⚠️ Note:
 * This data is stored in memory only — it resets every time the server restarts.
 * In a production app, these operations would interact with a database.
 */

// Initial mock user data
let users = [
  { id: 1, name: 'Alice Admin', email: 'alice@example.com' },
  { id: 2, name: 'Bob Builder', email: 'bob@example.com' }
];

// Auto-incrementing ID for new users
let nextId = 3;

/**
 * list()
 * -------
 * Returns a shallow copy of all users.
 * `.slice()` ensures the original array isn't accidentally modified outside this module.
 */
exports.list = () => users.slice();

/**
 * get(id)
 * -------
 * Finds and returns a user by their unique ID.
 * Returns `undefined` if no user is found.
 * 
 * @param {number} id - The user's ID.
 */
exports.get = (id) => users.find(u => u.id === id);

/**
 * create({ name, email })
 * ------------------------
 * Creates a new user object, assigns it a unique ID,
 * and adds it to the in-memory users list.
 * 
 * @param {Object} data - The new user's data.
 * @returns {Object} The newly created user.
 */
exports.create = ({ name, email }) => {
  const user = { id: nextId++, name, email };
  users.push(user);
  return user;
};

/**
 * update(id, changes)
 * -------------------
 * Updates an existing user's data with the provided changes.
 * Uses `Object.assign` to merge updates into the existing user object.
 * 
 * @param {number} id - The user's ID.
 * @param {Object} changes - The fields to update.
 * @returns {Object|null} The updated user, or `null` if not found.
 */
exports.update = (id, changes) => {
  const u = users.find(x => x.id === id);
  if (!u) return null;
  Object.assign(u, changes);
  return u;
};

/**
 * remove(id)
 * ----------
 * Deletes a user from the list by ID.
 * 
 * @param {number} id - The user's ID.
 * @returns {boolean} `true` if removed successfully, `false` if not found.
 */
exports.remove = (id) => {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
};
