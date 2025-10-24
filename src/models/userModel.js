/**
 * Simple in-memory user 'model' to keep the example self-contained.
 * This is NOT persistent and resets each time the server restarts.
 */
let users = [
  { id: 1, name: 'Alice Admin', email: 'alice@example.com' },
  { id: 2, name: 'Bob Builder', email: 'bob@example.com' }
];
let nextId = 3;

exports.list = () => users.slice();
exports.get = (id) => users.find(u => u.id === id);
exports.create = ({ name, email }) => {
  const user = { id: nextId++, name, email };
  users.push(user);
  return user;
};
exports.update = (id, changes) => {
  const u = users.find(x => x.id === id);
  if (!u) return null;
  Object.assign(u, changes);
  return u;
};
exports.remove = (id) => {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
};
