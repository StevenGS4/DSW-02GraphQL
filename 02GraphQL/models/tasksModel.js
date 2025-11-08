// models/tasksModel.js
const tasks = [
  { id: 1, name: 'Tarea 1', completed: false },
  { id: 2, name: 'Tarea 2', completed: false },
];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(t => t.id === id);
}

function createTask(name) {
  const newTask = {
    id: tasks.length + 1,
    name,
    completed: false,
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, name) {
  const task = getTaskById(id);
  if (!task) return null;
  task.name = name;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function completeTask(id) {
  const task = getTaskById(id);
  if (!task) return null;
  task.completed = true;
  return task;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
};
