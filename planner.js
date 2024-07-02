document.addEventListener('DOMContentLoaded', function() {
    //get element from html
    const calendar = document.getElementById('calendar');
    const currentMonthSpan = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const goToMonthInput = document.getElementById('goToMonthInput');
    const goToMonthButton = document.getElementById('goToMonthButton');
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
        const dayBox = document.createElement('div');
        dayBox.classList.add('day');
        dayBox.classList.add(weekDay.toLowerCase());
    
        const dayNumberDiv = document.createElement('div');
        dayNumberDiv.textContent = number;
        dayNumberDiv.style.fontWeight = 'bold';
    
        const inputTasks = document.createElement('input');
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
    
        const listTask = document.createElement('ul');
        listTask.className = 'task-list';
        
        dayBox.appendChild(dayNumberDiv);
        dayBox.appendChild(inputTasks);
        dayBox.appendChild(listTask);
    
        return dayBox;
    }
    
    function addTask(dayBox, taskContent) {
        //adding task to the list
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        taskItem.textContent = taskContent;

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        
        deleteButton.addEventListener('click', function() {
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
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.classList.add(day.toLowerCase());
        dayHeader.textContent = day;
    }
    function createCalendar(monthIndex) {
        calendar.innerHTML = ''; //clear all box
        const month = months[monthIndex];//get month
        currentMonthSpan.textContent = month.name;//update month
        //add empty box before the starting date
        for (let i = 0; i < month.startDay; i++) {
            calendar.appendChild(document.createElement('div'));
        }
        //create month box
        for (let i = 1; i <= month.days; i++) {
            const dayOfWeek = daysOfWeek[(i + month.startDay - 1) % 7];
            const dayBox = createDayBox(i, dayOfWeek);
            calendar.appendChild(dayBox);
        }
    }
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
            currentMonthIndex = monthNumber - 1;
            createCalendar(currentMonthIndex);
            goToMonthInput.value = '';
        } else {
            alert('Please enter a valid month number (1-12).'); //alert when incorrect inputs
        }
    });
  //clear all task
    const clearAllTasksButton = document.getElementById('clearAllTasks');
    clearAllTasksButton.addEventListener('click', function() {
      const confirmClear = confirm("Are you sure you want to clear all tasks?");
      if (confirmClear) {
        const allTasks = document.querySelectorAll('.task');
        for (let i = allTasks.length - 1; i >= 0; i--) {
          allTasks[i].remove();
        }
      }
    });
  //add all task
  const addAllTasksButton = document.getElementById('addAllTasks');
  addAllTasksButton.addEventListener('click', function() {
      const taskInputs = document.querySelectorAll('.task-input');
      for (let i = 0; i < taskInputs.length; i++) {
          const input = taskInputs[i];
          if (input.value.trim() !== '') {
              const dayBox = input.closest('.day');
              addTask(dayBox, input.value.trim());
              input.value = '';
          }
      }
  });
  createCalendar(currentMonthIndex);
});