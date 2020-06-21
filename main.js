// Picking up elements
const form = document.querySelector('form');
const inputAddTask = document.querySelector('input[data-name="add-input"');
const inputSearchTask = document.querySelector('input[data-name="search-input"');
const ulPending = document.querySelector('ul[data-list="to-do"]');
const ulCompleted = document.querySelector('ul[data-list="done"]');

const spanTasksNumber = document.querySelector('.count-tasks span');
const showAddInputBtn = document.querySelector('.fa-plus');
const showSearchInputBtn = document.querySelector('.fa-search');
const showTasksBtns = document.querySelectorAll('.show-tasks [data-btn]');

const pendingTasksArray = [];
const completedTasksArray = [];


// FUNCTIONS

const showTasksList = (e) => {

  const btn = e.target;

  //reset
  ulPending.textContent = '';
  ulCompleted.textContent = '';

  //render suitable list
  if (btn.dataset.btn === 'btn-all') {
    renderTasksList();
    renderCompletedTasksList();
  } else if (btn.dataset.btn === 'btn-active') {
    renderTasksList();
  } else if (btn.dataset.btn === 'btn-completed') {
    renderCompletedTasksList();
  }
}

const showInput = (e) => {
  const addInputWrap = document.querySelector('.input-wrap:nth-child(1)');
  const searchInputWrap = document.querySelector('.input-wrap:nth-child(2)');
  const btn = e.target;

  e.target.classList.toggle('active')

  if (btn.classList.contains('fa-plus')) {

    //if inputSearchTask is visible, replace it with search input
    if (searchInputWrap.classList.contains('on')) {
      searchInputWrap.classList.toggle('on');
      showSearchInputBtn.classList.toggle('active');
    }
    addInputWrap.classList.toggle('on')

  } else if (btn.classList.contains('fa-search')) {

    //if inputAddTask is visible, replace it with search input
    if (addInputWrap.classList.contains('on')) {
      addInputWrap.classList.toggle('on');
      showAddInputBtn.classList.toggle('active');
    }
    searchInputWrap.classList.toggle('on')
  }
}

const searchTask = (e) => {

  const searchText = e.target.value.toLowerCase();

  //search in pending Tasks
  const tasks = pendingTasksArray.filter(li => li.textContent.toLowerCase().includes(searchText));
  ulPending.textContent = '';
  tasks.forEach(li => ulPending.appendChild(li));

  //search in completed tasks
  const tasksCompleted = completedTasksArray.filter(li => li.textContent.toLowerCase().includes(searchText));
  ulCompleted.textContent = '';
  tasksCompleted.forEach(li => ulCompleted.appendChild(li));

}

const countTasks = () => {
  spanTasksNumber.textContent = pendingTasksArray.length;
}

const renderTasksList = () => {
  ulPending.textContent = "";
  pendingTasksArray.forEach((task, key) => {
    task.dataset.key = key;
    ulPending.appendChild(task);
  })
}

const renderCompletedTasksList = () => {
  ulCompleted.textContent = "";
  completedTasksArray.forEach((task, key) => {
    task.dataset.key = key;
    ulCompleted.appendChild(task);
  })
}

const removeTask = (e) => {
  const index = e.target.parentNode.dataset.key;
  if (e.target.parentNode.classList.contains('ongoing')) {
    // console.log('ongoing');
    pendingTasksArray.splice(index, 1);
    renderTasksList();
  } else if (e.target.parentNode.classList.contains('completed')) {
    // console.log('completed');
    completedTasksArray.splice(index, 1);
    renderCompletedTasksList();
  }
  countTasks();
}

const addCompletedTask = (e) => {
  // console.log(e.target); //i
  const completedTask = e.target.parentNode; //li
  const index = e.target.parentNode.dataset.key;

  completedTask.classList.toggle('ongoing');
  completedTask.classList.toggle('completed');

  if (completedTask.classList.contains('completed')) {
    // console.log('task completed');

    //changes icon to .fa-check-square
    e.target.outerHTML = '<i class="fas fa-check-square"></i>';
    completedTask.querySelector('.fa-check-square').addEventListener('click', addCompletedTask);

    //remove completed task from pendingTasksArray and ulPending
    pendingTasksArray.splice(index, 1);
    renderTasksList();
    countTasks()

    //update completedTaskArray with new finished task
    completedTasksArray.push(completedTask);

    //render list of completed tasks
    renderCompletedTasksList()

  } else if (completedTask.classList.contains('ongoing')) {

    //changes icon to .fa-square
    e.target.outerHTML = '<i class="far fa-square"></i>';
    completedTask.querySelector('.fa-square').addEventListener('click', addCompletedTask);

    //remove task from completedTaskList and ulCompleted
    completedTasksArray.splice(index, 1);
    renderCompletedTasksList()

    //add task back to ToDoList
    pendingTasksArray.push(completedTask);
    renderTasksList();
    countTasks();
  }
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
  task.innerHTML = `<i class="far fa-square"></i>
  <p>${inputText}</p>
  <i class="fas fa-times"></i>`;

  //update the array
  pendingTasksArray.push(task);

  //update list and show it
  renderTasksList();

  //clear input textarea
  inputAddTask.value = '';

  // count tasks
  countTasks();

  //add eventListener to buttons of new elements
  task.querySelector('.fa-times').addEventListener('click', removeTask);
  task.querySelector('.fa-square').addEventListener('click', addCompletedTask);
}

const renderExampleTasks = () => {
  const exampleTexts = ['learn React', 'learn SASS', 'learn Node.js'];
  for (let i = 0; i < exampleTexts.length; i++) {
    let exampleTask = document.createElement('li');
    exampleTask.classList.add('task');
    exampleTask.classList.add('ongoing')
    exampleTask.innerHTML = `<i class="far fa-square"></i>
    <p>${exampleTexts[i]}</p>
    <i class="fas fa-times"></i>`;
    pendingTasksArray.push(exampleTask)

    //add eventListener to buttons of example elements
    exampleTask.querySelector('.fa-times').addEventListener('click', removeTask);
    exampleTask.querySelector('.fa-square').addEventListener('click', addCompletedTask);
  }
  renderTasksList()
  countTasks()
}

renderExampleTasks()


// ADD EVENT LISTENERS

form.addEventListener('submit', addNewTask);

inputSearchTask.addEventListener('input', searchTask);

showAddInputBtn.addEventListener('click', showInput);
showSearchInputBtn.addEventListener('click', showInput);

showTasksBtns.forEach(btn => btn.addEventListener('click', showTasksList));