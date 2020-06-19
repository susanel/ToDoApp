// Picking up elements
const form = document.querySelector('form');
const inputAddTask = document.querySelector('input[data-name="add-input"');
const inputSearchTask = document.querySelector('input[data-name="search-input"');
const ul = document.querySelector('ul');

const spanTasksNumber = document.querySelector('.count-tasks span');
const removeBtns = document.querySelectorAll('i.fa-times')

const allTasksArray = [...document.getElementsByClassName('task')]; //szybki update tablicy o elementy juz zapisane na stronie - dla testu, usunac pozniej
// const activeTasks = [];
// const completedTasks = [];


const searchTask = (e) => {

  const searchText = e.target.value.toLowerCase();

  const tasks = allTasksArray.filter(li => li.textContent.toLowerCase().includes(searchText));
  ul.textContent = "";
  tasks.forEach(li => ul.appendChild(li));
}

const countTasks = () => {
  spanTasksNumber.textContent = allTasksArray.length;
}

const renderTasksList = () => {
  ul.textContent = "";
  allTasksArray.forEach((task, key) => {
    task.dataset.key = key;
    ul.appendChild(task);
  })
}

const removeTask = (e) => {
  const index = e.target.parentNode.dataset.key;
  allTasksArray.splice(index, 1);
  renderTasksList()
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
  // task.dataset.
  task.innerHTML = `<i class="fas fa-check"></i>
  <p>${inputText}</p>
  <i class="fas fa-times"></i>`;

  //update the array
  allTasksArray.push(task);

  //update list and show it
  renderTasksList();

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