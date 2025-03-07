document.addEventListener('DOMContentLoaded', function() {
    //get element from html
    function getElement(id) { //get element
        return document.getElementById(id);
      }
    function createElement(id) {    //create element
        return document.createElement(id);
      }

      const calendar = getElement('calendar');
      const currentMonthSpan = getElement('currentMonth');
      const prevMonthButton = getElement('prevMonth');
      const nextMonthButton = getElement('nextMonth');
      const goToMonthInput = getElement('goToMonthInput');
      const goToMonthButton = getElement('goToMonthButton');
  //array for the calendar detail
    const months = [
        { name: 'January', days: 31, startDay: 0 },//starting index is 0 for array
        { name: 'February', days: 29, startDay: 3 },
        { name: 'March', days: 31, startDay: 4 },
        { name: 'April', days: 30, startDay: 0 },
        { name: 'May', days: 31, startDay: 2 },
        { name: 'June', days: 30, startDay: 5 },
        { name: 'July', days: 31, startDay: 0 },
        { name: 'August', days: 31, startDay: 3 },
        { name: 'September', days: 30, startDay: 6 },
        { name: 'October', days: 31, startDay: 1 },
        { name: 'November', days: 30, startDay: 4 },
        { name: 'December', days: 31, startDay: 6 }
    ];
  
    let currentMonthIndex = 6; //Current month July
  // displaying the day number, an input field for tasks, and a list for displaying tasks.
    function createDayBox(number, weekDay) {
        const dayBox = createElement('div');
        dayBox.classList.add('day', weekDay.toLowerCase()); //convert weekday to lowercase
    
        const dayNumberDiv = createElement('div');
        dayNumberDiv.textContent = number;
        dayNumberDiv.style.fontWeight = 'bold';
    
        const inputTasks = createElement('input');
        inputTasks.type = 'text';
        inputTasks.className = 'task-input';
        inputTasks.placeholder = 'Add Event';
        //Whne press enter add the task in the box
        inputTasks.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask(dayBox, inputTasks.value);
                inputTasks.value = '';
            }
        });
    
        const listTask = createElement('ul');
        listTask.className = 'task-list';
        
        dayBox.append(dayNumberDiv, inputTasks, listTask);
    
        return dayBox;
    }
    
    function addTask(dayBox, taskContent) {
        //adding task to the list
        const taskItem = createElement('li');
        taskItem.className = 'task';
        taskItem.textContent = taskContent;

        //delete button
        const deleteButton = createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        
        deleteButton.addEventListener('click', function() { //delete when click button
            taskItem.remove();
        });
    
        taskItem.appendChild(deleteButton);
        dayBox.querySelector('.task-list').appendChild(taskItem);
    }
    //array of weeks
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const calendarHeader = document.querySelector('.calendar-header');
    //create week header
    for (let i = 0; i < daysOfWeek.length; i++) {
        const day = daysOfWeek[i];
        const dayHeader = createElement('div');
        dayHeader.classList.add('day-header',day.toLowerCase());
        dayHeader.textContent = day;
    }
    function createCalendar(monthIndex) {
        calendar.innerHTML = ''; //clear all box
        const month = months[monthIndex];//get month
        currentMonthSpan.textContent = month.name;//update month
        //add empty box before the starting date
        for (let i = 0; i < month.startDay; i++) {
            calendar.appendChild(createElement('div'));
        }
        //create month box
        for (let i = 1; i <= month.days; i++) {
            const dayOfWeek = daysOfWeek[(i + month.startDay - 1) % 7];
            const dayBox = createDayBox(i, dayOfWeek);
            calendar.appendChild(dayBox);
        }
    }
    createCalendar(currentMonthIndex);
    //go to the previous month
    prevMonthButton.addEventListener('click', function() {
        currentMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
        createCalendar(currentMonthIndex);
    });
    //go to next month
    nextMonthButton.addEventListener('click', function() {
        currentMonthIndex = (currentMonthIndex + 1) % months.length;
        createCalendar(currentMonthIndex);
    });
   //create calendar based on input month
    goToMonthButton.addEventListener('click', function() {
        const monthNumber = parseInt(goToMonthInput.value);
        if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
            currentMonthIndex = monthNumber - 1; //subtract 1 because index start at 0
            createCalendar(currentMonthIndex);
            goToMonthInput.value = ''; //clear input field
        } else {
            alert('Please enter a valid month number (1-12).'); //alert when incorrect inputs
        }
    });
  //clear all task that was entered
    const clearAllTasksButton = getElement('clearAllTasks');
    clearAllTasksButton.addEventListener('click', function() {
      const confirmClear = confirm("Do you want to clear all tasks?");
      if (confirmClear) {
        const allTasks = document.querySelectorAll('.task');
        for (let i = allTasks.length - 1; i >= 0; i--) {
          allTasks[i].remove();//removed tasks
        }
      }
    });
  //add all task that was enetered
  const addAllTasksButton=getElement('addAllTasks');
  addAllTasksButton.addEventListener('click', function() {
      const taskInputs = document.querySelectorAll('.task-input');
      for (let i = 0; i < taskInputs.length; i++) {
          const input = taskInputs[i];
          if (input.value.trim() !== '') { //check the input is not empty after removing white space
              const dayBox = input.closest('.day');
              addTask(dayBox, input.value.trim()); //call addTask function
              input.value = ''; //clear the input field
          }
      }
  });
});