// Picking up elements
const form = document.querySelector('form');
const inputAddTask = document.querySelector('input[data-name="add-input"');
const inputSearchTask = document.querySelector('input[data-name="search-input"');
const ulPending = document.querySelector('ul[data-list="to-do"]');
const ulCompleted = document.querySelector('ul[data-list="completed"]');

const spanTasksNumber = document.querySelector('.count-tasks span');
const removeBtns = document.querySelectorAll('i.fa-times')
const showAddInputBtn = document.querySelector('.fa-plus');
const showSearchInputBtn = document.querySelector('.fa-search');
const showTasksBtns = document.querySelectorAll('.show-tasks [data-btn]')

const allTasksArray = [...document.getElementsByClassName('task')]; //szybki update tablicy o elementy juz zapisane na stronie - dla testu, usunac pozniej
const activeTasksArray = [];
const completedTasksArray = [];


const showTasksList = (e) => {

  const btn = e.target;

  //reset
  ulPending.textContent = '';
  ulCompleted.textContent = '';

  //render suitable list
  if (btn.dataset.btn === 'btn-all') {
    console.log(btn.dataset.btn);
    renderTasksList();
    renderCompletedTasksList();
  } else if (btn.dataset.btn === 'btn-active') {
    console.log(btn.dataset.btn);
    renderTasksList();
  } else if (btn.dataset.btn === 'btn-completed') {
    console.log(btn.dataset.btn);
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

  const tasks = allTasksArray.filter(li => li.textContent.toLowerCase().includes(searchText));
  ulPending.textContent = "";
  tasks.forEach(li => ulPending.appendChild(li));
}

const countTasks = () => {
  spanTasksNumber.textContent = allTasksArray.length;
}

const renderTasksList = () => {
  ulPending.textContent = "";
  allTasksArray.forEach((task, key) => {
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
  // console.log(e.target.parentNode);
  if (e.target.parentNode.classList.contains('ongoing')) {
    // console.log('ongoing');
    allTasksArray.splice(index, 1);
    renderTasksList();
  } else if (e.target.parentNode.classList.contains('completed')) {
    // console.log('completed');
    completedTasksArray.splice(index, 1);
    renderCompletedTasksList();
  }
  countTasks();
}

const addCompletedTask = (e) => {
  // console.log(e.target.parentNode);
  const completedTask = e.target.parentNode;
  const index = e.target.parentNode.dataset.key;

  completedTask.classList.toggle('ongoing');
  completedTask.classList.toggle('completed');
  if (completedTask.classList.contains('completed')) {
    // console.log('task completed');

    //remove completed task from allTasksArray
    if (completedTask.parentNode.dataset.list === "to-do") {
      // console.log('jest w to do');
      allTasksArray.splice(index, 1);
      renderTasksList();
      countTasks()

    } else {
      //dont 
      console.log('nie ma juz w to do');
      return
    }

    //update completedTaskArray with new finished task
    completedTasksArray.push(completedTask);

    //render list of completed tasks
    renderCompletedTasksList()

  } else if (completedTask.classList.contains('ongoing')) {
    console.log('task ongoing');

    //delete task from completedTaskList
    if (completedTask.parentNode.dataset.list === "completed") {
      completedTasksArray.splice(index, 1);
      renderCompletedTasksList()

    } else {
      console.log('nie ma juz w completed');
      return
    }

    //add task back to ToDoList
    allTasksArray.push(completedTask);
    renderTasksList();
    countTasks();
  }

  // console.log(completedTasksArray);

}

const addActiveTask = (activeTask) => {
  activeTasksArray.push(activeTask);
  // console.log(activeTasksArray);

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
  addActiveTask(task);

  //update list and show it
  renderTasksList();

  //clear input textarea
  inputAddTask.value = '';

  // count tasks
  countTasks();

  //add eventListener to buttons of new elements
  task.querySelector('.fa-times').addEventListener('click', removeTask);
  task.querySelector('.fa-check').addEventListener('click', addCompletedTask);

}

form.addEventListener('submit', addNewTask)
// dotyczy tasków przykładowych na stronie - usunąć po usunieciu tych tasków
removeBtns.forEach(btn => {
  btn.addEventListener('click', removeTask)
})

inputSearchTask.addEventListener('input', searchTask);

showAddInputBtn.addEventListener('click', showInput);
showSearchInputBtn.addEventListener('click', showInput);

showTasksBtns.forEach(btn => btn.addEventListener('click', showTasksList));