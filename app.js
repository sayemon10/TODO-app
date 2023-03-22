const form = document.querySelector('form');
const input = document.querySelector('#task');
const taskList = document.querySelector('#task-list');

let tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  if (input.value.trim() === '') {
    alert('Please enter a task');
    return;
  }
  const task = {
    id: Date.now(),
    content: input.value.trim(),
    completed: false,
  };
  tasks.push(task);
  renderTasks();
  input.value = '';
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.classList.add('py-2');
    li.innerHTML = `
      <span class="${task.completed ? 'line-through' : ''}">${task.content}</span>
      <button class="ml-2 text-sm text-red-500 font-medium" data-delete-btn>Delete</button>
      <button class="ml-2 text-sm text-green-500 font-medium" data-complete-btn>${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
    `;
    taskList.appendChild(li);
    const deleteBtn = li.querySelector('[data-delete-btn]');
    deleteBtn.addEventListener('click', (e) => {
      deleteTask(e.target.closest('li').dataset.id);
    });
    const completeBtn = li.querySelector('[data-complete-btn]');
    completeBtn.addEventListener('click', (e) => {
      toggleComplete(e.target.closest('li').dataset.id);
    });
  });
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  renderTasks();
}

function toggleComplete(id) {
  tasks.forEach((task) => {
    if (task.id === parseInt(id)) {
      task.completed = !task.completed;
    }
  });
  renderTasks();
}
