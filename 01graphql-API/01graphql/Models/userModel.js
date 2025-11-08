const users = [
  { id: '1', name: 'Alice', age: 30, email: 'i@.com' },
  { id: '2', name: 'Bob',   age: 25, email: 'B@.com' }
];

function getAll() {
  return users;
}

function getById(id) {
  return users.find(user => user.id === id) || null;
}

function create(name, email, age = null) {
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    age
  };
  users.push(newUser);
  return newUser;
}

module.exports = {
  getAll,
  getById,
  create
};