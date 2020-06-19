//TO DO
// * Find the way to pick the deleted items from allTasksArray and delete them in this Array
// * Update countTasks function with a counter based on allTasksArray, not the current amount of li items, because when user searches for a task, the number gets updated and displays wrong number

// Picking up elements
const form = document.querySelector('form');
const inputAddTask = document.querySelector('input[data-name="add-input"');
const inputSearchTask = document.querySelector('input[data-name="search-input"');
const ul = document.querySelector('ul');
// const allTasks = document.getElementsByClassName('task');

const spanTasksNumber = document.querySelector('.count-tasks span');
const removeBtns = document.querySelectorAll('i.fa-times')

const allTasksArray = [];
// const activeTasks = [];
// const completedTasks = [];


const searchTask = (e) => {

  const searchText = e.target.value.toLowerCase();

  const tasks = allTasksArray.filter(li => li.textContent.toLowerCase().includes(searchText))
  console.log(tasks);
  ul.textContent = "";
  tasks.forEach(li => ul.appendChild(li))

  // tasks.forEach(task => console.log(task.innerText))

  // tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchText))
  // console.log(tasks);
  // ul.textContent = "";
  // tasks.forEach(li => ul.appendChild(li))

  // allTasks.filter()
}

const countTasks = () => {
  spanTasksNumber.textContent = document.querySelectorAll('.task').length;
  // spanTasksNumber.textContent = allTasksArray.length;
}

const removeTask = (e) => {
  // console.log(e.target.parentNode.textContent);

  e.target.parentNode.remove();
  countTasks();
}

const addNewTask = (e) => {

  // prevents from page reloading
  e.preventDefault()

  const inputText = inputAddTask.value;

  // check if user-value is empty
  if (inputText === "") return

  // Add new element
  const task = document.createElement('li');
  task.classList.add('task');
  task.classList.add('ongoing');
  task.innerHTML = `<i class="fas fa-check"></i>
  <p>${inputText}</p>
  <i class="fas fa-times"></i>`
  ul.appendChild(task);

  //update the array
  allTasksArray.push(task);

  //clear input textarea
  inputAddTask.value = '';

  // count tasks
  countTasks();

  //add eventListener to buttons of new elements
  task.querySelector('.fa-times').addEventListener('click', removeTask);

}

form.addEventListener('submit', addNewTask)
// dotyczy tasków przykładowych na stronie - usunąć po usunieciu tych tasków
removeBtns.forEach(btn => {
  btn.addEventListener('click', removeTask)
})

inputSearchTask.addEventListener('input', searchTask)